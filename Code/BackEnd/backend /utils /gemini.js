const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const geminiPrompt = `
You are an expert legal analyst specializing in document summarization.
I will provide you with the text of a legal document.
Your task is to create a structured, website-ready summary.
You MUST output ONLY a raw JSON object with the following schema. Do NOT include markdown code blocks (like \`\`\`json). Just the JSON string.

{
  "documentOverview": "A concise 2-3 sentence summary of what this document is about.",
  "keyParties": ["Party Name: Role", "Party Name: Role"],
  "importantClauses": ["Section X: Explanation", "Clause Y: Explanation"],
  "criticalDates": ["Date: Significance", "Date: Significance"],
  "potentialConcerns": ["Issue: Explanation", "Issue: Explanation"],
  "plainLanguageSummary": "A simple 3-5 sentence explanation of the document in non-legal language."
}

CRITICALLY IMPORTANT: For each field, provide substantive content. If you cannot find relevant information for a field, provide a reasonable fallback array/string instead of leaving it empty.

Summarize the following document text:

DOCUMENT TEXT:
`;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const parseJsonSafely = (text) => {
  let cleanText = text.trim();
  // Remove markdown blocks if model hallucinated them
  if (cleanText.startsWith("```json")) {
    cleanText = cleanText.substring(7);
  } else if (cleanText.startsWith("```")) {
    cleanText = cleanText.substring(3);
  }
  if (cleanText.endsWith("```")) {
    cleanText = cleanText.substring(0, cleanText.length - 3);
  }
  cleanText = cleanText.trim();
  
  // Extract JSON object if it's embedded in other text
  const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    cleanText = jsonMatch[0];
  }

  return JSON.parse(cleanText);
};

const summarizeText = async (text, maxRetriesPerModel = 3) => {
  // Build a unique fallback chain
  const primaryModel = process.env.GEMINI_MODEL || "gemini-flash-latest";
  const potentialModels = [primaryModel, "gemini-3.6-flash", "gemini-3.5-flash", "gemini-pro-latest"];
  const fallbackChain = [...new Set(potentialModels)]; 
  
  let lastError = null;

  for (let modelIndex = 0; modelIndex < fallbackChain.length; modelIndex++) {
    const currentModelName = fallbackChain[modelIndex];
    console.log(`[Gemini API] Attempting summarization using model: ${currentModelName}`);
    
    let attempt = 0;
    while (attempt < maxRetriesPerModel) {
      try {
        const geminiModel = genAI.getGenerativeModel({ model: currentModelName });
        const fullPrompt = `${geminiPrompt}${text}`;
        
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Gemini API timeout')), 35000)
        );

        const result = await Promise.race([
          geminiModel.generateContent(fullPrompt),
          timeoutPromise
        ]);

        const response = await result.response;
        const summaryText = response.text();
        
        try {
          const parsed = parseJsonSafely(summaryText);
          console.log(`[Gemini API] Successfully generated summary with ${currentModelName}`);
          return {
            documentOverview: parsed.documentOverview || "No overview available",
            keyParties: parsed.keyParties || ["Cannot be determined"],
            importantClauses: parsed.importantClauses || [],
            obligations: {},
            criticalDates: parsed.criticalDates || [],
            potentialConcerns: parsed.potentialConcerns || [],
            plainLanguageSummary: parsed.plainLanguageSummary || "No plain language summary available"
          };
        } catch (parseError) {
          throw new Error(`JSON Parsing failed: ${parseError.message}`);
        }

      } catch (error) {
        lastError = error;
        const errorMessage = error.message || "";
        console.error(`[Gemini API] Error on ${currentModelName} (Attempt ${attempt + 1}):`, errorMessage);
        
        // Detect Quota/Rate Limit (429) errors
        const isQuotaError = errorMessage.includes("429") || 
                             errorMessage.toLowerCase().includes("quota") || 
                             errorMessage.toLowerCase().includes("too many requests");
                             
        if (isQuotaError) {
          console.log(`[Gemini API] Quota exceeded for ${currentModelName}. Switching to fallback model immediately.`);
          break; // Break the retry loop to immediately try the next model in the fallbackChain
        }

        attempt++;
        if (attempt >= maxRetriesPerModel) {
          console.log(`[Gemini API] Exhausted all ${maxRetriesPerModel} retries for ${currentModelName}.`);
          break; // Try next model
        }
        
        // Exponential backoff for non-quota transient errors (502, timeouts)
        await delay(Math.pow(2, attempt) * 1000);
      }
    }
  }

  // If we get here, all models in the fallback chain failed
  throw new Error(`Failed to generate summary after trying all fallback models. Last error: ${lastError ? lastError.message : 'Unknown error'}`);
};

module.exports = { summarizeText };

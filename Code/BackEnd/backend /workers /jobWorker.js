const Job = require('../models/Job');
const Document = require('../models/Document');
const Summary = require('../models/Summary');
const { summarizeText } = require('../utils/gemini');
const { extractText } = require('../utils/documentParser');
const fs = require('fs');

const processParsePdf = async (job) => {
  const document = await Document.findById(job.document);
  if (!document) throw new Error('Document not found');
  
  await Job.findByIdAndUpdate(job._id, { progress: 10 });
  
  const text = await extractText(document.filePath, document.fileType);
  
  const isErrorMessage = typeof text === 'string' && 
    (text.includes('could not be processed') || 
     text.includes('could not be extracted') || 
     text.includes('cannot be processed'));
     
  document.content = text;
  document.processingError = isErrorMessage ? text : null;
  await document.save();
  
  await Job.findByIdAndUpdate(job._id, { progress: 100 });
  return { success: true, processingError: isErrorMessage ? text : null };
};

const processGenerateSummary = async (job) => {
  const document = await Document.findById(job.document);
  if (!document) throw new Error('Document not found');
  
  await Job.findByIdAndUpdate(job._id, { progress: 10 });

  if (document.summary) {
    const existingSummary = await Summary.findById(document.summary);
    if (existingSummary) return existingSummary;
  }

  if (document.processingError) {
    const summaryObj = {
      document: document._id,
      documentOverview: "This document could not be fully processed due to format issues or damage.",
      keyParties: ["Cannot be determined from the document content"],
      importantClauses: ["Document content extraction was limited or failed"],
      obligations: {},
      criticalDates: ["Not available due to processing limitations"],
      potentialConcerns: [
        "Document may be damaged, corrupted or in an unsupported format",
        "Consider uploading a different version of this document",
        "The file may be password-protected or encrypted"
      ],
      plainLanguageSummary: "This document could not be properly analyzed because our system encountered issues extracting the text content."
    };
    const summary = await Summary.create(summaryObj);
    document.summary = summary._id;
    await document.save();
    return summary;
  }

  await Job.findByIdAndUpdate(job._id, { progress: 40 });
  const summaryData = await summarizeText(document.content);
  await Job.findByIdAndUpdate(job._id, { progress: 80 });
  
  const summaryObj = {
    document: document._id,
    documentOverview: summaryData.documentOverview || "No overview available",
    keyParties: summaryData.keyParties || [],
    importantClauses: summaryData.importantClauses || [],
    obligations: summaryData.obligations || {},
    criticalDates: summaryData.criticalDates || [],
    potentialConcerns: summaryData.potentialConcerns || [],
    plainLanguageSummary: summaryData.plainLanguageSummary || "No plain language summary available"
  };

  const summary = await Summary.create(summaryObj);
  document.summary = summary._id;
  await document.save();
  
  await Job.findByIdAndUpdate(job._id, { progress: 100 });
  return summary;
};

const mongoose = require('mongoose');

const pollJobs = async () => {
  try {
    // Prevent Mongoose buffering timeouts by skipping polling if MongoDB is not fully connected
    if (mongoose.connection.readyState !== 1) {
      return setImmediate(() => setTimeout(pollJobs, 5000));
    }

    const job = await Job.findOneAndUpdate(
      { status: 'queued' },
      { status: 'processing' },
      { sort: { createdAt: 1 }, new: true }
    );

    if (!job) return;

    console.log(`Processing job ${job._id} of type ${job.type}`);
    let result = null;

    try {
      if (job.type === 'parse_pdf') {
        result = await processParsePdf(job);
      } else if (job.type === 'generate_summary') {
        result = await processGenerateSummary(job);
      } else {
        throw new Error('Unknown job type');
      }

      await Job.findByIdAndUpdate(job._id, { 
        status: 'completed', 
        result,
        progress: 100
      });
      console.log(`Job ${job._id} completed successfully`);

    } catch (error) {
      console.error(`Job ${job._id} failed:`, error.message);
      
      if (job.retryCount < job.maxRetries) {
        await Job.findByIdAndUpdate(job._id, { 
          status: 'queued', 
          $inc: { retryCount: 1 },
          error: error.message
        });
        console.log(`Job ${job._id} requeued for retry (${job.retryCount + 1}/${job.maxRetries})`);
      } else {
        await Job.findByIdAndUpdate(job._id, { 
          status: 'failed', 
          error: error.message 
        });
        console.log(`Job ${job._id} failed permanently after max retries`);
      }
    }
    
    // Process next job immediately if one was found
    setImmediate(pollJobs);

  } catch (err) {
    console.error('Error polling jobs:', err);
  }
};

const startWorker = () => {
  console.log('Background job worker started');
  // Poll every 2 seconds
  setInterval(pollJobs, 2000);
};

module.exports = { startWorker };

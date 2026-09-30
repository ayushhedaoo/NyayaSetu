const path = require('path');
const fs = require('fs');
const asyncHandler = require('express-async-handler');
const Document = require('../models/Document');
const Summary = require('../models/Summary');
const Job = require('../models/Job');
const { enqueueJob, waitForJob } = require('../utils/jobQueue');

const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload a file' });
  }

  const { filename, mimetype, size, path: filePath } = req.file;

  try {
    const document = await Document.create({
      fileName: filename,
      fileType: mimetype,
      filePath: filePath,
      fileSize: size,
      content: 'Processing...', // Placeholder until parsed
      user: req.user._id,
    });

    const job = await enqueueJob('parse_pdf', document._id);
    
    // Wait for the parsing job to finish to maintain API compatibility
    const result = await waitForJob(job._id, req, 60000);

    // Document will have been updated by the worker, let's fetch it again
    const updatedDocument = await Document.findById(document._id);

    if (result.processingError) {
      res.status(201).json({
        success: true,
        warning: "Document was uploaded but text extraction was partial or failed",
        document: updatedDocument
      });
    } else {
      res.status(201).json({
        success: true,
        document: updatedDocument
      });
    }
  } catch (error) {
    console.error('Error uploading document:', error);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    res.status(500).json({
      success: false,
      message: 'Failed to process the document: ' + error.message
    });
  }
});

const getUserDocuments = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const total = await Document.countDocuments({ user: req.user._id });
  
  const documents = await Document.find({ user: req.user._id })
    .select('fileName fileType fileSize createdAt summary')
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit)
    .populate('summary', 'createdAt')
    .lean();

  res.status(200).json({
    success: true,
    count: documents.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    documents
  });
});

const getDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id)
    .populate('summary')
    .populate('user', 'name email')
    .lean();

  if (!document) {
    return res.status(404).json({ success: false, message: 'Document not found' });
  }

  if (document.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized to access this document' });
  }

  res.status(200).json({ success: true, document });
});

const generateSummary = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    return res.status(404).json({ success: false, message: 'Document not found' });
  }

  if (document.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized to summarize this document' });
  }

  if (document.summary) {
    const existingSummary = await Summary.findById(document.summary);
    if (existingSummary) {
      return res.status(200).json({ success: true, message: 'Summary already exists', summary: existingSummary });
    }
  }

  try {
    const job = await enqueueJob('generate_summary', document._id);
    
    // Wait for the summary job to finish
    const summary = await waitForJob(job._id, req, 120000); // 2 minutes max for Gemini

    res.status(201).json({
      success: true,
      message: document.processingError ? 'Limited summary generated due to processing issues' : 'Summary generated successfully',
      warning: document.processingError || null,
      summary
    });
  } catch (error) {
    console.error('Error in generateSummary controller:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate summary: ' + error.message
    });
  }
});

const deleteDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    return res.status(404).json({ success: false, message: 'Document not found' });
  }

  if (document.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized to delete this document' });
  }

  if (document.filePath && fs.existsSync(document.filePath)) {
    fs.unlinkSync(document.filePath);
  }

  if (document.summary) {
    await Summary.findByIdAndDelete(document.summary);
  }

  await Document.findByIdAndDelete(req.params.id);
  await Job.deleteMany({ document: req.params.id });

  res.status(200).json({ success: true, data: {} });
});

const retrySummary = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);

  if (!document) {
    return res.status(404).json({ success: false, message: 'Document not found' });
  }

  if (document.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized to summarize this document' });
  }

  if (document.summary) {
    await Summary.findByIdAndDelete(document.summary);
    document.summary = undefined;
    await document.save();
  }

  await Job.deleteMany({ document: document._id, type: 'generate_summary' });

  try {
    const job = await enqueueJob('generate_summary', document._id);
    const summary = await waitForJob(job._id, req, 120000); 

    res.status(201).json({
      success: true,
      message: 'Summary regeneration initiated successfully',
      summary
    });
  } catch (error) {
    console.error('Error in retrySummary controller:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to regenerate summary: ' + error.message
    });
  }
});

module.exports = {
  uploadDocument,
  getUserDocuments,
  getDocument,
  generateSummary,
  retrySummary,
  deleteDocument
};

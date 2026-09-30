const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['parse_pdf', 'generate_summary']
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  status: {
    type: String,
    enum: ['queued', 'processing', 'completed', 'failed', 'cancelled'],
    default: 'queued'
  },
  progress: {
    type: Number,
    default: 0
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  result: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  error: {
    type: String,
    default: null
  },
  retryCount: {
    type: Number,
    default: 0
  },
  maxRetries: {
    type: Number,
    default: 3
  }
}, {
  timestamps: true
});

// Indexes for worker polling and job lookups
jobSchema.index({ status: 1, createdAt: 1 });
jobSchema.index({ document: 1 });

module.exports = mongoose.model('Job', jobSchema);

const Job = require('../models/Job');

/**
 * Enqueue a new background job
 */
const enqueueJob = async (type, documentId, data = {}) => {
  const job = await Job.create({
    type,
    document: documentId,
    data,
    status: 'queued'
  });
  return job;
};

/**
 * Wait for a job to complete by polling its status
 * Allows the API to block synchronously while the backend worker processes asynchronously
 */
const waitForJob = async (jobId, req, timeoutMs = 60000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    let isCancelled = false;

    // If client disconnects, mark for cancellation
    req.on('close', async () => {
      isCancelled = true;
      try {
        await Job.findByIdAndUpdate(jobId, { status: 'cancelled' });
        console.log(`Job ${jobId} cancelled due to client disconnect`);
      } catch (err) {
        console.error('Error cancelling job on disconnect', err);
      }
    });

    const poll = async () => {
      if (isCancelled) {
        return reject(new Error('Request cancelled by client'));
      }

      if (Date.now() - startTime > timeoutMs) {
        return reject(new Error('Job timed out while waiting for completion'));
      }

      try {
        const job = await Job.findById(jobId);
        
        if (!job) {
          return reject(new Error('Job not found'));
        }

        if (job.status === 'completed') {
          return resolve(job.result);
        } else if (job.status === 'failed') {
          return reject(new Error(job.error || 'Job failed'));
        } else if (job.status === 'cancelled') {
          return reject(new Error('Job was cancelled'));
        }

        // Job is still queued or processing, poll again in 1 second
        setTimeout(poll, 1000);
      } catch (err) {
        reject(err);
      }
    };

    poll();
  });
};

/**
 * Update job progress
 */
const updateJobProgress = async (jobId, progress) => {
  await Job.findByIdAndUpdate(jobId, { progress });
};

module.exports = {
  enqueueJob,
  waitForJob,
  updateJobProgress
};

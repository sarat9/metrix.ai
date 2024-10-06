const cron = require('node-cron');
const db = require('./../config/postgres_db'); // Your PostgreSQL database config
const moment = require('moment'); // For date handling
const metrixService = require('./../services/metrix/metrix');


// Function to execute the scheduled task
const executeScheduledMetrix = async () => {
    try {
        console.log("MetriX Execution Started");
        const result = await db.query(`
            SELECT * FROM metrix
            WHERE active = TRUE
        `);
        // AND next_execution_date IS NULL OR next_execution_date <= NOW()


        const metrics = result.rows;
        for (const metric of metrics) {
            try {
                metrixService.executeMetric(metric);
            } catch (err) {
                console.error(`Error executing query for metrix ${metric.id}:`, err);
            }
        }
        console.log("MetriX Execution Ended");
    } catch (error) {
        console.error('Error fetching active metrix:', error);
    }
};

// Schedule the job to run daily at a specific time
// cron.schedule('*/15 * * * * *', () => { // Runs every 15 seconds
//     console.log('Running scheduled task to execute metrics...');
//     executeScheduledMetrix();
// });

cron.schedule('0 0 * * *', () => { // Runs every day at midnight
    console.log('Running scheduled task to execute metrics...');
    executeScheduledMetrix();
});

// Schedule the job to run every minute
// cron.schedule('* * * * *', () => { // Runs every minute
//     console.log('Running task every minute...');
//     executeScheduledTasks(); // Execute the scheduled tasks logic here
// });

module.exports = { executeScheduledMetrix };

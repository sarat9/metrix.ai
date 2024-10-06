const db = require('../../config/postgres_db');
const moment = require('moment'); // For date handling
const metrixDataService = require('../metrixData/metrixData')
/**
 * Execute Metric
 * @param {number} [id] - Optional ID of the metrix to fetch.
 * @returns {Array|Object} - List of metrix or a single metrix object.
 */
const executeMetric = async (metric) => {
    try {
        const query = metric.formatted_sql;
        let countQuery = `SELECT COUNT(*) FROM ${metric.source_table} WHERE ${query}`;
        console.log("Query : " + countQuery);
        const queryResult = await db.query(countQuery);

        const recordCount = parseFloat(queryResult.rows[0].count); 

        console.log(`Metrix: ${metric.title}, Count: ${recordCount}`);

        metrixDataService.saveMetrixData({'metrix_id':metric.id,'quantitative_value': parseFloat(recordCount)})
        console.log(`Metrix Data Created for : ${metric.title}, Count: ${recordCount}`);

        const nextRunDate = moment().add(metric.frequency);
        await db.query(`UPDATE metrix SET next_execution_date = $1 WHERE id = $2`, [nextRunDate.toDate(), metric.id]);
    } catch (err) {
        console.error(`Error executing query for metrix ${metric.id}:`, err);
    }
};


module.exports = {
    executeMetric
};

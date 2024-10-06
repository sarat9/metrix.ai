const db = require('../../config/postgres_db');
const metrixUtil = require('./metrixUtil');
const metrixDataService = require('./../metrixData/metrixData');
/**
 * Get all metrix or a specific metrix by ID.
 * @param {number} [id] - Optional ID of the metrix to fetch.
 * @returns {Array|Object} - List of metrix or a single metrix object.
 */
const getMetrics = async (id) => {
    try {
        if (id) {
            const result = await db.query(`SELECT * FROM metrix WHERE id = $1`, [id]);
            return result.rows[0];
        } else {
            const result = await db.query(`SELECT * FROM metrix`);
            return result.rows;
        }
    } catch (error) {
        console.error('Error fetching metrix:', error.stack);
        throw error;
    }
};

/**
 * Save a new metrix to the metrix table in the database.
 * @param {Object} metrixData - Data for the metrix.
 * @returns {Object} - The saved metrix.
 */
const saveMetrix = async (metrixData) => {
    const {
        title = '',
        description = '',
        source_table = '',
        query_conditions = {},
        formatted_sql = '',
        active = true,
        frequency = 'monthly',
        metric_type = '',
        collection_type = '',
        entity_id = '',
        next_execution_date = null,
        category = '',
        metrix_template = '',
        trend_direction = ''
    } = metrixData;

    try {
        await ensureMetrixTableIsCreated();
        const result = await db.query(
            `INSERT INTO metrix (
                title, 
                description, 
                source_table, 
                query_conditions, 
                formatted_sql, 
                active, 
                frequency, 
                metric_type, 
                collection_type, 
                entity_id, 
                next_execution_date, 
                category, 
                metrix_template, 
                trend_direction, 
                created_at, 
                updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())
            RETURNING *`,
            [
                title,
                description,
                source_table,
                query_conditions,
                formatted_sql,
                active,
                frequency,
                metric_type,
                collection_type,
                entity_id,
                next_execution_date,
                category,
                metrix_template,
                trend_direction
            ]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error saving metrix:', error.stack);
        throw error;
    }
};

/**
 * Update an existing metrix in the database.
 * @param {number} id - The ID of the metrix to update.
 * @param {Object} metrixData - Data for the metrix.
 * @returns {Object} - The updated metrix.
 */
const updateMetrix = async (id, metrixData) => {
    const {
        title = '',
        description = '',
        source_table = '',
        query_conditions = {},
        formatted_sql = '',
        active = true,
        frequency = 'monthly',
        metric_type = '',
        collection_type = '',
        entity_id = '',
        next_execution_date = null,
        category = '',
        metrix_template = '',
        trend_direction = ''
    } = metrixData;

    try {
        await ensureMetrixTableIsCreated();
        const result = await db.query(
            `UPDATE metrix
            SET 
                title = $1, 
                description = $2, 
                source_table = $3, 
                query_conditions = $4, 
                formatted_sql = $5, 
                active = $6, 
                frequency = $7, 
                metric_type = $8, 
                collection_type = $9, 
                entity_id = $10, 
                next_execution_date = $11, 
                category = $12, 
                metrix_template = $13, 
                trend_direction = $14, 
                updated_at = NOW()
            WHERE id = $15
            RETURNING *`,
            [
                title,
                description,
                source_table,
                query_conditions,
                formatted_sql,
                active,
                frequency,
                metric_type,
                collection_type,
                entity_id,
                next_execution_date,
                category,
                metrix_template,
                trend_direction,
                id
            ]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating metrix:', error.stack);
        throw error;
    }
};

/**
 * Delete an existing metrix from the database.
 * @param {number} id - The ID of the metrix to delete.
 * @returns {boolean} - True if deletion was successful, false otherwise.
 */
const deleteMetrix = async (id) => {
    try {
        const result = await db.query(`DELETE FROM metrix WHERE id = $1 RETURNING *`, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error deleting metrix:', error.stack);
        throw error;
    }
};

/**
 * Function to ensure the `metrix` table exists.
 * Creates the table if it does not exist.
 */
const ensureMetrixTableIsCreated = async () => {
    try {
        const checkTableExists = await db.query(`
            SELECT EXISTS (
                SELECT 1 
                FROM information_schema.tables 
                WHERE table_name = 'metrix'
            );
        `);

        const tableExists = checkTableExists.rows[0].exists;

        if (!tableExists) {
            await db.query(`
                CREATE TABLE metrix (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description VARCHAR(255) NOT NULL,
                    source_table VARCHAR(255) NOT NULL,
                    query_conditions JSONB NOT NULL,
                    formatted_sql TEXT NOT NULL,
                    active BOOLEAN DEFAULT TRUE,
                    frequency VARCHAR(255) NOT NULL,
                    metric_type VARCHAR(255) NOT NULL,
                    collection_type VARCHAR(255) NOT NULL,
                    entity_id VARCHAR(255) NOT NULL,
                    next_execution_date TIMESTAMP,
                    category VARCHAR(255) NOT NULL,
                    metrix_template VARCHAR(255) NOT NULL,
                    trend_direction VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);
            console.log('Table `metrix` created successfully.');
        } else {
            console.log('Table `metrix` already exists.');
        }
    } catch (error) {
        console.error('Error checking or creating `metrix` table:', error);
        throw error;
    }
};


/**
 * Execute Metric
 * @param {number} [id] - Optional ID of the metrix to fetch.
 * @returns {Array|Object} - List of metrix or a single metrix object.
 */
const executeMetric = async (metric) => {
    try {
        await metrixUtil.executeMetric(metric)
    } catch (err) {
        console.error(`Error executing query for metrix ${metric.id}:`, err);
    }
};

const getAllMetrixWithMetricData = async () => {
    try {
        const metricsWithData = await metrixDataService.getMetrixDataOfAllMetrix();
        return metricsWithData;
    } catch (err) {
        console.error(`Error getAllMetrixWithMetricData :`, err);
    }
}

module.exports = {
    getMetrics,
    saveMetrix,
    updateMetrix,
    deleteMetrix,
    executeMetric,
    getAllMetrixWithMetricData
};


const db = require('../../config/postgres_db');

/**
 * Get all metrix data or a specific entry by ID.
 * @param {number} [id] - Optional ID of the metrix data entry to fetch.
 * @returns {Array|Object} - List of metrix data or a single entry object.
 */
const getMetrixData = async (id) => {
    try {
        if (id) {
            const result = await db.query(`SELECT * FROM metrix_data WHERE id = $1`, [id]);
            return result.rows[0];
        } else {
            const result = await db.query(`SELECT * FROM metrix_data`);
            return result.rows;
        }
    } catch (error) {
        console.error('Error fetching metrix data:', error.stack);
        throw error;
    }
};

/**
 * Save a new metrix data entry to the database.
 * @param {Object} metrixData - Data for the metrix data entry.
 * @returns {Object} - The saved metrix data entry.
 */
const saveMetrixData = async (metrixData) => {
    await ensureMetrixDataTableIsCreated();
    const { quantitative_value, qualitative_value, metrix_id } = metrixData;

    const value = quantitative_value || qualitative_value;

    try {
        const result = await db.query(`
            INSERT INTO metrix_data (quantitative_value, qualitative_value, value, metrix_id, created_at, updated_at)
            VALUES ($1, $2, $3, $4, NOW(), NOW())
            RETURNING *`,
            [parseFloat(quantitative_value), qualitative_value, value, metrix_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error saving metrix data:', error.stack);
        throw error;
    }
};

/**
 * Update an existing metrix data entry in the database.
 * @param {number} id - The ID of the metrix data entry to update.
 * @param {Object} metrixData - Data for the metrix data entry.
 * @returns {Object} - The updated metrix data entry.
 */
const updateMetrixData = async (id, metrixData) => {
    const { quantitative_value, qualitative_value } = metrixData;

    const value = quantitative_value || qualitative_value;

    try {
        const result = await db.query(`
            UPDATE metrix_data
            SET quantitative_value = $1, qualitative_value = $2, value = $3, updated_at = NOW()
            WHERE id = $4
            RETURNING *`,
            [parseFloat(quantitative_value), qualitative_value, value, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating metrix data:', error.stack);
        throw error;
    }
};

/**
 * Delete an existing metrix data entry from the database.
 * @param {number} id - The ID of the metrix data entry to delete.
 * @returns {boolean} - True if deletion was successful, false otherwise.
 */
const deleteMetrixData = async (id) => {
    try {
        const result = await db.query(`DELETE FROM metrix_data WHERE id = $1 RETURNING *`, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error deleting metrix data:', error.stack);
        throw error;
    }
};


/**
 * Get all metrix data or a specific entry by ID.
 * @param {number} [id] - Optional ID of the metrix data entry to fetch.
 * @returns {Array|Object} - List of metrix data or a single entry object.
 */
const getMetrixDataByMetrix = async (metric) => {
    try {
        const dataResult = await db.query(`SELECT * FROM metrix_data WHERE metrix_id = $1 ORDER BY created_at`, [metric.id]);
        return {
            metric: metric,
            metric_data: dataResult.rows
        };
    } catch (error) {
        console.error('Error fetching metrix data:', error.stack);
        throw error;
    }
};

/**
 * Get all metrix data or a specific entry by ID.
 * @param {number} [id] - Optional ID of the metrix data entry to fetch.
 * @returns {Array|Object} - List of metrix data or a single entry object.
 */
const getMetrixDataOfAllMetrix = async () => {
    try {
        const metricsResult = await db.query(`SELECT * FROM metrix`);
        const metrics = metricsResult.rows;
        const metricsWithData = await Promise.all(metrics.map(async (metric) => {
            const dataResult = await db.query(`SELECT * FROM metrix_data WHERE metrix_id = $1 ORDER BY created_at`, [metric.id]);
            return {
                metric: metric,
                metric_data: dataResult.rows
            };
        }));
        return metricsWithData;
    } catch (error) {
        console.error('Error fetching metrix data:', error.stack);
        throw error;
    }
};


/**
 * Function to ensure the `metrixData` table exists.
 * Creates the table if it does not exist.
 */
const ensureMetrixDataTableIsCreated = async () => {
    try {
        // await db.query(`DROP TABLE metrix_data;`);
        // console.log('Table `metrix_data` dropped successfully.');

        // Check if the table exists
        const checkTableExists = await db.query(`
            SELECT EXISTS (
                SELECT 1 
                FROM information_schema.tables 
                WHERE table_name = 'metrix_data'
            );
        `);

        const tableExists = checkTableExists.rows[0].exists;

        if (!tableExists) {
            // Create the table if it doesn't exist
            await db.query(`
            CREATE TABLE metrix_data (
                id SERIAL PRIMARY KEY,
                quantitative_value NUMERIC NOT NULL,
                qualitative_value VARCHAR(255),
                value VARCHAR(255),
                active BOOLEAN DEFAULT TRUE,
                metrix_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (metrix_id) REFERENCES metrix(id)
            );
        `);
            console.log('Table `metrix_data` created successfully.');
        } else {
            console.log('Table `metrix_data` already exists.');
        }
    } catch (error) {
        console.error('Error checking or creating `metrix_data` table:', error);
        throw error;
    }
};

module.exports = {
    getMetrixData,
    saveMetrixData,
    updateMetrixData,
    deleteMetrixData,
    getMetrixDataOfAllMetrix
};

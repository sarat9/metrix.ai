const db = require('../../../config/postgres_db');

// Function to fetch all table schema details
const getAllSchemas = async (tableName = "public") => {
  try {
    const result = await db.query(`
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'users';
    `);
    console.log("getAllSchemas result.rows : ", result.rows);
    return result.rows;
  } catch (error) {
    console.error('Error fetching schema:', error.stack);
    throw error;
  }
};


const getAllTables = async (tableName) => {
    tableName= 'users';
    try {
      const result = await db.query(`
       SELECT table_name FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE';
        `);
      console.log("getAllTables result.rows : ", result.rows);
      return result.rows;
    } catch (error) {
      console.error('Error fetching tables:', error.stack);
      throw error;
    }
  };



const getTableFields = async (tableName) => {
  try {
    const result = await db.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = $1
        AND table_schema = 'public';
    `, [tableName]);

    console.log("getTableFields result.rows : ", result.rows);

    return result.rows.map((column) => ({
      name: column.column_name,
      label: column.column_name,
    }));
  } catch (error) {
    console.error('Error fetching fields:', error.stack);
    throw error;
  }
};


module.exports = {
  getAllSchemas,
  getAllTables,
  getTableFields
};

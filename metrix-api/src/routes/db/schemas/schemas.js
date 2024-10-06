// routes/dbschema.js
const express = require('express');
const router = express.Router();
const schemaService = require('../../../services/db/schemas/SchemaService');

// Route to fetch all table schema details
router.get('/schema', async (req, res) => {
  try {
    const schemas = await schemaService.getAllSchemas();
    res.status(200).json(schemas);
  } catch (error) {
    console.error('Error in schema route:', error.stack);
    res.status(500).send('Database error');
  }
});

// Route to fetch all tables
router.get('/tables', async (req, res) => {
    try {
      const tables = await schemaService.getAllTables();
      res.status(200).json(tables);
    } catch (error) {
      console.error('Error fetching tables:', error.stack);
      res.status(500).send('Database error');
    }
  });
  
  // Route to fetch fields for a specific table
  router.get('/tables/:tableName/fields', async (req, res) => {
    const { tableName } = req.params;
  
    try {
      const fields = await schemaService.getTableFields(tableName);
      res.status(200).json(fields);
    } catch (error) {
      console.error('Error fetching fields:', error.stack);
      res.status(500).send('Database error');
    }
  });


  module.exports = router;

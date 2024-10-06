const express = require('express');
const router = express.Router();
const metrixService = require('./../../services/metrix/metrix');
// Route to get all metrix or a specific metrix by ID
router.get('/metric/:id?', async (req, res) => {
    const { id } = req.params;
    try {
        const metrix = await metrixService.getMetrics(id);
        res.status(200).json(metrix);
    } catch (err) {
        console.error('Error fetching metrix:', err);
        res.status(500).send('Database error');
    }
});

// Route to create a new metrix
router.post('/metric', async (req, res) => {
    const {
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
    } = req.body;

    if (!title || !source_table || !query_conditions || !formatted_sql || !frequency) {
        console.error("Missing required fields.");
        return res.status(400).send('Missing required fields.');
    }

    try {
        const savedMetrix = await metrixService.saveMetrix({
            title,
            description: description || '',
            source_table,
            query_conditions,
            formatted_sql,
            active: active !== undefined ? active : true, 
            frequency,
            metric_type,
            collection_type,
            entity_id,
            next_execution_date: next_execution_date || null, 
            category,
            metrix_template,
            trend_direction
        });
        res.status(201).json(savedMetrix);
    } catch (err) {
        console.error('Error saving metrix:', err);
        res.status(500).send('Database error');
    }
});

// Route to update an existing metrix
router.put('/metric/:id', async (req, res) => {
    const { id } = req.params;
    const {
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
    } = req.body;

    if (!title || !source_table || !query_conditions || !formatted_sql || !frequency) {
        return res.status(400).send('Missing required fields.');
    }

    try {
        const updatedMetrix = await metrixService.updateMetrix(id, {
            title,
            description: description || '',
            source_table,
            query_conditions,
            formatted_sql,
            active: active !== undefined ? active : true,
            frequency,
            metric_type,
            collection_type,
            entity_id,
            next_execution_date: next_execution_date || null, 
            category,
            metrix_template,
            trend_direction
        });
        res.status(200).json(updatedMetrix);
    } catch (err) {
        console.error('Error updating metrix:', err);
        res.status(500).send('Database error');
    }
});

// Route to delete a metrix
router.delete('/metric/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('Missing required metrix ID.');
    }

    try {
        const isDeleted = await metrixService.deleteMetrix(id);
        if (isDeleted) {
            res.status(200).send('Metrix deleted successfully.');
        } else {
            res.status(404).send('Metrix not found.');
        }
    } catch (err) {
        console.error('Error deleting metrix:', err);
        res.status(500).send('Database error');
    }
});



router.get('/metric_metric_data', async (req, res) => {
    try {
        const metricsWithData = await metrixService.getAllMetrixWithMetricData();
        res.status(200).json(metricsWithData);
    } catch (err) {
        console.error('Error fetching metrics and their data:', err);
        res.status(500).send('Database error');
    }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const metrixDataService = require('./../../services/metrixData/metrixData');

// Route to get all metrix data or a specific entry by ID
router.get('/metric_data/:id?', async (req, res) => {
    const { id } = req.params;

    try {
        const metrixData = await metrixDataService.getMetrixData(id);
        res.status(200).json(metrixData);
    } catch (err) {
        console.error('Error fetching metrix data:', err);
        res.status(500).send('Database error');
    }
});

// Route to save a new metrix data entry
router.post('/metric_data/', async (req, res) => {
    const metrixData = req.body;

    try {
        const savedData = await metrixDataService.saveMetrixData(metrixData);
        res.status(201).json(savedData);
    } catch (err) {
        console.error('Error saving metrix data:', err);
        res.status(500).send('Database error');
    }
});

// Route to update an existing metrix data entry
router.put('/metric_data/:id', async (req, res) => {
    const { id } = req.params;
    const metrixData = req.body;

    try {
        const updatedData = await metrixDataService.updateMetrixData(id, metrixData);
        res.status(200).json(updatedData);
    } catch (err) {
        console.error('Error updating metrix data:', err);
        res.status(500).send('Database error');
    }
});

// Route to delete a metrix data entry
router.delete('/metric_data/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await metrixDataService.deleteMetrixData(id);
        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).send('Metrix data not found');
        }
    } catch (err) {
        console.error('Error deleting metrix data:', err);
        res.status(500).send('Database error');
    }
});

module.exports = router;

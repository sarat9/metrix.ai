const express = require('express')
const router = express.Router();

const SchemaRoute = require('./db/schemas/schemas');
const Metrix = require('./metrix/metrix')
const MetrixData = require('./metrixData/metrixData')

router.use(SchemaRoute);
router.use(Metrix);
router.use(MetrixData);

module.exports = router;
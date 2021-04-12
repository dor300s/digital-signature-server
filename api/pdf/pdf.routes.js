const express = require('express');
const router = express.Router();
const { getPdf, savePdf } = require('./pdf.controller');

router.get('/:id', getPdf);
router.put('/', savePdf);
router.post('/', savePdf);

module.exports = router;
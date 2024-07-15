const express = require('express')
const router = express.Router();
const controller = require('../controller/Cvisitor')

// GET '/'
router.get('/', controller.main)

// GET '/visitors'
router.get('/visitors', controller.get_visitors);

// POST '/visitor'
router.post('/visitor', controller.post_visitor);

// GET '/visitors'
router.get('/visitor', controller.get_visitor);

// DELETE '/visitors'
router.delete('/visitor', controller.delete_visitor);

module.exports = router;
const express = require('express')
const router = express.Router()
const controller = require('../controller/Cvisitor')

// get '/'
router.get('/', controller.main);

router.get('/visitors', controller.get_visitors);

router.post('/visitor', controller.post_visitor);

router.get('/visitor', controller.get_visitor);

router.get('/visitor/:id', controller.get_visitor2);

router.put('/visitor', controller.put_visitor);

router.delete('/visitor', controller.delete_visitor);

module.exports = router
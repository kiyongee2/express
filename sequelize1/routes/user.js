const express = require('express')
const router = express.Router()
const controller = require('../controller/Cuser')

// 경로 - localhost:PORT/user
// router.get('/', controller.main);

// get /user/signup
router.get('/signup', controller.get_signup);

// post /user/signup
router.post('/signup', controller.post_signup);

// get /user/signin
router.get('/signin', controller.get_signin);

// post /user/signin
router.post('/signin', controller.post_signin);

// post /user/profile
router.post('/profile', controller.post_profile);

// put /user/profile/edit
router.put('/profile/edit', controller.edit_profile);

module.exports = router;
const express = require('express')
const router = express.Router()
const controller = require('../controller/Cuser')

router.get('/', controller.main);

// 회원가입 페이지
router.get('/signup', controller.get_signup);

// 회원 가입 요청
router.post('/signup', controller.post_signup);

// 로그인 페이지
router.get('/signin', controller.get_signin);

// 로그인 요청
router.post('/signin', controller.post_signin);


module.exports = router
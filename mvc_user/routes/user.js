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

// 회원 정보 수정 페이지 요청
router.post('/profile', controller.post_profile);

// 회원 정보 수정 요청
router.patch('/profile/edit', controller.edit_profile);

// 회원 정보 삭제
router.delete('/profile/delete', controller.delete_profile);


module.exports = router
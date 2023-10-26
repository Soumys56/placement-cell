const express=require('express');
const router=express.Router();
const passport=require('passport');
const homeController=require('../controller/homecontroller')
router.get('/',passport.checkAuthentication,homeController.Home)
router.use('/student',require('./student'))
router.use('/user',require('./user'));
router.use('/interview',require('./interview'));
router.use('/job',require('./jobs'));

module.exports=router;
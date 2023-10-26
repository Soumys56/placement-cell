const express=require('express');
const router=express.Router();
const passport=require('passport');
const interviewController=require('../controller/interviewcontroller');
 router.get('/addstudent',interviewController.Interview);
 router.post('/create',passport.checkAuthentication ,interviewController.Create);
module.exports=router;
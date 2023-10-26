const express=require('express');
const  router=express.Router();
const passport=require('passport')
const studentController=require('../controller/studentcontroller');

router.get('/addstudent',studentController.addStudent);
router.post('/create',passport.checkAuthentication,studentController.Create)
router.get('/detail',studentController.Details);

module.exports=router;
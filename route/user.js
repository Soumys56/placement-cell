const express=require('express');
const passport=require('passport');
const router=express.Router();

const userController=require('../controller/usercontroller');
const resultController=require('../controller/resultcontroller');
router.get('/signup',userController.signUP);
router.get('/signin',userController.signIn);
router.post('/create',userController.Create);
router.post('/create-session',passport.authenticate( 'local', {failureRedirect: '/user/signin'}), userController.Createsession );
router.get('/detroysession',passport.checkAuthentication ,userController.destroySession)
router.get('/deleteStudent/:id',passport.checkAuthentication ,userController.deleteStudent);
router.get('/updateStudent/:id',passport.checkAuthentication ,userController.Update);
router.post('/updateinfo/:id',passport.checkAuthentication ,userController.updateInfo);
router.get('/result/:id',passport.checkAuthentication ,resultController.Result);
router.post('/resultcreate',resultController.Create);
router.get('/downloadcsv', passport.checkAuthentication,userController.Report);

module.exports=router;
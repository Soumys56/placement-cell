const User=require('../model/user');
const Student=require('../model/student');
const Interview=require('../model/interview');
const Result=require('../model/result');
const excelJs=require('exceljs');
//sign up controller
module.exports.signUP=async function(req,res)
{
  return res.render('sign_up',
  {
    title:"Sign Up"
  })   
}

// sign in controller
module.exports.signIn=async function(req,res)
{
  return res.render('sign_in',
  {
    title:"Sign Up"
  })   
}
module.exports.Create=async function(req,res){

    if(req.body.password != req.body.confirmPassword){
        //disply flash messages
        req.flash('error' , 'Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        });
       
        req.flash('success',"user create sucessfully")
        return res.redirect('/user/signin');
    }
    return res.redirect('back');
}
module.exports.Createsession= async  function(req,res){
  req.flash('success',"Logged in sucessfully")
    return res.redirect('/')
    
}
module.exports.destroySession=async function(req,res){
    try{
        if(!req.isAuthenticated()){
        
            // flash Messages
             req.flash('error',"user is not Authenticated")

            return res.redirect('/user/signin');
        }
        req.logout(function (error) {
            if (error) {
              
               return res.redirect('back');
            }
            // flash Messages
            req.flash('success',"logout sucessfully")
      
            return res.redirect('/user/signin');
         });
      

    }
    catch{
     console.log(err)
    }

}
//delete student controller
module.exports.deleteStudent=async function(req,res){
    try{
    
       const  student=await Student.findByIdAndDelete(req.params.id);
       const user=await User.findOne({_id:req.user.id});
       user.students.pull(req.params.id);
       await Interview.deleteMany({student:req.params.id});
       await Result.deleteMany({student:req.params.id});

      req.flash('success',"delete student sucessfully")
      return res.redirect('/');
      

      
   

    }
    catch(err){
      console.log(err)
    }



}

//render student info
module.exports.Update=async function(req,res){
const student=await Student.findById(req.params.id);

  return res.render('update',{
    title:"update",
    student:student
  })
}
//update student info comtroller
module.exports.updateInfo=async function(req,res){

  try{ 
    const student= await Student.findByIdAndUpdate(req.params.id,{
      name:req.body.name,
      email:req.body.email,
      college:req.body.college,
      status:req.body.status,
      batch:req.body.batch,
      dsa:req.body.dsa,
      web:req.body.web,
      react:req.body.react,
      user:req.user.id

    });
    student.save();
    return res.redirect('/student/detail')
       

  }  
  catch(err){
      console.log(err)
  }
}
//fownload csv file controller
module.exports.Report=async function(req,res){
  try{ 
     const workbook=  new excelJs.Workbook(); 
    const worksheet=  workbook.addWorksheet("My student informaation  Report");
     worksheet.columns=[
      {header:"s.no",key:"s_no" },
      {header:"name",key:"name" },
      {header:"email",key:"email" },
      {header:"college",key:"college" },
      {header:"batch",key:"batch" },
      {header:"dsa no",key:"dsa" },
      {header:"web devalopment no",key:"web" },
      {header:"react no",key:"react" },
     ];
     let counter=1;
   const userData= await Student.find({});
  
   
   userData.forEach((user)=>{
    user.s_no=counter;
    worksheet.addRow(user)
    counter++
   })
   worksheet.getRow(1).eachCell((cell)=>{
    cell.font={bold:true}
   });
   req.flash("success","csv file download sucessfully");
   res.setHeader("Content-Type",
   "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"

   );
   res.setHeader("Content-Disposition",`attachment;;filename=users.xlsx`)
    return workbook.xlsx.write(res).then(()=>{
      res.status(200)
    })
      
  }catch(err){
    console.log(err)
  }
}

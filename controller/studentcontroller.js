const Student=require('../model/student');
const User=require('../model/user');
module.exports.addStudent=async function(req,res){
     return res.render('student',{
        title:"Add Student"
     })
}
//create student details controller

module.exports.Create=async function(req,res){
   try{
    if(!req.isAuthenticated()){
        
        // flash Messages
          req.flash("success","user is not authenticated");
        return res.redirect('/user/signin');
    }
    const newstudent=await Student.create({
           name:req.body.name,
           email:req.body.email,
           college:req.body.college,
           status:req.body.status,
           batch:req.body.batch,
           dsa:req.body.dsa,
           web:req.body.web,
           react:req.body.react,
           user:req.user.id

    })

    if(newstudent){
        let user= await User.findById(req.user.id);
        console.log(user)
        user.students.push(newstudent) ;
        user.save();
        // flash Messages
        req.flash("success","student create sucessfully");
       return res.redirect('/')

    }
    else {
        return res.redirect('/student/addstudent')
        
    }


   }catch(err){
    console.log(err)
   }
       
}

module.exports.Details=async function(req,res){
   
const student= await Student.find({});


    return res.render('studentdetails',{
       title:"student details" ,
       student:student
    })
}

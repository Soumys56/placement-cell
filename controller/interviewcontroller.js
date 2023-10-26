const User=require('../model/user');
const Student=require('../model/student');
const Interview=require('../model/interview');
module.exports.Interview=async function(req,res){
 const student= await Student.find({});

  return res.render('interview',{
    title:"interview details",
    student:student
  })


}
module.exports.Create=async function(req,res){
    try{
        const interview=await Interview.create({
            user:req.user.id,
            student:req.body.student,
            company:req.body.company,
            date:req.body.date   
        })
        // const user=await User.findById(req.user.id);
        // console.log(user)
        // user.interviews.push(interview);
        // user.save();
        // flash message
        req.flash("success","Interview create sucessfully")
        return res.redirect('/');
            

    }
    catch(err){
        console.log(err)
    }
 
}



const Student=require('../model/student');
const Interview=require('../model/interview');
const Result=require('../model/result');
module.exports.Home=async function(req,res){
   
    const interview=await Interview.find({}).populate('student').populate({path:"results", populate: { path: 'result' }})
  
        console.log(interview)
    return res.render('home',{
        title:"Home",
       interview:interview
    })
}


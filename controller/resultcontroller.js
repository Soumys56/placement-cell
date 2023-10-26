const Interview=require('../model/interview');
const Result=require('../model/result');

//render result
module.exports.Result=async function(req,res){
    try{
          const interview=await Interview.findById(req.params.id).populate('student').populate('user')
          return res.render('result',{
            title:"result",
            interview:interview
          })
            
          

    }catch(err){
        console.log(err)
    }
}
// interview result create contro;;
module.exports.Create=async function(req,res){
    
   
    try{
        
        const serchresult=await Result.findOne({interview:req.body.interview});
        const interview=await Interview.findById(req.body.interview)     ;
        if(!serchresult){
            const result=await Result.create({
                interview:req.body.interview, 
                student:req.body.stdid,
                user:req.user.id,
                result:req.body.result
 
         })
         interview.results.push(result) ;
         interview.save();
         //flash message
         req.flash("success","interview result create successfully")
               
        return  res.redirect('/');
        }
        else{
            //flash message
         req.flash("error","interview error result create successfully")
            return res.redirect('/');
        }



    }
    catch(err){

    }
}
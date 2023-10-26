const mongoose=require('mongoose');
const interviewSchema=new mongoose.Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
     } ,
     student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
     },
     company:{
        type:String,
        require:true,
        
     },
     date:{
        type:Date,
        require:true
     },
     results:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Result"
     }]
},{
    timestamps:true
})
const Interview=mongoose.model('Interview',interviewSchema);
module.exports=Interview;
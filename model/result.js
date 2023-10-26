const mongoose=require('mongoose');
const resultSchema=mongoose.Schema({
     interview:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Interview"
     },
     student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
     },
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

     },
     result:{
        type:String,
        enum:['Pass','Fail','On Hold','Didn’t Attempt'],
        require:true
     }
    })
    const Result=mongoose.model('Result',resultSchema);
    module.exports=Result;
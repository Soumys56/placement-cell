const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true  
    },
    email:{
        type:String,

        require:true,
        unique:true
        
    },
    college:{
        type:String,
        require:true
    },
    status:{
        type:String,
        enum:['placed','not placed'],
        require:true
    },
    batch:{
        type:String,
        require:true
    },
    dsa:{
        type:Number,
        require:true
    },
    web:{
        type:Number,
        require:true
    },
    react:{
        type:Number,
        require:true
        
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps : true
    
})
const Student = mongoose.model('Student' , studentSchema);
module.exports = Student;
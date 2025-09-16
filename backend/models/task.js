import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    userID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    Source : {
        type : String,
        enum : ["Calender", "Gmail"],
        required : true
    },
    deadline : {
        type : Date,
        required : true
    },
    priority : {
        type : String,
        enum : ["High", "Low", "Medium"],
        required : true
    },
    status : {
        type :String,
        required : true
    },
    action : {
        type : String
    }
    
});

export default mongoose.model("Task", taskSchema);
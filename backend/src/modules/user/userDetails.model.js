import mongoose from "mongoose";

const userDetailsSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    phone:String,
    email:String,
    LinkedIn:String,
    location:String,
    bio:String,
    headline:String,
    about:String,
    skills:{
        type:[String],
        default:[]
    },
    openToWork:Boolean,
    experience:[
        {
            company: String,
            position:String,
            startAt:Date,
            endAt:Date,
            description:String,
        },
    ],
    education:[{
        institution:String,
        degree:String,
        fieldOfStudy:String,
        startAt:Date,
        endAt:Date,
    }],
    profileImg:{
        type:String,
        default:""
    },
    cv: String,
    profilePublicId:String,


},{timestamps:true});
export default mongoose.model("UserDetails",userDetailsSchema);
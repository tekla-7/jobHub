import mongoose from "mongoose";

const userDetailsSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    name:String,
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
            current: {
                type: Boolean,
                default: false
            }
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
    website: String,
    contactVisibility: {
        type: String,
        enum: ['applied', 'all', 'none'],
        default: 'applied'
    },
    cvPublicId: String,

},{timestamps:true});
export default mongoose.model("UserDetails",userDetailsSchema);
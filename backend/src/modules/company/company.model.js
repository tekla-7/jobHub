import mongoose from "mongoose";

export const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
    },
    industry: {
        type: String,
        default: ""
    },
    companySize:{
        type: String,
        enum:['1-10','11-50','51-200','201-500','500+'],
        default: undefined,
    },
    location: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },

    foundedYear:{
        type:Number,
        min:1800,
        max:new Date().getFullYear()
    },
    coverImg:{
        type:String,
        default:""
    },
    coverPublicId:String,
    profilePublicId:String,
    logoPublicId:String,
    profileImg:{
        type:String,
        default:""
    }
}, {
    timestamps: true
})

export default mongoose.model('Company', companySchema)
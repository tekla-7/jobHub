import mongoose from "mongoose";
import {DEPARTMENTS, EMPLOYMENT_TYPE, JOB_STATUS, WORKPLACE_TYPES} from "./jobs.constants.js";

const jobSchema =new mongoose.Schema({
    company: {type:mongoose.Schema.Types.ObjectId,ref:"Company",required:true},
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",required:true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    department: { type: String,enum:DEPARTMENTS, required: true },
    employmentType: { type: String,enum:EMPLOYMENT_TYPE, required: true },
    workplaceType: { type: String,enum:WORKPLACE_TYPES, required: true },
    salaryMin: { type: Number,  },
    salaryMax: { type: Number, },
    skills:{type: [String],default:[]},
    status: {type: String,enum:JOB_STATUS, default: JOB_STATUS[0]},
    startAt: { type: Date, default: Date.now },
    endAt: { type: Date, default: null },
},{timestamps:true});
export default mongoose.model("Job", jobSchema);
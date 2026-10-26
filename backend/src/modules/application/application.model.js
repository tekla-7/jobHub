import mongoose from "mongoose";
import {APPLICATION_STATUS} from "./application.constants.js";

const applicationSchema = mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    cv: {
        type: String,
        required: true
    },
    coverLetter: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: APPLICATION_STATUS,
        default: APPLICATION_STATUS[0],
    },
}, {timestamps: true});
applicationSchema.index({
    candidate: 1, job: 1
}, {unique: true});
export default mongoose.model("Application", applicationSchema);
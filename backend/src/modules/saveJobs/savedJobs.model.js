import mongoose from "mongoose";

const savedJobsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },

}, {timestamps: true});
savedJobsSchema.index({
    candidate: 1, job: 1
}, {unique: true});
export default mongoose.model("SavedJobs", savedJobsSchema);
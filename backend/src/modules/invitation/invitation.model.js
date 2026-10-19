import mongoose from "mongoose";
import {COMPANY_ROLES} from "../company/company.constants.js";
import {INVITATION_STATUS} from "./invitation.constants.js";
import crypto from "node:crypto";
import {createHash} from "./invitation.service.js";
const invitationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    role: {
        type: String,
        enum: COMPANY_ROLES,
        required: true
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: INVITATION_STATUS,
        default: INVITATION_STATUS.PENDING
    },
    respondedAt: {
        type: Date,
        required: null
    }
}, {
    timestamps: true
})
invitationSchema.pre('save',  function () {
    this.token= createHash(this.token)
})
export default mongoose.model("Invitation", invitationSchema);
import mongoose from "mongoose";

export const refreshTokenSchema =new mongoose.Schema({
    token:{
        type: String,
        required: true,
        unique: true
    },
    accountId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
})

export default mongoose.model("RefreshToken",refreshTokenSchema);
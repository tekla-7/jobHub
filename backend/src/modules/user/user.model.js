import mongoose from "mongoose";
import {hash} from "bcryptjs";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address"
        ],
        unique: [true, 'Email address already exists'],
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    confirmPassword: {
        type: String,
        required: true,
        select: false,

        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Password must match"
        }
    },
    passwordChangedAt: {
        type: Date,
    },

    company: String,
}, {
    timestamps: true
})

userSchema.pre('save', async function () {
    if (!this.isModified("password")) return;
    this.password = await hash(this.password, 10);
    this.confirmPassword = undefined;
})
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (!this.passwordChangedAt) {
        return false;
    }
    const changedTimestamp =
        parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;

}
export default mongoose.model('User', userSchema)
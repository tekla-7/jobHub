import UserModel from "./user.model.js";

export const findUser=(filter)=>UserModel.findOne(filter)
import Invitation from'./invitation.model.js'
import crypto from "node:crypto";
export const create=(data)=>Invitation.create(data);
export const getByToken=(token)=>Invitation.findOne({token});
export const getById=(id)=>Invitation.findById(id);
export const createHash=(token)=>crypto.createHash('sha256').update(token).digest('hex')
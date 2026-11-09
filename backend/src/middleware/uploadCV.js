import multer from "multer";
import {AppError} from "../shared/errors/appError.js";

const storage=multer.memoryStorage()
const limits={fileSize:5*1024*1024}
const filFilter=(req,file,cb)=>{
    if(file.mimetype==='application/pdf'){
        cd(null,true)
    }else {
        cb(new AppError('Only PDF file are allowed'), false);
    }
}
const uploadCV=multer({
    storage,limits,filFilter,
})
export default uploadCV
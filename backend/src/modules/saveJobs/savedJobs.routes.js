import express from "express";
import router from "../invitation/invitation.routes.js";
import {protect} from "../../middleware/auth.middleware.js";
import {addSaveJob, removeSaveJob, savedJobs} from "./savedJobs.controller.js";

const route=express.Router();
router.use(protect)
route.get('',savedJobs)
route.post('/add',addSaveJob)
route.delete('/remove/:id',removeSaveJob)

export default router;

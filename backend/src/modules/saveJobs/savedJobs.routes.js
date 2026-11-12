import express from "express";
import {protect} from "../../middleware/auth.middleware.js";
import {addSaveJob, removeSaveJob, savedJobs, savedJobsIds} from "./savedJobs.controller.js";

const router=express.Router();
router.use(protect)
router.get('',savedJobs)
router.get('/ids',savedJobsIds)

router.post('/:jobId',addSaveJob)
router.delete('/:jobId',removeSaveJob)

export default router;

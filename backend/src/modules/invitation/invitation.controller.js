import crypto from "node:crypto";
import {catchAsync} from "../../shared/errors/asynchronousError .js";
import {resend} from "../../config/resend.js";
import {AppError} from "../../shared/errors/appError.js";
import {create, createHash, getById, getByToken} from "./invitation.service.js";
import {INVITATION_STATUS} from "./invitation.constants.js";

///@desc post invitation
///@route post /api/invitations/company/:companyId
export const createInvitation = catchAsync(async (req, res, next) => {
    const {companyId} = req.params;
    const {email, role} = req.body;
    const userId = req.user._id;
    const token = crypto.randomBytes(32).toString('hex');

    const invitationAcceptUrl = `${process.env.FRONTEND_URL}/api/invitations/accept?token=${token}`
    const invitationRejectUrl = `${process.env.FRONTEND_URL}/api/invitations/reject?token=${token}`

    const {error} = await resend.emails.send({
        from: process.env.RESEND_FROM,
        // from: "JobHub <onboarding@resend.dev>",
        to: email,
        subject: "You're invited to join a company!",
        html: `<div style="max-width: 500px;margin:auto;padding: 24px;background-color: aliceblue"> <h2>You're Invited!</h2> 
            <p>you have been inivted to join a company.</p>
            <p>this invitation expires in 24 hours.</p>
            <a href="${invitationAcceptUrl}" style='background:mediumspringgreen;color:white;padding: 12px 24px;border-radius: 12px;display: inline-block;margin-left: 10px'>Accept Invitation</a>
            <a href="${invitationRejectUrl}" style='background:red;color:white;padding: 12px 24px;border-radius: 12px;display: inline-block;'>Reject Invitation</a> 
            <p style="color: #666;margin-top: 24px">
            If you weren't expecting this invitation,you can ignore this email.</p>
            </div>`

    })
    if (error) {
        return next(new AppError(error.message, 502));
    }
    await create({
        company: companyId,
        email,
        role,
        invitedBy: userId,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),

    })
    return res.status(200).json({
        message: 'Invitation send successfully.',
    })
})
///@desc get invitation
///@route get /api/invitations
export const getInvitation = catchAsync(async (req, res, next) => {
    const {token} = req.query;
    const invitation = await getByToken(token).populate('company', 'name');
    return res.status(200).json({
        message: 'Success.',
        data: invitation,
    })
})
///@desc patch invitation
///@route patch /api/invitations/accept
export const acceptInvitation = catchAsync(async (req, res, next) => {
    const {token} = req.query;
    const userEmail = req.user.email.toLowerCase().trim()
    const invitation = await getByToken(token);
    if (invitation.expiresAt.getTime() < Date.now()) {
        return next(new AppError('Invitation is expired!', 410));
    }
    if (invitation.status !== INVITATION_STATUS.PENDING) {
        return next(new AppError('Invitation has already been processed!', 410));
    }
    if (userEmail !== invitation.email) {
        return next(new AppError('This invitation belongs to another user!', 403));
    }
    invitation.status = INVITATION_STATUS.ACCEPTED;
    invitation.respondedAt = new Date();
    await invitation.save()
    return res.status(200).json({
        message: "Invitation accepted successfully"
    })
})
///@desc patch invitation
///@route patch /api/invitations/reject
export const rejectInvitation = catchAsync(async (req, res, next) => {
    const {token} = req.query;
    const userEmail = req.user.email.toLowerCase().trim()
    const invitation = await getByToken(token);
    if (invitation.expiresAt.getTime() < Date.now()) {
        return next(new AppError('Invitation is expired!'), 410);
    }
    if (invitation.status !== INVITATION_STATUS.PENDING) {
        return next (new AppError('Invitation has already been processed!', 410));
    }
    if (userEmail !== invitation.email) {
        return next (new AppError('This invitation belongs to another user!', 403));
    }
    invitation.status = INVITATION_STATUS.REJECTED;
    invitation.respondedAt = new Date();
    await invitation.save()
    return res.status(200).json({
        message: "Invitation rejected successfully"
    })
})
///@desc patch invitation
///@route patch /api/invitations/:id/cancel
export const cancelInvitation = catchAsync(async (req, res, next) => {
    const {id} = req.params
    const invitation = await getById(id);
    if (invitation.expiresAt.getTime() < Date.now()) {
        return next( new AppError('Invitation is expired!', 410));
    }
    if (invitation.status !== INVITATION_STATUS.PENDING) {
        return next(new AppError('Invitation has already been processed!', 410));
    }
    invitation.status = INVITATION_STATUS.CANCELLED;
    invitation.respondedAt = new Date();
    await invitation.save()
    return res.status(200).json({
        message: "Invitation canceled successfully"
    })
})
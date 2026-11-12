import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {applyToJob} from "../api";
import Modal from "../../../shared/components/Modal";
import getErrorMessage from "../../../shared/utils/errorMessage";
import {Job} from "../types/job.type";

interface Props { job: Job; open: boolean; onClose: () => void; onApplied: () => void }

export default function ApplyModal({ job, open, onClose, onApplied }: Props) {
    const [note, setNote] = useState('');
    const qc = useQueryClient();
    const apply = useMutation({
        mutationFn: () => applyToJob(job._id, note.trim() || undefined),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['job', job._id] });
            setNote('');
            onApplied();
        },
    });

    return (
        <Modal open={open} onClose={onClose} title={`Apply to ${job.title}`}>
            <h2 className="text-[17px] font-bold">Apply to {job.title}</h2>
            <p className="mt-1 text-[13px] text-[#667085]">at {job.company.name} · Your profile and CV will be shared with the employer.</p>

            <label htmlFor="cover-note" className="mb-1.5 mt-5 block text-[13px] font-semibold">Cover note <span className="font-normal text-[#667085]">(optional)</span></label>
            <textarea
                id="cover-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={1000}
                placeholder="Tell them why you're a good fit…"
                className="min-h-[110px] w-full resize-y rounded-lg border border-[#E4E7EC] px-3 py-2.5 text-sm outline-none focus:border-[#28508E] focus:ring-[3px] focus:ring-[#E9EEF7]"
            />
            <p className="mt-1 text-right text-xs text-[#667085]">{note.length}/1000</p>

            {apply.isError && <div role="alert" className="mt-3 rounded-lg bg-[#FBE7E4] px-3 py-2.5 text-[13px] text-[#C0392B]">{getErrorMessage(apply.error)}</div>}

            <div className="mt-5 flex justify-end gap-2.5">
                <button type="button" onClick={onClose} className="rounded-lg border border-[#E4E7EC] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-[#F8F9FB]">Cancel</button>
                <button
                    type="button"
                    onClick={() => apply.mutate()}
                    disabled={apply.isPending}
                    className="rounded-lg bg-[#28508E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1E3E70] disabled:opacity-60"
                >
                    {apply.isPending ? 'Submitting…' : 'Submit application'}
                </button>
            </div>
        </Modal>
    );
}

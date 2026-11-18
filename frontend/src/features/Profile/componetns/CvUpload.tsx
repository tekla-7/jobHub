import {useDeleteCv, useUploadCv} from "../hooks/useProfile";
import {ChangeEvent, useState} from "react";
import getErrorMessage from "../../../shared/utils/errorMessage";

const MAX = 5 * 1024 * 1024;
const EXT = /\.(pdf|doc|docx)$/i;

export default function CvUpload({ cvName, cvUrl }: { cvName?: string; cvUrl?: string }) {
    const upload = useUploadCv();
    const remove = useDeleteCv();
    const [localError, setLocalError] = useState('');

    const onFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        if (!EXT.test(file.name)) return setLocalError('Use a PDF or Word file.');
        if (file.size > MAX) return setLocalError('The file must be 5 MB or smaller.');
        setLocalError('');
        upload.mutate(file);
    };

    const error = localError || (upload.isError ? getErrorMessage(upload.error) : '') || (remove.isError ? getErrorMessage(remove.error) : '');

    return (
        <div>
            <div className="flex flex-wrap items-center gap-3 rounded-lg bg-[#F8F9FB] px-4 py-3">
        <span className="min-w-0 flex-1 truncate text-sm font-medium">
          {cvUrl ? <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{cvName ?? 'CV'}</a> : <span className="text-[#667085]">No CV uploaded</span>}
        </span>
                <label className="cursor-pointer rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-2 text-[13px] font-semibold hover:bg-[#F8F9FB]">
                    {upload.isPending ? 'Uploading…' : cvUrl ? 'Replace' : 'Upload CV'}
                    <input type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={onFile} disabled={upload.isPending} />
                </label>
                {cvUrl && (
                    <button type="button" onClick={() => remove.mutate()} disabled={remove.isPending} className="rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-2 text-[13px] font-semibold hover:bg-[#F8F9FB] disabled:opacity-60">Remove</button>
                )}
            </div>
            <p className="mt-2 text-xs text-[#667085]">PDF or Word · max 5 MB</p>
            {error && <p role="alert" className="mt-1 text-xs text-[#C0392B]">{error}</p>}
        </div>
    );
}

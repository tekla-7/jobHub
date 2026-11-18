import {useDeleteAvatar, useUploadAvatar} from "../hooks/useProfile";
import {ChangeEvent, useState} from "react";
import Avatar from "../../../shared/components/Avatar";
import getErrorMessage from "../../../shared/utils/errorMessage";

const MAX = 2 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function AvatarUpload({ name, src }: { name: string; src?: string }) {
    const upload = useUploadAvatar();
    const remove = useDeleteAvatar();
    const [localError, setLocalError] = useState('');

    const onFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = ''; // allow choosing the same file again
        if (!file) return;
        if (!TYPES.includes(file.type)) return setLocalError('Use a JPG, PNG or WebP image.');
        if (file.size > MAX) return setLocalError('The image must be 2 MB or smaller.');
        setLocalError('');
        upload.mutate(file);
    };

    const error = localError || (upload.isError ? getErrorMessage(upload.error) : '') || (remove.isError ? getErrorMessage(remove.error) : '');

    return (
        <div className="flex items-center gap-5">
            <Avatar name={name} src={src} size={72} />
            <div>
                <div className="flex flex-wrap gap-2">
                    <label className="cursor-pointer rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-2 text-[13px] font-semibold hover:bg-[#F8F9FB]">
                        {upload.isPending ? 'Uploading…' : src ? 'Change photo' : 'Upload photo'}
                        <input type="file" accept={TYPES.join(',')} className="sr-only" onChange={onFile} disabled={upload.isPending} />
                    </label>
                    {src && (
                        <button type="button" onClick={() => remove.mutate()} disabled={remove.isPending} className="rounded-lg border border-[#E4E7EC] bg-white px-3.5 py-2 text-[13px] font-semibold hover:bg-[#F8F9FB] disabled:opacity-60">
                            Remove
                        </button>
                    )}
                </div>
                <p className="mt-2 text-xs text-[#667085]">JPG, PNG or WebP · max 2 MB</p>
                {error && <p role="alert" className="mt-1 text-xs text-[#C0392B]">{error}</p>}
            </div>
        </div>
    );
}

import {initialsOf} from "../utils/utils";

export default function Avatar({ name, src, size = 40 }: { name: string; src?: string; size?: number }) {
    const style = { width: size, height: size, fontSize: Math.round(size * 0.36) };
    return src ? (
        <img src={src} alt="" style={style} className="shrink-0 rounded-full object-cover" />
    ) : (
        <span style={style} className="flex shrink-0 items-center justify-center rounded-full bg-[#28508E] font-semibold text-white">
      {initialsOf(name)}
    </span>
    );
}

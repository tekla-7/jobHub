export default function CompanyMark({ name, logo, size = 42 }: { name: string; logo?: string; size?: number }) {
    const style = { width: size, height: size };
    console.log(name)
    return logo ? (
        <img src={logo} alt="" style={style} className="shrink-0 rounded-lg object-cover" />
    ) : (
        <span style={style} className="flex shrink-0 items-center justify-center rounded-lg bg-[#E9EEF7] text-sm font-bold text-[#1E3E70]">
      {name?name.charAt(0).toUpperCase():''}
    </span>
    );
}

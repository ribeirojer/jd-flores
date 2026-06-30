import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21V11" strokeLinecap="round" />
          <path d="M12 11c-3 0-5-2-5-5 3 0 5 2 5 5Z" fill="currentColor" fillOpacity="0.25" />
          <path d="M12 11c3 0 5-2 5-5-3 0-5 2-5 5Z" fill="currentColor" fillOpacity="0.4" />
          <path d="M12 14c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4Z" fill="currentColor" fillOpacity="0.2" />
        </svg>
      </span>
      {!compact && (
        <div className="leading-tight">
          <div className="font-display text-lg font-semibold text-foreground">JD Flores</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">e Plantas · Atacado</div>
        </div>
      )}
    </Link>
  );
}

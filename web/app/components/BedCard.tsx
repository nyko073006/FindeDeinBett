import type { Bed } from '@/lib/types';

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency || 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function Badge({
  children,
  tone = 'slate',
}: {
  children: React.ReactNode;
  tone?: 'slate' | 'indigo' | 'emerald' | 'amber';
}) {
  const tones: Record<string, string> = {
    slate: 'bg-slate-50 text-slate-700 ring-slate-200',
    indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    amber: 'bg-amber-50 text-amber-800 ring-amber-200',
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export default function BedCard({ bed }: { bed: Bed }) {
  const size = bed.width && bed.length ? `${bed.width}×${bed.length} cm` : null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-slate-300 focus-within:-translate-y-0.5 focus-within:shadow-lg focus-within:ring-slate-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        {bed.imageUrl ? (
          // Bild ist dekorativ: Titel steht im h3 unter der Karte, alt="" verhindert Doppel-Announce
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bed.imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
            Kein Bild
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[11px] font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur">
          {bed.shop}
        </span>
        {!bed.inStock && (
          <span className="absolute right-3 top-3">
            <Badge tone="amber">Nicht verfügbar</Badge>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
          {bed.title}
        </h3>

        <div className="flex flex-wrap gap-1">
          {bed.firmness && <Badge tone="indigo">{bed.firmness}</Badge>}
          {bed.mattressType && <Badge>{bed.mattressType}</Badge>}
          {size && <Badge>{size}</Badge>}
          {!bed.hasHeadboard && <Badge tone="emerald">Ohne Kopfteil</Badge>}
          {bed.hasTopper && (
            <Badge>{bed.topperType ? `Topper: ${bed.topperType}` : 'Mit Topper'}</Badge>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="block text-[10px] uppercase tracking-wide text-slate-500">ab</span>
            <span className="text-2xl font-bold text-slate-900">
              {formatPrice(bed.price, bed.currency)}
            </span>
          </div>
          <a
            href={bed.url}
            target="_blank"
            rel="noopener sponsored"
            className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Zum Shop
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

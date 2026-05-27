import type { Bed } from '@/lib/types';

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency || 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

function Badge({ children, tone = 'slate' }: { children: React.ReactNode; tone?: 'slate' | 'indigo' | 'emerald' | 'amber' }) {
  const tones: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700 ring-slate-200',
    indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${tones[tone]}`}>
      {children}
    </span>
  );
}

export default function BedCard({ bed }: { bed: Bed }) {
  const size = bed.width && bed.length ? `${bed.width} × ${bed.length} cm` : null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {bed.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bed.imageUrl}
            alt={bed.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">Kein Bild</div>
        )}
        <span className="absolute left-3 top-3">
          <Badge tone="slate">{bed.shop}</Badge>
        </span>
        {!bed.inStock && (
          <span className="absolute right-3 top-3">
            <Badge tone="amber">Nicht verfügbar</Badge>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">{bed.title}</h3>

        <div className="flex flex-wrap gap-1.5">
          {bed.firmness && <Badge tone="indigo">Härtegrad {bed.firmness}</Badge>}
          {bed.mattressType && <Badge tone="slate">{bed.mattressType}</Badge>}
          <Badge tone={bed.hasHeadboard ? 'slate' : 'emerald'}>
            {bed.hasHeadboard ? 'Mit Kopfteil' : 'Ohne Kopfteil'}
          </Badge>
          <Badge tone="slate">{bed.topperType ? `Topper: ${bed.topperType}` : 'Ohne Topper'}</Badge>
          {size && <Badge tone="slate">{size}</Badge>}
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <span className="text-xl font-bold text-slate-900">{formatPrice(bed.price, bed.currency)}</span>
          <a
            href={bed.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Zum Shop
          </a>
        </div>
      </div>
    </article>
  );
}

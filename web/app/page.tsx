'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Bed } from '@/lib/types';
import BedCard from './components/BedCard';
import FilterSidebar, { DEFAULT_FILTERS, type Filters } from './components/FilterSidebar';

function buildQuery(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.q) params.set('q', filters.q);
  if (filters.minPrice) params.set('minPrice', filters.minPrice);
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
  if (filters.firmness.length) params.set('firmness', filters.firmness.join(','));
  if (filters.mattressType.length) params.set('mattressType', filters.mattressType.join(','));
  if (filters.headboard === 'with') params.set('hasHeadboard', 'true');
  if (filters.headboard === 'without') params.set('hasHeadboard', 'false');
  if (filters.topper === 'with') params.set('hasTopper', 'true');
  if (filters.topper === 'without') params.set('hasTopper', 'false');
  params.set('sort', filters.sort);
  return params.toString();
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [beds, setBeds] = useState<Bed[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = useMemo(() => buildQuery(filters), [filters]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      fetch(`/api/beds?${query}`)
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) throw new Error(data.error ?? 'Fehler beim Laden der Betten.');
          return data;
        })
        .then((data) => {
          if (!active) return;
          setBeds(data.beds);
          setCount(data.count);
        })
        .catch((err: Error) => {
          if (active) setError(err.message);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">FindYourBed</h1>
        <p className="mt-1 text-slate-600">
          Finde dein perfektes Boxspringbett – gefiltert nach Preis, Härtegrad, Matratzentyp, Topper und Kopfteil.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <FilterSidebar filters={filters} onChange={setFilters} />

        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              {loading ? 'Lädt …' : `${count} ${count === 1 ? 'Bett' : 'Betten'} gefunden`}
            </p>
          </div>

          {error ? (
            <div className="rounded-2xl bg-amber-50 p-6 text-amber-800 ring-1 ring-amber-200">{error}</div>
          ) : loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-80 animate-pulse rounded-2xl bg-white ring-1 ring-slate-200" />
              ))}
            </div>
          ) : beds.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-slate-200">
              <p className="font-medium text-slate-900">Keine Betten gefunden.</p>
              <p className="mt-1 text-sm text-slate-600">
                Passe die Filter an – oder führe den Scraper aus, falls die Datenbank noch leer ist
                (<code className="rounded bg-slate-100 px-1 py-0.5">python scraper/main.py</code>).
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {beds.map((bed) => (
                <BedCard key={bed.id} bed={bed} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

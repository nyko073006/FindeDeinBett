'use client';

import { FIRMNESS_OPTIONS, MATTRESS_TYPES, TOPPER_TYPES } from '@/lib/types';

export type Headboard = 'all' | 'with' | 'without';
export type SortOption = 'price_asc' | 'price_desc' | 'newest';

export type Filters = {
  q: string;
  minPrice: string;
  maxPrice: string;
  firmness: string[];
  mattressType: string[];
  topperType: string[];
  headboard: Headboard;
  sort: SortOption;
};

export const DEFAULT_FILTERS: Filters = {
  q: '',
  minPrice: '',
  maxPrice: '',
  firmness: [],
  mattressType: [],
  topperType: [],
  headboard: 'all',
  sort: 'price_asc',
};

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-slate-200 py-4 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      {children}
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
      />
      {label}
    </label>
  );
}

export default function FilterSidebar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  const update = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <aside className="lg:sticky lg:top-6 lg:h-fit">
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Filter</h2>
          <button
            type="button"
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
          >
            Zurücksetzen
          </button>
        </div>

        <Section title="Suche">
          <input
            type="text"
            value={filters.q}
            onChange={(event) => update({ q: event.target.value })}
            placeholder="z.B. Boxspring 180"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </Section>

        <Section title="Preis (€)">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={filters.minPrice}
              onChange={(event) => update({ minPrice: event.target.value })}
              placeholder="von"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <span className="text-slate-400">–</span>
            <input
              type="number"
              min={0}
              value={filters.maxPrice}
              onChange={(event) => update({ maxPrice: event.target.value })}
              placeholder="bis"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </Section>

        <Section title="Kopfteil">
          <div className="flex flex-col gap-2">
            {([
              ['all', 'Alle'],
              ['with', 'Mit Kopfteil'],
              ['without', 'Ohne Kopfteil'],
            ] as [Headboard, string][]).map(([value, label]) => (
              <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="headboard"
                  checked={filters.headboard === value}
                  onChange={() => update({ headboard: value })}
                  className="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                {label}
              </label>
            ))}
          </div>
        </Section>

        <Section title="Härtegrad">
          <div className="flex flex-col gap-2">
            {FIRMNESS_OPTIONS.map((value) => (
              <Checkbox
                key={value}
                label={value}
                checked={filters.firmness.includes(value)}
                onChange={() => update({ firmness: toggle(filters.firmness, value) })}
              />
            ))}
          </div>
        </Section>

        <Section title="Matratzentyp">
          <div className="flex flex-col gap-2">
            {MATTRESS_TYPES.map((value) => (
              <Checkbox
                key={value}
                label={value}
                checked={filters.mattressType.includes(value)}
                onChange={() => update({ mattressType: toggle(filters.mattressType, value) })}
              />
            ))}
          </div>
        </Section>

        <Section title="Topper">
          <div className="flex flex-col gap-2">
            {TOPPER_TYPES.map((value) => (
              <Checkbox
                key={value}
                label={value}
                checked={filters.topperType.includes(value)}
                onChange={() => update({ topperType: toggle(filters.topperType, value) })}
              />
            ))}
          </div>
        </Section>

        <Section title="Sortierung">
          <select
            value={filters.sort}
            onChange={(event) => update({ sort: event.target.value as SortOption })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="price_asc">Preis aufsteigend</option>
            <option value="price_desc">Preis absteigend</option>
            <option value="newest">Neueste zuerst</option>
          </select>
        </Section>
      </div>
    </aside>
  );
}

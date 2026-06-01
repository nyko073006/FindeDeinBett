import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              <span className="text-slate-900">Finde</span>
              <span className="text-amber-500">Dein</span>
              <span className="text-slate-900">Bett</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Unabhängiger Bett-Finder für Boxspringbetten.
              <br />
              Kein Verkauf, nur Vergleich.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Rechtliches
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
              <li>
                <Link href="/impressum" className="hover:text-slate-900">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-slate-900">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/werbehinweis" className="hover:text-slate-900">
                  Werbehinweis
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Hinweis
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Diese Seite enthält Affiliate-Links. Wenn du über einen Shop-Button kaufst,
              erhalten wir eine kleine Provision — für dich entstehen keine Mehrkosten.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-4 text-xs text-slate-500">
          © 2025 FindeDeinBett.de
        </div>
      </div>
    </footer>
  );
}

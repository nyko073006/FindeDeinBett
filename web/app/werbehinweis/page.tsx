import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Werbehinweis – FindeDeinBett',
};

export default function WerbehinweisPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-900">
        ← Zurück zur Startseite
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        Werbehinweis & Affiliate-Transparenz
      </h1>

      <section className="mt-8 space-y-6 text-slate-700">
        <p className="leading-relaxed">
          FindeDeinBett.de finanziert sich ausschließlich über{' '}
          <strong>Affiliate-Links</strong> und ist daher gemäß § 5a Abs. 6 UWG als
          kommerzielles Angebot gekennzeichnet. Auf dieser Seite erklären wir, wie
          das funktioniert und was es für dich bedeutet.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">Wie wir Geld verdienen</h2>
          <p className="mt-3 leading-relaxed">
            Wenn du auf einen der „Zum Shop"-Buttons klickst, wirst du über ein
            Affiliate-Netzwerk (z. B. AWIN für Otto) zum jeweiligen Shop
            weitergeleitet. Kaufst du dort innerhalb des Tracking-Zeitraums
            (üblicherweise 30 Tage), erhalten wir vom Shop eine Provision.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">Was das für dich bedeutet</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
            <li>
              <strong>Kein Aufpreis.</strong> Der Preis ist identisch zu dem, den du
              beim direkten Besuch des Shops bezahlen würdest.
            </li>
            <li>
              <strong>Kein Login, keine Daten.</strong> Du musst dich nirgendwo
              registrieren, damit Affiliate-Links funktionieren.
            </li>
            <li>
              <strong>Keine Manipulation der Rangfolge.</strong> Welche Betten
              angezeigt werden und in welcher Reihenfolge richtet sich ausschließlich
              nach deinen Filtern (Preis, Härtegrad, Matratzentyp, …) — nicht nach
              der Provisionshöhe einzelner Shops.
            </li>
            <li>
              <strong>Auch Shops ohne Partnerprogramm.</strong> Wenn ein Bett von
              einem Shop kommt, mit dem wir kein Affiliate-Programm haben, leiten wir
              dich trotzdem normal weiter — wir bekommen dann eben keine Provision.
              Wir wollen dir das passende Bett zeigen, nicht nur das provisionsstarke.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Mit welchen Partnern wir arbeiten
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 leading-relaxed">
            <li>Otto (über AWIN)</li>
            <li>weitere Programme in Vorbereitung</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Datenfluss bei einem Klick
          </h2>
          <ol className="mt-3 list-decimal space-y-1 pl-6 leading-relaxed">
            <li>Dein Browser ruft die Tracking-URL des Affiliate-Netzwerks auf.</li>
            <li>Das Netzwerk setzt ein Cookie zur Zuordnung der Provision.</li>
            <li>Du wirst sofort zum Shop weitergeleitet.</li>
          </ol>
          <p className="mt-3 leading-relaxed">
            Details dazu in der{' '}
            <Link href="/datenschutz" className="underline hover:text-slate-900">
              Datenschutzerklärung
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">Aktualität der Daten</h2>
          <p className="mt-3 leading-relaxed">
            Die Bett-Daten (Preis, Verfügbarkeit, Bilder) werden wöchentlich direkt
            aus den Shop-Sortimenten aktualisiert. Trotz Sorgfalt können Preise oder
            Lagerbestände sich kurzfristig ändern. Maßgeblich ist immer der Preis im
            Shop zum Zeitpunkt deines Kaufs.
          </p>
        </div>
      </section>
    </main>
  );
}

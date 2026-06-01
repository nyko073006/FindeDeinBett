import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Werbehinweis – FindeDeinBett',
};

export default function WerbehinweisPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">Werbehinweis</h1>

      <section className="mt-6 space-y-4 text-slate-700">
        <p>
          FindeDeinBett.de finanziert sich über sogenannte <strong>Affiliate-Links</strong>.
          Wenn du auf einen der Shop-Buttons klickst und im jeweiligen Shop etwas kaufst,
          erhalten wir vom Shop eine Provision.
        </p>

        <p>
          <strong>Für dich entstehen dadurch keine Mehrkosten</strong> — der Preis ist
          identisch zu dem, den du beim direkten Besuch des Shops bezahlen würdest.
        </p>

        <p>
          Wir arbeiten u. a. mit dem Partnerprogramm von Otto (über das Affiliate-Netzwerk
          AWIN) zusammen. Welche Betten angezeigt werden und in welcher Reihenfolge
          richtet sich nach deinen Filterauswahlen — nicht nach der Provisionshöhe.
        </p>

        <p>
          Die Bett-Daten (Preis, Verfügbarkeit, Bilder) werden regelmäßig direkt von
          den jeweiligen Shops bezogen. Wir bemühen uns um Aktualität, können aber
          kurzfristige Preisänderungen oder Lagerbestände nicht garantieren — vor dem
          Kauf bitte den Preis im Shop prüfen.
        </p>
      </section>
    </main>
  );
}

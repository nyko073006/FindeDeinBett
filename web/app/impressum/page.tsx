import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum – FindeDeinBett',
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">Impressum</h1>

      <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
        <strong>Platzhalter.</strong> Trage hier deine vollständigen Angaben gemäß
        § 5 TMG ein, bevor du die Seite öffentlich bewirbst (z. B. AWIN/Otto-Bewerbung,
        Google Ads, Social Media). Ohne korrektes Impressum drohen Abmahnungen.
      </div>

      <section className="mt-8 space-y-6 text-slate-700">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Angaben gemäß § 5 TMG</h2>
          <p className="mt-2 leading-relaxed">
            [Vor- und Nachname]
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ und Ort]
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">Kontakt</h2>
          <p className="mt-2 leading-relaxed">
            E-Mail: [deine@email.de]
            <br />
            Telefon: [optional]
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p className="mt-2 leading-relaxed">[Vor- und Nachname], Anschrift wie oben</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">Haftungshinweis</h2>
          <p className="mt-2 leading-relaxed">
            Trotz sorgfältiger Prüfung übernehmen wir keine Haftung für die Inhalte
            externer Links. Für den Inhalt der verlinkten Shops sind ausschließlich
            deren Betreiber verantwortlich.
          </p>
        </div>
      </section>
    </main>
  );
}

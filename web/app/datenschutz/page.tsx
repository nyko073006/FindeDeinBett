import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutz – FindeDeinBett',
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900">Datenschutzerklärung</h1>

      <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
        <strong>Platzhalter.</strong> Diese Datenschutzerklärung ist nicht vollständig.
        Vor öffentlicher Bewerbung muss eine DSGVO-konforme Erklärung ergänzt werden
        (z. B. via eRecht24- oder Datenschutz-Generator). Erforderlich u. a. wegen
        Vercel-Hosting (US-Anbieter) und Affiliate-Cookies.
      </div>

      <section className="mt-8 space-y-6 text-slate-700">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Allgemeines</h2>
          <p className="mt-2 leading-relaxed">
            FindeDeinBett.de verarbeitet beim Besuch der Seite nur die technisch
            notwendigen Daten (Server-Logs, IP-Adresse — anonymisiert nach kurzer
            Speicherdauer). Es gibt keine eigenen Tracking-Cookies und kein
            Nutzerkonto.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">Hosting</h2>
          <p className="mt-2 leading-relaxed">
            Die Seite wird bei <strong>Vercel Inc.</strong> (San Francisco, USA)
            gehostet. Beim Aufruf der Seite werden technische Daten (IP, Browser,
            Zeitpunkt) an Vercel übermittelt. Standardvertragsklauseln sichern den
            DSGVO-konformen Transfer ab.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">Affiliate-Links</h2>
          <p className="mt-2 leading-relaxed">
            Klicks auf Shop-Buttons werden über Affiliate-Netzwerke (z. B. AWIN)
            an den jeweiligen Shop weitergeleitet. Diese setzen ggf. eigene
            Tracking-Cookies. Details bei den Datenschutzerklärungen der
            jeweiligen Anbieter (Otto, AWIN, weitere).
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">Deine Rechte</h2>
          <p className="mt-2 leading-relaxed">
            Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung sowie Widerspruch und
            Datenübertragbarkeit. Kontakt siehe Impressum.
          </p>
        </div>
      </section>
    </main>
  );
}

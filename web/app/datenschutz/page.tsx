import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Datenschutz – FindeDeinBett',
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-900">
        ← Zurück zur Startseite
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        Datenschutzerklärung
      </h1>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Vorlage.</strong> Diese Erklärung ist auf den tatsächlichen Tech-Stack
        der Seite abgestimmt (Vercel-Hosting, kein eigenes Tracking, AWIN-Affiliate).
        Mit <code className="font-mono">[…]</code> markierte Felder ausfüllen und vor
        öffentlicher Bewerbung ggf. anwaltlich prüfen lassen.
      </div>

      <section className="mt-10 space-y-10 text-slate-700">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">1. Verantwortlicher</h2>
          <p className="mt-3 leading-relaxed">
            Verantwortlich für die Datenverarbeitung im Sinne der DSGVO ist:
          </p>
          <p className="mt-3 leading-relaxed">
            [Vor- und Nachname]
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ und Ort]
            <br />
            E-Mail: [kontakt@findedeinbett.de]
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">2. Was wir bewusst nicht tun</h2>
          <p className="mt-3 leading-relaxed">
            FindeDeinBett.de verzichtet konsequent auf:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 leading-relaxed">
            <li>eigene Tracking- oder Analyse-Cookies</li>
            <li>Web-Analyse-Tools (Google Analytics, Matomo o. Ä.)</li>
            <li>Werbe-Pixel oder Retargeting</li>
            <li>Profilbildung über Nutzer</li>
            <li>Newsletter, Kontaktformulare, Nutzerkonten</li>
          </ul>
          <p className="mt-3 leading-relaxed">
            Es gibt deshalb keinen Cookie-Banner, weil die Seite selbst keine
            einwilligungspflichtigen Cookies setzt.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            3. Server-Logs (Art. 6 Abs. 1 lit. f DSGVO)
          </h2>
          <p className="mt-3 leading-relaxed">
            Beim Aufruf der Seite werden vom Hosting-Provider technisch notwendige
            Verbindungsdaten erfasst:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 leading-relaxed">
            <li>IP-Adresse (gekürzt nach kurzer Aufbewahrung)</li>
            <li>Datum und Uhrzeit des Abrufs</li>
            <li>aufgerufene URL und HTTP-Statuscode</li>
            <li>User-Agent (Browser, Betriebssystem)</li>
            <li>Referer (vorherige Seite, falls übermittelt)</li>
          </ul>
          <p className="mt-3 leading-relaxed">
            Diese Daten dienen ausschließlich der technischen Bereitstellung,
            Stabilität und Abwehr von Angriffen. Rechtsgrundlage ist unser
            berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO. Die Logs werden
            spätestens nach 30 Tagen gelöscht und nicht mit anderen Daten
            zusammengeführt.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">4. Hosting bei Vercel</h2>
          <p className="mt-3 leading-relaxed">
            Diese Website wird gehostet von der <strong>Vercel Inc.</strong>, 440 N
            Barranca Avenue #4133, Covina, CA 91723, USA. Bei jedem Seitenaufruf werden
            technische Verbindungsdaten an Vercel übermittelt. Vercel ist nach dem
            EU-US Data Privacy Framework (DPF) zertifiziert; ergänzend gelten
            Standardvertragsklauseln nach Art. 46 DSGVO. Details:{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-900"
            >
              vercel.com/legal/privacy-policy
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            5. Affiliate-Links (Art. 6 Abs. 1 lit. f DSGVO)
          </h2>
          <p className="mt-3 leading-relaxed">
            Klickst du einen „Zum Shop"-Button an, wirst du über das
            Affiliate-Netzwerk <strong>AWIN</strong> (Awin AG, Eichhornstraße 3, 10785
            Berlin) zum jeweiligen Shop weitergeleitet. AWIN setzt dabei Cookies, die
            der Zuordnung deines späteren Kaufs zu unserer Seite dienen
            (Provisionsabrechnung).
          </p>
          <p className="mt-3 leading-relaxed">
            Wichtig: Diese Cookies werden <strong>nicht von findedeinbett.de</strong>{' '}
            gesetzt, sondern erst nach deinem aktiven Klick auf der AWIN-Domain.
            Bis dahin findet auf unserer Seite keinerlei Tracking statt. Rechtsgrundlage
            für die Weiterleitung ist unser berechtigtes Interesse zur Refinanzierung
            des Angebots (Art. 6 Abs. 1 lit. f DSGVO). Details bei AWIN:{' '}
            <a
              href="https://www.awin.com/de/rechtliches/datenschutzerklarung"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-900"
            >
              awin.com/de/rechtliches/datenschutzerklarung
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">6. Domain-Registrar</h2>
          <p className="mt-3 leading-relaxed">
            Die Domain findedeinbett.de ist registriert bei der Hetzner Online GmbH,
            Industriestraße 25, 91710 Gunzenhausen. Datenschutzerklärung:{' '}
            <a
              href="https://www.hetzner.com/de/rechtliches/datenschutz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-900"
            >
              hetzner.com/de/rechtliches/datenschutz
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">7. Deine Rechte</h2>
          <p className="mt-3 leading-relaxed">Nach DSGVO hast du folgende Rechte:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6 leading-relaxed">
            <li>Auskunft über deine gespeicherten Daten (Art. 15)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16)</li>
            <li>Löschung („Recht auf Vergessenwerden", Art. 17)</li>
            <li>Einschränkung der Verarbeitung (Art. 18)</li>
            <li>Datenübertragbarkeit (Art. 20)</li>
            <li>Widerspruch gegen Verarbeitung (Art. 21)</li>
          </ul>
          <p className="mt-3 leading-relaxed">
            Anfragen formlos per E-Mail an [kontakt@findedeinbett.de].
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">8. Beschwerderecht</h2>
          <p className="mt-3 leading-relaxed">
            Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu
            beschweren — z. B. beim Landesbeauftragten für Datenschutz und
            Informationsfreiheit deines Bundeslandes oder beim Bundesbeauftragten für
            den Datenschutz und die Informationsfreiheit (BfDI).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            9. Änderungen dieser Erklärung
          </h2>
          <p className="mt-3 leading-relaxed">
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich
            technische oder rechtliche Rahmenbedingungen ändern. Stand: [TT.MM.JJJJ].
          </p>
        </div>
      </section>
    </main>
  );
}

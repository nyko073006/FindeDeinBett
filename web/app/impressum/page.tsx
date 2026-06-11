import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum – FindeDeinBett',
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-900">
        ← Zurück zur Startseite
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">Impressum</h1>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Vorlage.</strong> Die mit <code className="font-mono">[…]</code> markierten
        Felder musst du vor öffentlicher Bewerbung mit deinen echten Daten füllen.
        Diese Seite ist kein Rechtsrat — bei Unsicherheit z. B. von einem Anwalt
        oder über{' '}
        <a
          href="https://www.e-recht24.de/impressum-generator.html"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-amber-700"
        >
          eRecht24
        </a>{' '}
        gegenchecken lassen.
      </div>

      <section className="mt-10 space-y-8 text-slate-700">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Angaben gemäß § 5 TMG</h2>
          <p className="mt-3 leading-relaxed">
            [Vor- und Nachname]
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ und Ort]
            <br />
            Deutschland
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">Kontakt</h2>
          <p className="mt-3 leading-relaxed">E-Mail: [kontakt@findedeinbett.de]</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className="mt-3 leading-relaxed">[Vor- und Nachname], Anschrift wie oben</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">EU-Streitschlichtung</h2>
          <p className="mt-3 leading-relaxed">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung
            (OS) bereit:{' '}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-900"
            >
              ec.europa.eu/consumers/odr
            </a>
            . Unsere E-Mail-Adresse findest du oben im Impressum.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Verbraucherstreitbeilegung
          </h2>
          <p className="mt-3 leading-relaxed">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
            einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">Haftung für Inhalte</h2>
          <p className="mt-3 leading-relaxed">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf
            diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10
            TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte
            oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
            forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">Haftung für Links</h2>
          <p className="mt-3 leading-relaxed">
            Unser Angebot enthält Links zu externen Websites Dritter — insbesondere zu
            Online-Shops, teils über Affiliate-Netzwerke. Auf die Inhalte dieser
            externen Seiten haben wir keinen Einfluss. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Die
            verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
            Rechtsverstöße überprüft; rechtswidrige Inhalte waren nicht erkennbar.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">Urheberrecht</h2>
          <p className="mt-3 leading-relaxed">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Produktbilder und
            -beschreibungen der verlinkten Shops bleiben Eigentum der jeweiligen
            Shop-Betreiber und werden im Rahmen des Vergleichs zitiert.
          </p>
        </div>
      </section>
    </main>
  );
}

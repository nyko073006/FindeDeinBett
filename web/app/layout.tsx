import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FindYourBed – Boxspringbetten finden & vergleichen',
  description:
    'Finde das perfekte Boxspringbett: filtere nach Preis, Härtegrad, Matratzentyp, Topper und Kopfteil.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

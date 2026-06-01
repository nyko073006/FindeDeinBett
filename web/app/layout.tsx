import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Footer from './components/Footer';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FindeDeinBett – Boxspringbetten finden & vergleichen',
  description:
    'Finde das perfekte Boxspringbett: filtere nach Preis, Härtegrad, Matratzentyp, Topper und Kopfteil.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={jakarta.variable}>
      <body className="flex min-h-screen min-h-dvh flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

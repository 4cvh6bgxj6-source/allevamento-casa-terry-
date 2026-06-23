import type {Metadata} from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css'; // Global styles

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Allevamento Casa Terry | Cuccioli Certificati con Pedigree',
  description: 'Benvenuti all’Allevamento Casa Terry. Selezioniamo con amore e rigore scientifico cuccioli di Barboncino, Maltese e Golden Retriever. Sani, socializzati e con Pedigree ENCI.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="it" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="bg-brand-cream text-brand-dark font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}


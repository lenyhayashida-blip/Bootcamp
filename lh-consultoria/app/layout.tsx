import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.lhconsultoriaempresarial.com.br'
  ),
  title: {
    default: 'LH Consultoria — Diagnóstico em 7 Sinais',
    template: '%s | LH Consultoria',
  },
  description:
    'Sua empresa é familiar ou é uma família que tem um CNPJ? A diferença vale milhões. Descubra com o Diagnóstico em 7 Sinais.',
  openGraph: {
    title: 'LH Consultoria',
    description: 'Diagnóstico em 7 Sinais — descubra antes que custe milhões.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${playfair.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

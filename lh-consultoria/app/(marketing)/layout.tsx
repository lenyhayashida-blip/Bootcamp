import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/marketing/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Atalho de acessibilidade (WCAG AA) — visivel so ao navegar por teclado */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:text-charcoal"
      >
        Pular para o conteúdo
      </a>

      <Navbar />

      {/* pt-20 compensa a altura da navbar fixa */}
      <main id="conteudo" className="pt-20">
        {children}
      </main>

      <Footer />
    </>
  );
}

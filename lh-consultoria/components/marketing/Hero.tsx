import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
      {/* Linhas douradas verticais — referencia visual do Kintsugi */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[12%] hidden w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[12%] hidden w-px bg-gradient-to-b from-transparent via-gold/15 to-transparent lg:block"
      />

      <Container className="py-30">
        <div className="max-w-4xl">
          <p className="eyebrow">Consultoria de gestão para empresas em crescimento</p>

          <h1 className="mt-10 text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">
            Sua empresa é familiar,
            <br />
            ou é uma família que
            <br />
            tem um CNPJ?
          </h1>

          <div className="mt-10 max-w-[120px]">
            <div className="divider-kintsugi" />
          </div>

          <p className="mt-10 max-w-xl text-lg leading-relaxed text-offwhite/70">
            A diferença vale milhões. E ela aparece no processo muito antes de
            aparecer no balanço.
          </p>

          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center bg-gold px-9 py-4 text-sm uppercase tracking-wider2 text-charcoal transition-colors duration-300 ease-japandi hover:bg-gold-light"
            >
              Fazer o Diagnóstico em 7 Sinais
            </Link>
            <Link
              href="/consultoria"
              className="inline-flex items-center justify-center border border-gold/40 px-9 py-4 text-sm uppercase tracking-wider2 text-gold transition-colors duration-300 ease-japandi hover:border-gold hover:bg-gold/10"
            >
              Conhecer a consultoria
            </Link>
          </div>

          <p className="mt-8 text-xs uppercase tracking-wider2 text-offwhite/40">
            7 perguntas · 3 minutos · resultado na hora
          </p>
        </div>
      </Container>
    </section>
  );
}

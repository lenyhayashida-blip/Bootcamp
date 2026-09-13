import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export function NewsletterCTA() {
  return (
    <section className="section-padding border-t border-gold/15">
      <Container className="flex flex-col items-center text-center">
        <div className="divider-kintsugi max-w-[120px]" />

        <h2 className="mt-12 max-w-2xl text-3xl leading-tight sm:text-4xl">
          Descubra antes que custe milhões.
        </h2>

        <p className="mt-8 max-w-xl leading-relaxed text-offwhite/70">
          O Diagnóstico em 7 Sinais leva três minutos e devolve um retrato
          honesto do estágio de gestão da sua empresa — com o que atacar
          primeiro.
        </p>

        <Link
          href="/diagnostico"
          className="mt-12 inline-flex items-center justify-center bg-gold px-9 py-4 text-sm uppercase tracking-wider2 text-charcoal transition-colors duration-300 ease-japandi hover:bg-gold-light"
        >
          Fazer o diagnóstico agora
        </Link>

        <p className="mt-8 text-xs text-offwhite/40">
          Gratuito. Seus dados não são vendidos nem compartilhados.
        </p>
      </Container>
    </section>
  );
}

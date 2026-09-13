import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/shared/Logo';

/**
 * FASE 1 — prévia do design system.
 * As seções completas da landing page (Hero, ServicesGrid, Storytelling,
 * ProductsShowcase, NewsletterCTA, Footer) entram na FASE 3, conforme
 * a ordem de execução do CLAUDE.md.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Container className="flex flex-col items-center gap-10 py-38 text-center">
        <Logo size={56} />

        <div className="divider-kintsugi max-w-[120px]" />

        <p className="eyebrow">LH Consultoria</p>

        <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
          Sua empresa é familiar,
          <br /> ou é uma família que tem um CNPJ?
        </h1>

        <p className="prose-editorial text-lg">
          A diferença vale milhões. Descubra antes que custe.
        </p>

        <Button variant="primary">Fazer o Diagnóstico em 7 Sinais</Button>

        <div className="divider-kintsugi max-w-[120px]" />

        <p className="text-xs uppercase tracking-wider2 text-offwhite/40">
          Fase 1 — Estrutura e Design System · Próxima fase: Landing Page completa
        </p>
      </Container>
    </main>
  );
}

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

/**
 * FASE 2 — home dentro do grupo (marketing), ja com Navbar e Footer.
 * As secoes completas da landing (Hero, ServicesGrid, StorytellingSection,
 * ProductsShowcase, NewsletterCTA) entram na FASE 3.
 */
export default function Home() {
  return (
    <Container className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-10 py-30 text-center">
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
        Fase 2 — Layout raiz · Próxima fase: Landing Page completa
      </p>
    </Container>
  );
}

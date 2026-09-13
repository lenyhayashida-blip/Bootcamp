import { Hero } from '@/components/marketing/Hero';
import { StorytellingSection } from '@/components/marketing/StorytellingSection';
import { ServicesGrid } from '@/components/marketing/ServicesGrid';
import { ProductsShowcase } from '@/components/marketing/ProductsShowcase';
import { NewsletterCTA } from '@/components/marketing/NewsletterCTA';
import { Container } from '@/components/ui/Container';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Faixa de qualificacao do publico — direta, sem rodeio */}
      <section className="border-y border-gold/15 bg-charcoal-light">
        <Container className="py-18">
          <p className="mx-auto max-w-3xl text-center font-serif text-xl leading-relaxed sm:text-2xl">
            Para CEOs de empresas que faturam entre R$ 500 mil e R$ 5 milhões
            por mês — e que cresceram mais rápido do que os próprios processos.
          </p>
        </Container>
      </section>

      <StorytellingSection />
      <ServicesGrid />
      <ProductsShowcase />
      <NewsletterCTA />
    </>
  );
}

import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const servicos = [
  {
    numero: '01',
    titulo: 'Diagnóstico em 7 Sinais',
    descricao:
      'Sete perguntas que revelam se a sua empresa tem processo ou tem apenas rotina. Gratuito, com resultado e análise imediatos.',
    href: '/diagnostico',
    cta: 'Começar o diagnóstico',
  },
  {
    numero: '02',
    titulo: 'Consultoria de Gestão',
    descricao:
      'Trabalho direto com o CEO para transformar operação improvisada em sistema: papéis definidos, indicadores reais e decisão baseada em número.',
    href: '/consultoria',
    cta: 'Ver como funciona',
  },
  {
    numero: '03',
    titulo: 'Formação e Materiais',
    descricao:
      'Cursos, guias e mentorias para quem quer estruturar a própria empresa sem depender de consultor permanente.',
    href: '/produtos',
    cta: 'Ver materiais',
  },
];

export function ServicesGrid() {
  return (
    <section className="section-padding border-t border-gold/15">
      <Container>
        <p className="eyebrow">Como eu trabalho</p>
        <h2 className="mt-8 max-w-2xl text-3xl leading-tight sm:text-4xl">
          Três formas de entrar, uma única direção: previsibilidade.
        </h2>

        <div className="mt-18 grid gap-px bg-gold/15 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((servico) => (
            <article
              key={servico.numero}
              className="flex flex-col bg-charcoal p-10 transition-colors duration-500 ease-japandi hover:bg-charcoal-light"
            >
              <p className="font-serif text-sm text-gold">{servico.numero}</p>
              <h3 className="mt-6 text-2xl leading-snug">{servico.titulo}</h3>
              <p className="mt-5 flex-1 leading-relaxed text-offwhite/60">
                {servico.descricao}
              </p>
              <Link
                href={servico.href}
                className="mt-8 inline-flex w-fit text-xs uppercase tracking-wider2 text-gold transition-colors hover:text-gold-light"
              >
                {servico.cta} →
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

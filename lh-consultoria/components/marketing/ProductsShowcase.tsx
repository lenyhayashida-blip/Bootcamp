import Link from 'next/link';
import { Container } from '@/components/ui/Container';

/**
 * FASE 3 — vitrine com conteudo estatico de exemplo.
 * Na FASE 5 esta lista passa a vir da tabela `products` do Supabase,
 * e cada card recebe o link de checkout da Hotmart.
 */
const produtos = [
  {
    categoria: 'Curso',
    titulo: 'Da Rotina ao Processo',
    descricao:
      'O método para transformar o que só existe na cabeça das pessoas em processo que sobrevive a férias, demissão e crescimento.',
  },
  {
    categoria: 'E-book',
    titulo: 'Os 7 Sinais, explicados',
    descricao:
      'O material completo por trás do diagnóstico: o que cada sinal indica, por que ele aparece e o que fazer nos primeiros 30 dias.',
  },
  {
    categoria: 'Mentoria',
    titulo: 'Sala do CEO',
    descricao:
      'Encontros em grupo reduzido para CEOs que precisam decidir com método, não com intuição.',
  },
];

export function ProductsShowcase() {
  return (
    <section className="section-padding border-t border-gold/15">
      <Container>
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Materiais</p>
            <h2 className="mt-8 max-w-xl text-3xl leading-tight sm:text-4xl">
              Para quem prefere construir por dentro.
            </h2>
          </div>
          <Link
            href="/produtos"
            className="w-fit text-xs uppercase tracking-wider2 text-gold transition-colors hover:text-gold-light"
          >
            Ver tudo →
          </Link>
        </div>

        <div className="mt-18 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((produto) => (
            <article
              key={produto.titulo}
              className="flex flex-col border-t border-gold/25 pt-8"
            >
              <p className="eyebrow">{produto.categoria}</p>
              <h3 className="mt-5 text-2xl leading-snug">{produto.titulo}</h3>
              <p className="mt-4 leading-relaxed text-offwhite/60">
                {produto.descricao}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

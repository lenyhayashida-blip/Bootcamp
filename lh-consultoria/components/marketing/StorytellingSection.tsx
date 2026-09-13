import { Container } from '@/components/ui/Container';

const marcos = [
  {
    ano: '1995',
    texto:
      'A empresa da família quebra. Aprendi, do lado de dentro, que negócios não morrem de falta de esforço — morrem de falta de processo.',
  },
  {
    ano: '2003',
    texto:
      'Quatro anos no Japão, na Sony. Foi ali que entendi o que é padrão, disciplina e melhoria contínua na prática, não no slide.',
  },
  {
    ano: '2012',
    texto:
      'De volta ao Brasil, estruturei uma operação de perfumaria até R$ 1,5 milhão. Primeira vez aplicando método japonês a caos brasileiro.',
  },
  {
    ano: 'Hoje',
    texto:
      'Dirijo, como CEO, uma importadora e distribuidora de médio porte — e curso Mestrado em Transformação de Negócios com IA. Continuo operando, não só ensinando.',
  },
];

export function StorytellingSection() {
  return (
    <section className="section-padding">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow">Quem conduz</p>
            <h2 className="mt-8 text-3xl leading-tight sm:text-4xl">
              Trinta anos aprendendo
              <br /> onde as empresas quebram.
            </h2>
            <p className="mt-8 max-w-md leading-relaxed text-offwhite/70">
              Não vim da consultoria para a empresa. Vim da empresa — da
              operação, do estoque, da folha, da crise — para a consultoria.
              Tudo que eu falo, eu já paguei para aprender.
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-offwhite/50">
              É por isso que meu trabalho não começa com um diagnóstico
              genérico, e sim com as sete perguntas que separam uma empresa
              profissional de uma empresa que só parece profissional.
            </p>
          </div>

          {/* Linha do tempo com fio dourado — conceito Kintsugi */}
          <ol className="relative flex flex-col gap-12 border-l border-gold/25 pl-8 sm:pl-12">
            {marcos.map((marco) => (
              <li key={marco.ano} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(2rem+3px)] top-2 block h-1.5 w-1.5 rounded-full bg-gold sm:-left-[calc(3rem+3px)]"
                />
                <p className="font-serif text-2xl text-gold">{marco.ano}</p>
                <p className="mt-3 max-w-md leading-relaxed text-offwhite/70">
                  {marco.texto}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

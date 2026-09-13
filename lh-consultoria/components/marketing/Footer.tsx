import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { Container } from '@/components/ui/Container';

const navegacao = [
  { href: '/sobre', label: 'Sobre' },
  { href: '/consultoria', label: 'Consultoria' },
  { href: '/produtos', label: 'Produtos' },
  { href: '/blog', label: 'Blog' },
  { href: '/contato', label: 'Contato' },
];

const acesso = [
  { href: '/diagnostico', label: 'Diagnóstico 7 Sinais' },
  { href: '/membros', label: 'Área de membros' },
  { href: '/login', label: 'Entrar' },
  { href: '/cadastro', label: 'Criar conta' },
];

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/20">
      <Container className="py-18">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <Logo size={40} />
            <p className="text-sm leading-relaxed text-offwhite/60">
              Disciplina japonesa aplicada a processos brasileiros. Gestão para
              empresas que cresceram mais rápido que os próprios processos.
            </p>
          </div>

          <nav aria-labelledby="rodape-navegacao" className="flex flex-col gap-4">
            <h2 id="rodape-navegacao" className="eyebrow font-sans">
              Navegação
            </h2>
            <ul className="flex flex-col gap-3">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-offwhite/60 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="rodape-acesso" className="flex flex-col gap-4">
            <h2 id="rodape-acesso" className="eyebrow font-sans">
              Acesso
            </h2>
            <ul className="flex flex-col gap-3">
              {acesso.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-offwhite/60 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h2 className="eyebrow font-sans">Contato</h2>
            <a
              href="mailto:contato@lhconsultoriaempresarial.com.br"
              className="text-sm text-offwhite/60 transition-colors hover:text-gold"
            >
              contato@lhconsultoriaempresarial.com.br
            </a>
            <p className="text-sm leading-relaxed text-offwhite/40">
              Seus dados não são vendidos nem compartilhados com terceiros, em
              conformidade com a LGPD.
            </p>
          </div>
        </div>

        <div className="divider-kintsugi my-12" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-offwhite/40">
            © {ano} LH Consultoria. Todos os direitos reservados.
          </p>
          <ul className="flex gap-8">
            <li>
              <Link
                href="/privacidade"
                className="text-xs text-offwhite/40 transition-colors hover:text-gold"
              >
                Privacidade
              </Link>
            </li>
            <li>
              <Link
                href="/termos"
                className="text-xs text-offwhite/40 transition-colors hover:text-gold"
              >
                Termos
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

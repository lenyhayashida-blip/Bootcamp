'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils/cn';

const links = [
  { href: '/sobre', label: 'Sobre' },
  { href: '/consultoria', label: 'Consultoria' },
  { href: '/produtos', label: 'Produtos' },
  { href: '/blog', label: 'Blog' },
  { href: '/contato', label: 'Contato' },
];

export function Navbar() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  // Fundo do menu aparece so depois do primeiro scroll (conceito Ma:
  // no topo a pagina respira, sem barra competindo com o titulo).
  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Esc fecha o menu mobile e o scroll da pagina trava enquanto ele esta aberto.
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false);
    };
    document.addEventListener('keydown', aoTeclar);
    document.body.style.overflow = aberto ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      document.body.style.overflow = '';
    };
  }, [aberto]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-japandi',
        rolou || aberto
          ? 'border-b border-gold/20 bg-charcoal/95 backdrop-blur'
          : 'border-b border-transparent'
      )}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-16"
      >
        <Link
          href="/"
          aria-label="LH Consultoria — página inicial"
          onClick={() => setAberto(false)}
        >
          <Logo size={36} />
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs uppercase tracking-wider2 text-offwhite/70 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/diagnostico"
              className="border border-gold px-6 py-2.5 text-xs uppercase tracking-wider2 text-gold transition-colors duration-300 hover:bg-gold/10"
            >
              Diagnóstico
            </Link>
          </li>
        </ul>

        {/* Botão mobile */}
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6" aria-hidden="true">
            <span
              className={cn(
                'absolute left-0 block h-px w-6 bg-gold transition-transform duration-300 ease-japandi',
                aberto ? 'top-1.5 rotate-45' : 'top-0'
              )}
            />
            <span
              className={cn(
                'absolute left-0 block h-px w-6 bg-gold transition-transform duration-300 ease-japandi',
                aberto ? 'top-1.5 -rotate-45' : 'top-3'
              )}
            />
          </span>
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!aberto}
        className="border-t border-gold/20 bg-charcoal md:hidden"
      >
        <ul className="flex flex-col px-6 py-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setAberto(false)}
                className="block py-4 text-sm uppercase tracking-wider2 text-offwhite/80 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Link
              href="/diagnostico"
              onClick={() => setAberto(false)}
              className="block border border-gold px-6 py-3 text-center text-sm uppercase tracking-wider2 text-gold"
            >
              Diagnóstico
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

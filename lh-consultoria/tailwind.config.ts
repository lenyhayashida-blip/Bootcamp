import type { Config } from 'tailwindcss';

// Design system LH Consultoria — estetica Japandi
// (Ma: espaco vazio intencional / Shibui: beleza sutil / Kintsugi: linhas douradas)
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1A1A1A',
          light: '#262626',
          dark: '#0F0F0F',
        },
        gold: {
          DEFAULT: '#C9A96E',
          light: '#DFC496',
          dark: '#A8874F',
        },
        offwhite: {
          DEFAULT: '#F5F2ED',
          dark: '#E8E3D9',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wider2: '0.15em',
        wider3: '0.25em',
      },
      spacing: {
        // Escala generosa para o conceito "Ma" (respiracao visual)
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        38: '9.5rem',
      },
      borderColor: {
        kintsugi: '#C9A96E',
      },
      backgroundImage: {
        'kintsugi-line':
          'linear-gradient(90deg, transparent, #C9A96E, transparent)',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        japandi: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;

module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family-body)'],
        display: ['var(--font-family-display)'],
        mono: ['var(--font-family-mono)'],
      },
      fontSize: {
        micro: ['var(--font-size-micro)', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        caption: ['var(--font-size-caption)', { lineHeight: '1.5' }],
        small: ['var(--font-size-small)', { lineHeight: '1.5' }],
        body: ['var(--font-size-body)', { lineHeight: '1.6' }],
        'body-lg': ['var(--font-size-body-lg)', { lineHeight: '1.7' }],
        title: ['var(--font-size-title)', { lineHeight: '1.2' }],
        stat: ['var(--font-size-stat)', { lineHeight: '1.1' }],
        heading: ['var(--font-size-heading)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        display: ['var(--font-size-display)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'display-lg': ['var(--font-size-display-lg)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
      },
      colors: {
        paper: 'rgb(var(--color-paper-rgb) / <alpha-value>)',
        ink: 'rgb(var(--color-ink-rgb) / <alpha-value>)',
        canvas: 'rgb(var(--color-canvas-rgb) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
        'surface-raised': 'rgb(var(--color-surface-raised-rgb) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--color-accent-bg-rgb) / <alpha-value>)',
          foreground: 'rgb(var(--color-accent-fg-rgb) / <alpha-value>)',
        },
        line: 'var(--color-line)',
        foreground: 'rgb(var(--color-foreground-rgb) / <alpha-value>)',
        muted: 'rgb(var(--color-muted-rgb) / <alpha-value>)',
        'muted-strong': 'rgb(var(--color-muted-strong-rgb) / <alpha-value>)',
        cosmos: 'rgb(var(--color-cosmos-rgb) / <alpha-value>)',
      },
      spacing: {
        'page-x': 'var(--space-page-x)',
        'section-y': 'var(--space-section-y)',
        'section-head': 'var(--space-section-head)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        line: 'var(--radius-panel)',
        panel: 'var(--radius-panel)',
        tile: 'var(--radius-control)',
        frame: 'var(--radius-frame)',
      },
      zIndex: {
        header: 'var(--z-header)',
        menu: 'var(--z-menu)',
        modal: 'var(--z-modal)',
        overlay: 'var(--z-overlay)',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
      boxShadow: {
        hover: 'var(--shadow-hover)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
        expressive: 'var(--ease-expressive)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s var(--ease-expressive) both',
        'fade-in-up': 'fade-in-up 0.7s var(--ease-expressive) both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};
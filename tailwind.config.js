/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        border: 'hsl(var(--border))',
        outline: 'hsl(var(--outline))',
        text: 'hsl(var(--text))',
        input: 'hsl(var(--input))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          accent: 'hsl(var(--primary-accent))',
        },
        muted: 'hsl(var(--muted))',
        success: {
          DEFAULT: 'hsl(var(--success))',
          accent: 'hsl(var(--success-accent))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          accent: 'hsl(var(--danger-accent))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          accent: 'hsl(var(--warning-accent))',
        }
      }
    },
  },
  plugins: [],
};

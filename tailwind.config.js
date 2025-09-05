/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220 80% 52%)',
        accent: 'hsl(20 90% 55%)',
        bg: 'hsl(210 20% 98%)',
        surface: 'hsl(0 0% 100%)',
        textPrimary: 'hsl(220 10% 15%)',
        textSecondary: 'hsl(220 5% 45%)',
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      spacing: {
        xl: '24px',
        lg: '16px',
        md: '12px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(220, 10%, 10%, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}

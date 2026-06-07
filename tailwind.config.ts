import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['var(--font-heebo)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        bg: '#020617',
        surface: '#0F172A',
        'surface-2': '#1E293B',
        'accent-green': '#22C55E',
        'accent-red': '#EF4444',
        'aurora-1': '#6366F1',
        'aurora-2': '#8B5CF6',
        'aurora-3': '#06B6D4',
        'text-primary': '#F8FAFC',
        'text-muted': '#94A3B8',
      },
    },
  },
  plugins: [],
}
export default config

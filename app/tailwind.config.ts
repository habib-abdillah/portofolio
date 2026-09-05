import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#111111',
        secondary: '#6B7280',
        accent: '#2563EB',
        muted: '#F3F4F6',
        card: '#FFFFFF',
        popover: '#FFFFFF',
        destructive: 'hsl(0 84.6% 60.2%)',
      },
    },
  },
  plugins: [typography],
}

export default config
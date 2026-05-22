/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#080b11",
          card: "rgba(16, 22, 35, 0.65)",
          border: "rgba(99, 102, 241, 0.15)",
          glow: "rgba(99, 102, 241, 0.35)",
          text: "#f8fafc",
          primary: "#6366f1", // Indigo
          secondary: "#a855f7", // Purple
          accent: "#06b6d4", // Cyan
          success: "#10b981", // Emerald
          warning: "#f59e0b", // Amber
          danger: "#ef4444" // Red
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.4)',
        'neon-purple': '0 0 15px rgba(168, 85, 247, 0.4)',
        'neon-indigo': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'dash': 'dash 20s linear infinite'
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 5px rgba(99, 102, 241, 0.2), inset 0 0 5px rgba(99, 102, 241, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.6), inset 0 0 10px rgba(99, 102, 241, 0.3)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    },
  },
  plugins: [],
}

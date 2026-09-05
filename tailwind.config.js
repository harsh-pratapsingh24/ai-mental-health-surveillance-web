/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F6E56',
          hover: '#0C5946',
          light: '#E6F4F0',
          dark: '#0A4B3A',
        },
        lavender: {
          DEFAULT: '#7F77DD',
          hover: '#6E66CD',
          light: '#F2F1FD',
          surface: '#EAE8FC',
        },
        warm: {
          bg: '#FAF9F6',
          card: '#FFFFFF',
          border: '#EAE8E3',
        },
        charcoal: {
          bg: '#1C1C1A',
          surface: '#262624',
          border: '#3A3A36',
          text: '#2C2C2A',
          muted: '#5F5E5A',
        },
        risk: {
          low: '#639922',
          'low-bg': '#F1F7E8',
          'low-border': '#D5EAB9',
          medium: '#BA7517',
          'medium-bg': '#FEF6E9',
          'medium-border': '#F8DEB3',
          high: '#A32D2D',
          'high-bg': '#FDF0F0',
          'high-border': '#F5C6C6',
        },
        status: {
          success: '#3B6D11',
          error: '#791F1F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'soft': '14px',
        'soft-lg': '18px',
        'soft-xl': '24px',
      },
      animation: {
        'breathe-in': 'breatheIn 4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'breathe-hold': 'breatheHold 7s linear forwards',
        'breathe-out': 'breatheOut 8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-in': 'toastIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateX(30px) translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0) translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}

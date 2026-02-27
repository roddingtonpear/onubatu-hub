/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        onubatu: {
          red: '#E8453C',
          orange: '#F5943B',
          yellow: '#F7D34A',
          green: '#4DB861',
          teal: '#45B5AA',
          blue: '#3B82C4',
          indigo: '#5B5EA6',
          purple: '#8B5EA6',
          pink: '#D64A8C',
          cream: '#FDF8F0',
          dark: '#1A1A2E',
        }
      },
      fontFamily: {
        display: ['"Fredoka"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

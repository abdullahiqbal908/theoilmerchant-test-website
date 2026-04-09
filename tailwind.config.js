/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './context/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean:    '#2A6496',
        sky:      '#5B9EC9',
        steel:    '#7AAFC4',
        ice:      '#D4EAF5',
        mist:     '#EEF5FA',
        ecru:     '#F7F4EF',
        sage:     '#7D9B77',
        midnight: '#1C2B3A',
        slate:    '#6A7F8E',
      },
      fontFamily: {
        display: ['"Libre Baskerville"', 'Georgia', 'serif'],
        body:    ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
        wide:     '0.08em',
        widest:   '0.12em',
      },
    },
  },
  plugins: [],
}

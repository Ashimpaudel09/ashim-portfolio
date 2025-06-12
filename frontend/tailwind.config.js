import "tailwindcss"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
      xs: '300px',  // custom breakpoint at 480px
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

      colors: {
        primary: '#0ea5e9', // blue-500
        secondary: '#2563eb', // blue-600
        neuronGlow: '#4ade80', // green-400 for glow effect
      },
      boxShadow: {
        neuron: '0 0 10px 2px rgba(74, 222, 128, 0.6)',
      },
      animation: {
        neuronMove: 'neuronMove 4s ease-in-out infinite',
      },
      keyframes: {
        neuronMove: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(5px, 5px)' },
        },
      },
    },
  },
  plugins: [],
};
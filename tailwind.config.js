// tailwind.config.js
module.exports = {
  content: ['./src//*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'music-waves': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'music-waves': 'music-waves 5s infinite linear',
      },
      colors: {
        navy: {
          500: '#000000', // Navy blue color
        },
      },
      
      boxShadow: {
        subtleGradient:
          '0 2px 6px 2px rgba(56, 189, 248, 0.2), 0 0 10px rgba(30, 58, 138, 0.3)', // Softer and subtler glow
      },
    },
  },
  plugins: [],
};
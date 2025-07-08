/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'steam-rise': 'steamRise 3s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.05)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        steamRise: {
          '0%': { transform: 'translateY(0px) scaleY(1)', opacity: '0.4' },
          '50%': { transform: 'translateY(-20px) scaleY(1.5)', opacity: '0.6' },
          '100%': { transform: 'translateY(-40px) scaleY(0.5)', opacity: '0' }
        }
      },
      fontFamily: {
        'arabic': ['Cairo', 'sans-serif'],
        'english': ['Montserrat', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))'
      }
    },
  },
  plugins: [],
};

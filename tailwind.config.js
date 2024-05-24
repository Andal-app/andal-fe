/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'serif']
    },
    fontSize: {
      'h-xl': ['3rem', '4.5rem'], // 48px
      'h-lg': ['2rem', '3rem'], // 32px
      'h-md': ['1.5rem', '2.25rem'], // 24px
      'h-sm': ['1.25rem', '1.875rem'], // 20px
      'b-xl': ['1.125rem', '2rem'], // 18px
      'b-lg': ['1rem', '1.75rem'], // 16px
      'b-md': ['0.875rem', '1.5rem'], // 14px
      'b-sm': ['0.75rem', '1.3rem'], // 12px
      'b-xsm': ['0.625rem', '1rem'], // 10px
      'b-xxsm': ['0.5rem', '0.8rem'], // 8px, 12px,
      '8xl': ['6rem', '1 rem']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFF',
      black: '#000',
      neutral: {
        50: '#fafafa',
        100: '#E8EBEB',
        200: '#D2D6D7',
        300: '#BBC2C3',
        400: '#A5ADAF',
        500: '#8E999B',
        600: '#727A7C',
        700: '#555C5D',
        800: '#393D3E',
        900: '#1C1F1F'
      },
      violet: {
        50: '#F5F3FF',
        100: '#EDE9FE',
        200: '#DDD6FE',
        300: '#C4B5FD',
        400: '#A78BFA',
        500: '#8B5CF6',
        600: '#7C3AED',
        700: '#6D28D9',
        800: '#5B21B6',
        900: '#4C1D95'
      },
      yellow: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#FFD739',
        500: '#FCC826',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12'
      },
      yellow: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#FFD739',
        500: '#FCC826',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12'
      },
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D'
      },
      emerald: {
        600: '#059669'
      }
    },
    extend: {
      backgroundImage: {
        map: "url('/src/assets/images/map_bg.svg')"
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar')({
      nocompatible: true
    })
  ]
};

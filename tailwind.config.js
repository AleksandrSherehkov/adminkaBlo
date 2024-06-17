import { nextui } from '@nextui-org/react';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #FFF 45%, #E6E3DA 100%)',
      },
      boxShadow: {
        '3xl': '0px 0px 4px rgba(0, 0, 0, 0.40);',
      },
      colors: {
        'blood-red': '#8D0707',
        'light-gray': '#1D1E21',
        'light-green': '#16A34A',
        'light-white': '#f9f9f9',
        granite: '#F8F2EC',
        'chart-green': '#1BBC9B',
        'chart-yellow': '#F5AB35',
        'chart-blue': '#1F3A93',
        'chart-bg': 'rgba(255, 255, 255, 0.7)',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};

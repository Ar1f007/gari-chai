import { nextui } from '@nextui-org/theme';
import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1664px',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              '50': '#034934',
              '100': '#04553c',
              '200': '#046145',
              '300': '#056d4d',
              '400': '#057956',
              '500': '#1e8667',
              '600': '#379478',
              '700': '#50a189',
              '800': '#69af9a',
              '900': '#82bcab',
              DEFAULT: '#057956',
              foreground: '#3e444d',
            },
            focus: '#057956',
          },
        },
      },
    }),
  ],
};

export default config;

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
      translate: {
        full: '100%',
      },
      transitionProperty: {
        height: 'height',
      },
      minWidth: {
        '0': '0',
        '24': '6rem',
        '32': '8rem',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
      },
    },
    container: {
      center: true,
      // padding: {
      //   DEFAULT: '1rem',
      //   sm: '2rem',
      //   lg: '4rem',
      //   xl: '5rem',
      //   '2xl': '6rem',
      // },
    },
  },
  variants: {
    rotate: ['responsive', 'hover', 'group-hover'],
    scale: ['responsive', 'hover', 'group-hover'],
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
              '600': '#78b6a4',
              '700': '#ADDDC0',
              '800': '#d2e7e1',
              '900': '#e9f3f0',
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

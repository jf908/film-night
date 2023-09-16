import {
  defineConfig,
  presetUno,
  presetTypography,
  presetIcons,
  transformerVariantGroup,
  presetWebFonts,
  transformerDirectives,
} from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';
import { presetForms } from '@julr/unocss-preset-forms';
import presetTheme from 'unocss-preset-theme';
import type { Theme } from 'unocss/preset-uno';

export default defineConfig({
  theme: {
    colors: {
      accent: '#254fd5',
      base: '#ffffff',
      'base-muted': '#f3f4f6',
      'base-subtle': '#f9fafb',
      fg: 'black',
      'fg-muted': 'rgb(55 65 81)',
      border: 'rgb(229 231 235)',
      'border-muted': 'rgb(243 244 246)',
      link: 'rgb(37, 99, 235)',
      'link-hover': 'rgb(96, 165, 250)',
    },
  },
  shortcuts: {
    // Components
    card: 'border border-gray-100 dark:border-gray-800 dark:bg-base-muted rounded-md bg-base p-4 shadow-sm',
    link: 'text-link hover:text-link-hover',
    tooltip: 'bg-black text-white px-2 py-1 rounded-lg text-sm',
    // Forms
    'form-control': 'flex flex-col',
    label: 'flex py-3 px-2 items-center',
    'label-text': 'text-sm leading-5',
    // Input
    input: 'w-full dark:bg-base-subtle rounded-md border-border shadow-sm sm:text-sm',
    // Btn
    btn: 'inline-flex gap-2 rounded cursor-pointer shrink-0 flex-wrap select-none items-center justify-center text-center min-h-2.5rem h-2.5rem px-5 text-sm hover:bg-base-subtle font-500',
    'btn-primary': 'bg-blue-600 text-white hover:bg-blue-500',
    'btn-success': 'bg-green-600 text-white hover:bg-green-500',
    'btn-danger': 'bg-red-600 text-white hover:bg-red-500',
  },
  extractors: [extractorSvelte()],
  presets: [
    presetUno({
      // dark: 'media',
    }),
    presetTheme<Theme>({
      theme: {
        dark: {
          colors: {
            base: 'rgb(3,7,18)',
            'base-muted': '#111827',
            'base-subtle': '#1f2937',
            fg: 'white',
            'fg-muted': 'rgb(209 213 219)',
            border: 'rgb(55 65 81)',
            'border-muted': 'rgb(31 41 55)',
            link: 'rgb(59, 130, 246)',
            'link-hover': 'rgb(37, 99, 235)',
          },
        },
      },
    }),
    presetForms(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: {
          name: 'Inter',
          weights: ['400', '500', '700'],
          italic: true,
        },
      },
    }),
    presetTypography(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
});

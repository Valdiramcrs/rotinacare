import type { Config } from 'tailwindcss';
import baseConfig from '@rotinacare/tailwind-config';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [baseConfig],
} satisfies Config;

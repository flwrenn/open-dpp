import type { Linter } from 'eslint';
import baseConfig from './base.js';

const config: Linter.Config[] = [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx,jsx}'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
];

export default config;

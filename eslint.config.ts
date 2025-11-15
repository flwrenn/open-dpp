import type { Linter } from 'eslint';
import baseConfig from '@open-dpp/eslint-config/base';

const config: Linter.Config[] = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/out/**',
    ],
  },
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      // Root-level overrides if needed
    },
  },
];

export default config;

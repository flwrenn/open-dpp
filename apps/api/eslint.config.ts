import nestjsConfig from '@open-dpp/eslint-config/nestjs';
import type { Linter } from 'eslint';

const config: Linter.Config[] = [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },
  ...nestjsConfig,
];

export default config;

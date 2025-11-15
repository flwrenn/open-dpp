import type { Config } from 'lint-staged';

const config: Config = {
  // TypeScript/JavaScript files - lint and format
  '*.{ts,tsx,js,jsx}': (filenames) => {
    const eslintFiles = filenames.join(' ');
    return [
      `eslint --fix --max-warnings=0 ${eslintFiles}`,
      `prettier --write ${eslintFiles}`,
    ];
  },
  // Other files - format only
  '*.{json,md,yml,yaml}': (filenames) => {
    return `prettier --write ${filenames.join(' ')}`;
  },
};

export default config;

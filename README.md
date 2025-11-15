# Open DPP (Digital Product Passport)

Open-source Digital Product Passport (DPP) implementation for product lifecycle transparency and sustainability tracking.

## Project Structure

This is a monorepo managed with pnpm workspaces and Turbo for efficient build orchestration.

```
open-dpp/
├── apps/
│   ├── api/          # NestJS backend API
│   └── web/          # Next.js frontend application
├── packages/
│   ├── tsconfig/     # Shared TypeScript configurations
│   └── eslint-config/ # Shared ESLint configurations
└── docs/             # Project documentation
```

## Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Setup git hooks
pnpm prepare
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run specific app
pnpm --filter api dev
pnpm --filter web dev
```

### Building

```bash
# Build all apps
pnpm build

# Build specific app
pnpm --filter api build
pnpm --filter web build
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov
```

### Linting & Formatting

```bash
# Lint all packages
pnpm lint

# Format all files
pnpm format

# Check formatting without making changes
pnpm format:check
```

## Tooling

### Monorepo Management

- **pnpm workspaces**: Efficient package management with workspace support
- **Turbo**: Build orchestration for fast, incremental builds with caching

### Code Quality

- **TypeScript**: Strongly typed JavaScript with shared configurations
- **ESLint**: Linting with shared configurations for consistency
- **Prettier**: Code formatting with consistent style rules
- **Husky**: Git hooks for pre-commit and commit-msg validation
- **lint-staged**: Run linters on staged files only
- **Commitlint**: Enforce conventional commit message format

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Commit messages must follow this format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

Example:

```
feat(api): add product registration endpoint

Implement POST /products endpoint with validation
and database persistence for DPP product registration.

Closes #123
```

## Shared Configurations

### TypeScript

Shared TypeScript configurations are available in `packages/tsconfig/`:

- `base.json` - Base configuration for all TypeScript projects
- `nextjs.json` - Next.js specific configuration
- `nestjs.json` - NestJS specific configuration

### ESLint

Shared ESLint configurations are available in `packages/eslint-config/`:

- `base.ts` - Base ESLint rules (TypeScript, ES modules)
- `nextjs.ts` - Next.js specific rules (TypeScript, ES modules)
- `nestjs.ts` - NestJS specific rules (TypeScript, ES modules)

All configuration files use TypeScript and ES modules for better type safety and modern JavaScript standards.

## Scripts Reference

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Start all apps in development mode         |
| `pnpm build`        | Build all apps for production              |
| `pnpm start`        | Start all apps in production mode          |
| `pnpm lint`         | Lint all packages                          |
| `pnpm format`       | Format all files with Prettier             |
| `pnpm format:check` | Check formatting without changes           |
| `pnpm test`         | Run all tests                              |
| `pnpm test:watch`   | Run tests in watch mode                    |
| `pnpm test:cov`     | Run tests with coverage                    |
| `pnpm clean`        | Clean all build artifacts and node_modules |

## Contributing

1. Create a new branch from `main`
2. Make your changes following the code style and commit conventions
3. Ensure all tests pass: `pnpm test`
4. Ensure linting passes: `pnpm lint`
5. Submit a pull request

**Note:** The `main` and `develop` branches are protected. All changes must go through pull requests with:

- ✅ CI checks passing
- ✅ Code review approval
- ✅ All conversations resolved

See [docs/BRANCH-PROTECTION.md](./docs/BRANCH-PROTECTION.md) for details.

## License

UNLICENSED - Private project

## CI/CD Status

CI/CD pipelines are configured

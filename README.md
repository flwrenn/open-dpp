# Open DPP (Digital Product Passport)

Open-source Digital Product Passport (DPP) implementation for product lifecycle transparency and sustainability tracking.

## Project Structure

This is a monorepo managed with pnpm workspaces and Turbo for efficient build orchestration.

```
open-dpp/
├── apps/
│   ├── api/          # NestJS backend API
│   ├── web/          # Next.js frontend application
│   └── contracts/    # Solidity smart contracts (Hardhat project)
├── packages/
│   ├── tsconfig/     # Shared TypeScript configurations
│   └── eslint-config/ # Shared ESLint configurations
└── docs/             # Project documentation
```

## Requirements

- Node.js >= 20.0.0
- pnpm >= 9.0.0

## Technology Overview

### Blockchain Stack

- **Platform**: Ethereum (EVM-compatible)
- **Network**: Sepolia Testnet (development) / Ethereum Mainnet (production)
- **Token Standard**: ERC-721 (Non-Fungible Token)
- **Smart Contracts**: Solidity ^0.8.20
- **Framework**: Hardhat
- **Libraries**: OpenZeppelin Contracts
- **Web3 Integration**: ethers.js v6

### Backend

- **Framework**: NestJS (TypeScript/Node.js)
- **API**: RESTful JSON
- **Authentication**: Wallet-based (Ethereum signatures)

### Frontend

- **Framework**: Next.js 14+ (React)
- **Styling**: Tailwind CSS
- **Wallet Integration**: MetaMask, WalletConnect

### Storage

- **On-Chain**: Critical passport data (ownership, hashes)
- **Off-Chain**: IPFS (metadata, documents, images)
- **Database**: PostgreSQL (optional, for indexing)

See [docs/tech-stack.md](docs/tech-stack.md) for complete technical specifications and rationale.

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

## Available Scripts

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

## Development Workflow

### Branch Protection

The repository uses branch protection rules on `main` and `develop` branches that:

- Require pull requests with at least 1 approval
- Require all CI checks to pass before merging
- Prevent direct pushes and force pushes
- Require all conversations to be resolved

See [docs/branch-protection.md](docs/branch-protection.md) for complete details.

### Continuous Integration

The CI pipeline automatically:

- Validates code formatting and linting
- Runs tests for all changed components
- Performs type checking
- Scans for security vulnerabilities
- Generates coverage reports

See [docs/ci-cd.md](docs/ci-cd.md) for pipeline details.

### Pull Request Process

1. Create a new branch from `main`
2. Make changes following the code style and commit conventions
3. Push branch and create pull request
4. CI runs automatically and must pass
5. Obtain required approvals (minimum 1)
6. Resolve all PR conversations
7. Merge when all checks are green

## Documentation

### Project Specifications

- [Domain Specification](docs/domain.md) - Digital Product Passport requirements, actors, user stories, and business rules
- [Technology Stack](docs/tech-stack.md) - Complete technical architecture and technology choices

### Development Workflows

- [Branch Protection Rules](docs/branch-protection.md) - Git workflow and branch protection configuration
- [CI/CD Pipeline](docs/ci-cd.md) - Continuous integration and testing pipeline

## License

UNLICENSED - Private project

# CI/CD Pipeline Documentation

This document describes the Continuous Integration (CI) pipeline for the Open DPP monorepo.

## Overview

The CI pipelines are built using GitHub Actions and are designed to:

- Ensure code quality through automated testing and linting
- Build and validate all components (contracts, API, web)
- Maintain security through automated scanning

**Note:** Deployment (CD) workflows will be added in a future phase when the project is ready for deployment.

## Workflows

### 1. Main CI Pipeline (`ci.yml`)

**Triggers:**

- Pull requests to `main` or `develop` branches
- Pushes to `main` or `develop` branches

**Features:**

- **Smart change detection**: Only runs tests for changed components
- **Parallel execution**: Runs independent checks concurrently
- **Format and lint checks**: Ensures code quality standards
- **Orchestration**: Calls component-specific CI workflows

**Jobs:**

- `changes`: Detects which components have changed
- `lint-and-format`: Runs Prettier and ESLint
- `contracts-ci`: Runs contracts tests (if changed)
- `api-ci`: Runs API tests (if changed)
- `web-ci`: Runs web tests (if changed)
- `ci-success`: Final status check

### 2. Contracts CI (`contracts-ci.yml`)

**Supports:**

- Hardhat framework
- Foundry framework
- Automatic framework detection

**Jobs:**

- `detect-framework`: Identifies which framework is used
- `hardhat`: Compiles contracts, runs tests, generates coverage
- `foundry`: Builds contracts with Forge, runs tests with gas reports
- `security-analysis`: Runs Slither static analysis
- `no-contracts`: Placeholder when contracts aren't set up

**Features:**

- Gas usage reporting
- Code coverage generation
- Security scanning with Slither
- Contract size checks

### 3. API CI (`api-ci.yml`)

**Features:**

- Multi-version Node.js testing (currently Node 20)
- Unit and E2E testing
- Type checking
- Security audits
- Performance testing on main branch

**Jobs:**

- `lint-and-test`: Builds, lints, and runs all tests with coverage
- `type-check`: TypeScript validation
- `security`: pnpm audit for vulnerabilities
- `performance`: Optional performance benchmarks (main branch only)

### 4. Web CI (`web-ci.yml`)

**Features:**

- Next.js build validation
- Type checking
- Bundle size analysis
- Security audits
- Test coverage generation

**Jobs:**

- `lint-and-build`: Lints and builds Next.js app
- `type-check`: TypeScript validation
- `test`: Runs unit tests with coverage (if configured)
- `security`: pnpm audit for vulnerabilities
- `analyze-bundle`: Bundle size monitoring (PR only)

### 5. Security Scanning (`codeql.yml`)

**Triggers:**

- Push to `main` or `develop`
- Pull requests
- Weekly schedule (Mondays at 2 AM UTC)

**Features:**

- Advanced security scanning with CodeQL
- Security and quality queries
- Automated vulnerability detection

### 6. Dependency Management (`dependabot.yml`)

**Features:**

- Automated dependency updates
- Grouped updates for related packages
- Weekly update schedule
- Separate updates for each component

## Configuration

**No secrets are required!** The CI pipelines work out of the box without any configuration.

When deployment workflows are added in the future, deployment-specific secrets will be configured at that time.

## Workflow Optimization

### Change Detection

The CI pipeline uses path filtering to only run tests for changed components:

- Changes to `apps/contracts` only run contracts tests
- Changes to `apps/api` only run API tests
- Changes to `apps/web` only run web tests
- Changes to `packages` run all tests

### Caching

All workflows leverage caching:

- **pnpm**: Dependencies are cached per lockfile hash
- **Docker**: Build layers are cached using GitHub Actions cache
- **Turbo**: Build outputs are cached for faster subsequent builds

### Concurrency

Workflows use concurrency groups to:

- Cancel in-progress CI runs when new commits are pushed
- Ensure only one CI run per branch at a time

## Monitoring

### Viewing Workflow Runs

Workflow runs are visible in the "Actions" tab in GitHub. Each workflow provides:

- Overall status (passing/failing)
- Individual job status
- Detailed logs for each step
- Timing and performance metrics

### Workflow Re-runs

Failed workflows can be re-run either completely or only the failed jobs.

## CI Behavior on Pull Requests

The CI pipeline automatically runs on every pull request and provides status checks that are required before merging (see [Branch Protection Rules](./BRANCH-PROTECTION.md)).

### Required Status Checks

GitHub sees two main status checks from the CI pipeline:

1. **`lint-and-format`** - Ensures code meets formatting and linting standards
2. **`ci-success`** - Aggregated check that validates all component CIs passed

The `ci-success` job is dependent on all component-specific workflows (contracts-ci, api-ci, web-ci) and will only pass if:

- All component workflows that ran have passed
- Skipped workflows (due to no changes) are treated as successful
- The `lint-and-format` check has passed

This design ensures that only two status checks need to be configured for branch protection, while still validating all components thoroughly.

## Security

### Secrets Management

- No secrets are committed to the repository
- GitHub secrets are used for sensitive data when needed
- Secrets are rotated regularly
- Environment-specific secrets are used for different deployment targets

### Access Control

Branch protection rules enforce:

- PR reviews before merging
- Status checks must pass
- Force pushes prevented on protected branches
- Optional: Signed commits

See [BRANCH-PROTECTION.md](./BRANCH-PROTECTION.md) for complete details.

### Dependency Security

- Dependabot monitors security alerts
- Vulnerable dependencies are flagged automatically
- `pnpm audit` runs in CI pipelines
- Security advisories are monitored

## Future Enhancements

Planned improvements:

- E2E testing with Playwright
- Visual regression testing
- Deployment workflows (staging/production)
- Release automation
- Slack/Discord notifications
- Performance budgets enforcement

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Turbo Documentation](https://turbo.build/repo/docs)
- [pnpm Documentation](https://pnpm.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)

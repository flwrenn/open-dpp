# Branch Protection Rules

This document describes the branch protection rules configured for this repository.

## Overview

Branch protection rules enforce code quality standards and prevent accidental changes to important branches by:

- Requiring CI checks to pass before merging
- Requiring code reviews from team members
- Preventing force pushes and deletions
- Enforcing consistent development workflow
- Maintaining code quality standards

## Protected Branches

### Main Branch

**Branch:** `main`

**Protection Rules:**

- **Pull Request Required**: All changes must go through a pull request
  - Required approvals: 0 (CI checks are the primary gate)
  - Stale pull request approvals are dismissed when new commits are pushed
  - Code owner reviews required (if CODEOWNERS file exists)

- **Required Status Checks**: The following checks must pass before merging
  - Branch must be up to date before merging
  - `lint-and-format` - Code formatting and linting validation (Prettier + ESLint)
  - `ci-success` - Aggregated CI validation that ensures all component-specific workflows pass:
    - Contracts CI (build, test, security analysis) - runs when contracts/ changes
    - API CI (build, test, type-check, security audit) - runs when api/ changes
    - Web CI (build, test, type-check, bundle analysis) - runs when web/ changes

- **Additional Protections**:
  - Signed commits required
  - Linear history enforcement

- **Conversation Resolution**: All PR comments must be resolved before merging

- **No Bypass Allowed**: Settings cannot be bypassed, even by administrators

- **Restrictions**:
  - Force pushes: Blocked
  - Branch deletion: Blocked

### Develop Branch

**Branch:** `develop`

**Protection Rules:**

- **Pull Request Required**: All changes must go through a pull request
  - Required approvals: 0 (development branch allows more flexibility)

- **Required Status Checks**: Same as main branch
  - Branch must be up to date before merging
  - `lint-and-format` - Code formatting and linting validation
  - `ci-success` - Aggregated CI validation for all component workflows

- **Conversation Resolution**: All PR comments must be resolved

- **No Bypass Allowed**: Settings cannot be bypassed

- **Restrictions**:
  - Force pushes: Blocked
  - Branch deletion: Blocked

## Workflow Impact

### Direct Push Behavior

Direct pushes to protected branches (`main` and `develop`) are blocked. All changes must be submitted via pull requests.

### Merge Requirements

A pull request can only be merged when:

1. All required status checks are passing
2. All PR conversations are resolved
3. Branch is up to date with the base branch
4. Commits are signed (main branch only)

Note: While pull request reviews are configured, the required approval count is currently set to 0 to streamline the development process. The CI checks serve as the primary quality gate.

### Status Check Dependencies

The `ci-success` check acts as a final orchestrator that validates all component-specific CI workflows have completed successfully. This ensures that even if individual component checks pass, the overall CI pipeline must also complete.

## Code Owners

If a `.github/CODEOWNERS` file exists in the repository, the following applies:

- Reviews from code owners are automatically requested
- Code owner approval may be required for specific paths
- Ownership is defined per directory or file pattern

## Enforcement Policy

These rules are enforced for:

- All team members
- Repository administrators
- Automated systems

No exceptions are allowed without modifying the branch protection configuration.

## Related Documentation

- [CI/CD Pipeline Documentation](./CI-CD.md)
- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Status Check Documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)

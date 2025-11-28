# Contributing to Chacal Studio

Thank you for your interest in contributing! This guide outlines our Git workflow, branching strategy, and development practices.

## Git Branching Strategy

We use a **Git Flow-inspired** branching model with two primary branches:

### Primary Branches

| Branch | Purpose | Protected |
|--------|---------|-----------|
| `main` | Production-ready code. Deployments to production are made from this branch. | Yes |
| `develop` | Integration branch. All feature work is merged here before release. | Yes |

### Supporting Branches

| Branch Type | Naming Convention | Base Branch | Merge Target |
|-------------|-------------------|-------------|--------------|
| Feature | `feature/<description>` | `develop` | `develop` |
| Bugfix | `bugfix/<description>` | `develop` | `develop` |
| Hotfix | `hotfix/<description>` | `main` | `main` + `develop` |
| Release | `release/<version>` | `develop` | `main` + `develop` |

## Development Workflow

### Starting New Work

1. **Sync your local repository:**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** with clear, atomic commits:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, semicolons, etc.) |
| `refactor` | Code refactoring (no feature/fix) |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks, dependency updates |
| `ci` | CI/CD configuration changes |

**Format:** `<type>(<optional-scope>): <description>`

**Examples:**
- `feat(auth): add OAuth2 login support`
- `fix: resolve navigation crash on mobile`
- `docs: update README with setup instructions`

### Submitting Changes

1. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request (PR):**
   - Target branch: `develop` (for features/bugfixes)
   - Provide a clear description of changes
   - Reference any related issues

3. **Code Review:**
   - All PRs require at least one approval
   - Address review feedback promptly
   - Ensure CI checks pass

### Merging Strategy

- **Feature → Develop:** Squash and merge (keeps history clean)
- **Develop → Main:** Merge commit (preserves release history)
- **Hotfix → Main/Develop:** Merge commit

## Release Process

1. Create a release branch from `develop`:
   ```bash
   git checkout -b release/v1.0.0 develop
   ```

2. Perform final testing and version bump

3. Merge to `main` and tag:
   ```bash
   git checkout main
   git merge release/v1.0.0
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin main --tags
   ```

4. Back-merge to `develop`:
   ```bash
   git checkout develop
   git merge release/v1.0.0
   git push origin develop
   ```

5. Delete the release branch

## Hotfix Process

For critical production bugs:

1. Create hotfix branch from `main`:
   ```bash
   git checkout -b hotfix/critical-bug main
   ```

2. Fix the issue and commit

3. Merge to `main`, tag, and back-merge to `develop`

## Code Quality

### Pre-commit Hooks

Husky runs automated checks before commits and pushes:

- **Pre-commit:** Linting (`pnpm lint`)
- **Pre-push:** Linting + Build verification (`pnpm lint && pnpm build`)

### Manual Checks

Before submitting a PR, ensure:

```bash
# Run linting
pnpm lint

# Run build
pnpm build

# Run dev server to verify
pnpm dev
```

## Questions?

If you have questions about the contribution process, please open an issue for discussion.


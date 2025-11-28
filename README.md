# Chacal Studio

A modern web application built with Next.js 16, React 19, and Tailwind CSS 4.

## Tech Stack

| Technology                                | Version | Purpose                         |
| ----------------------------------------- | ------- | ------------------------------- |
| [Next.js](https://nextjs.org)             | 16.0.5  | React framework with App Router |
| [React](https://react.dev)                | 19.2.0  | UI library                      |
| [TypeScript](https://typescriptlang.org)  | 5.x     | Type safety                     |
| [Tailwind CSS](https://tailwindcss.com)   | 4.x     | Utility-first CSS               |
| [ESLint](https://eslint.org)              | 9.x     | Code linting                    |
| [Prettier](https://prettier.io)           | 3.x     | Code formatting                 |
| [Husky](https://typicode.github.io/husky) | 9.x     | Git hooks                       |

## Prerequisites

- **Node.js** 18.17 or later
- **pnpm** 8.x or later (recommended package manager)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chacal-studio
```

### 2. Install Dependencies

```bash
pnpm install
```

This will also set up Husky Git hooks automatically via the `prepare` script.

### 3. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page auto-updates as you edit files in the `app/` directory.

## Available Scripts

| Command             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `pnpm dev`          | Start development server with hot reload       |
| `pnpm build`        | Create optimized production build              |
| `pnpm start`        | Start production server (requires build first) |
| `pnpm lint`         | Run ESLint to check for code issues            |
| `pnpm lint:fix`     | Run ESLint and auto-fix issues                 |
| `pnpm format`       | Format all files with Prettier                 |
| `pnpm format:check` | Check if files are properly formatted          |

## Code Quality

### Linting

ESLint is configured with Next.js recommended rules and TypeScript support:

```bash
# Check for linting issues
pnpm lint

# Auto-fix linting issues
pnpm lint:fix
```

### Formatting

Prettier ensures consistent code style across the project:

```bash
# Format all files
pnpm format

# Check formatting without modifying files
pnpm format:check
```

### Git Hooks

Husky enforces code quality on every commit and push:

| Hook           | Action                    | Purpose                                   |
| -------------- | ------------------------- | ----------------------------------------- |
| **pre-commit** | `pnpm lint`               | Ensures code passes linting before commit |
| **pre-push**   | `pnpm lint && pnpm build` | Validates lint + build before pushing     |

These hooks run automatically — no manual setup required after `pnpm install`.

## Project Structure

```
chacal-studio/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── favicon.ico         # Site favicon
├── public/                 # Static assets
├── .husky/                 # Git hooks
│   ├── pre-commit          # Lint on commit
│   └── pre-push            # Lint + build on push
├── eslint.config.mjs       # ESLint configuration
├── prettier.config.mjs     # Prettier configuration
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies and scripts
```

## Git Workflow

We use a **Git Flow-inspired** branching model:

| Branch      | Purpose                              |
| ----------- | ------------------------------------ |
| `main`      | Production-ready code                |
| `develop`   | Integration branch for features      |
| `feature/*` | New features (branch from `develop`) |
| `bugfix/*`  | Bug fixes (branch from `develop`)    |
| `hotfix/*`  | Critical fixes (branch from `main`)  |

### Quick Start for Contributors

```bash
# 1. Sync with develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and commit
git add .
git commit -m "feat: add your feature"

# 4. Push and create PR
git push origin feature/your-feature-name
```

For detailed contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) — Learn about Next.js features and API
- [React Documentation](https://react.dev) — Learn React
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) — Utility-first CSS framework
- [TypeScript Documentation](https://typescriptlang.org/docs) — JavaScript with types

## License

This project is private and proprietary.

# Conveyor

A modern minimal Vite + React + TypeScript template with pre-configured ESLint (with Airbnb JS/React rules), testing with Vitest and Testing Library, and Prettier, Stylelint and Git hooks powered by pre-commit out of the box 📦

![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Stylelint](https://img.shields.io/badge/stylelint-000?style=for-the-badge&logo=stylelint&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-719A20?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Testing Library](https://img.shields.io/badge/Testing_Library-242526?style=for-the-badge&logo=testing-library&logoColor=FA4445)

## Features

## Usage

```bash
pnpm install

pnpm dev
```

## Scripts

- `pnpm dev` - start a development server for testing the conveyor library with hot reload.
- `pnpm build` - build library for production. The generated files will be on the `dist` folder. `pnpm pack` will package these files into a tarball for install.
- `pnpm preview` - locally preview the production build.
- `pnpm test` - run tests in watch mode.
- `pnpm test:ci` - run tests once without watch mode.
- `pnpm test:ui` - run tests with ui.
- `pnpm format` - format all files with Prettier.
- `pnpm lint` - runs TypeScript, ESLint and Stylelint.
- `pnpm validate` - runs `lint`, `test:ci`.

## Resources

- [Vite](https://github.com/vitejs/vite)
- [Airbnb JS Style Guide](https://github.com/airbnb/javascript)
- [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [Vitest Docs](https://vitest.dev/guide/features.html)
- [Testing Library Docs](https://testing-library.com/docs/)

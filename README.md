# Playwright Test Suite

This directory contains the Playwright end-to-end tests for the sample web application.

## Requirements

- Node.js 18+
- npm 9+

## Installation

From this directory run:

```bash
npm install
```

## Running the Tests

### Execute the full suite

```bash
npx playwright test
```

### Run headed for debugging

```bash
npx playwright test --headed
```

### Generate a new test

```bash
npx playwright codegen https://www.saucedemo.com
```

## Test Structure

```
playwright-tests/
├── tests/
│   ├── configs/       # Shared constants and types
│   ├── helpers/       # Utilities shared between specs
│   ├── page-objects/  # Page Object Model implementations
│   └── specs/         # Test specs organized by feature
└── playwright.config.ts
```

## Configuration

### Base URL

The default `baseURL` is defined in `playwright.config.ts`. To target another environment, update the value:

```ts
  use: {
    baseURL: 'https://www.saucedemo.com',
  }
```

### Browsers and Projects

The config enables Chromium, Firefox, and WebKit. Adjust the `projects` array in `playwright.config.ts` to add or remove environments.

### Reports and Artifacts

- Default reporter: HTML (`playwright-report`).
- Retry traces: collected on the first retry.
- Test artifacts are stored in `test-results/`.

## Useful Commands

- `npx playwright show-report` – open the latest HTML report.
- `npx playwright test --project=chromium` – run tests in a single browser.
- `npx playwright test tests/specs/login.spec.ts` – run a specific spec.

## CI Integration

When running in CI:
- Ensure the target application is reachable from the runner.
- Consider setting `PWDEBUG=1` or `CI=1` to tweak retries and workers.

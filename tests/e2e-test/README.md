# Centops End-to-End Tests

This directory contains comprehensive end-to-end tests for the Centops.
This set of tests cover mostly all API calls to the centops

## Test Architecture

The e2e tests simulate the flow of the Centops based on Docker Testcontainers:

```
HTTP Client → Centops API
```

## Test Scenarios

### ✅ Basic coverage

- **API Testing**: CRUD for Centops API (clients, secrets, manifest..)

## Running Tests

### Prerequisites

- Docker and Docker Compose
- Node.js 22+
- npm 10.12.1+

### Local Execution

#### Run Tests (cli)

```bash
# Run complete e2e test suite (run testcontainer, execute tests, drop all resources)
npm run test
```

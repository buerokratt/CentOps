
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        testTimeout: 10000,
        environment: 'node',
        globals: true,
        include: ['./src/tests/*.test.ts'],
        globalSetup: './src/setup/global-testcontainer-setup.js',
        globalTeardown: './src/setup/global-testcontainer-setup.js',
    },
});


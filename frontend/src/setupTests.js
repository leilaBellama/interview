// src/setupTests.js
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock fetch globally for all tests
global.fetch = vi.fn();

// Mock window.location.reload
Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn(),
  },
  writable: true,
});

// Mock ResizeObserver (often needed for UI components)
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver (if needed)
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Suppress ALL console output during tests for cleaner output
const originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  info: console.info,
};

beforeAll(() => {
  // Only show console output if VERBOSE environment variable is set
  if (!process.env.VERBOSE) {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.info = () => {};
  }
});

afterAll(() => {
  // Restore console
  Object.assign(console, originalConsole);
});

// Reset all mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
});
import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement scrollIntoView; the search-to-focus flow calls it.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

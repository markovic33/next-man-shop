// prettier.config.js
module.exports = {
  // Your existing Prettier configuration goes here
  // For example:
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'avoid'
};

// Import the Prettier configuration dynamically to support ES Modules
// You can comment out or remove this section if you're not using ES Modules
try {
  const esmPrettierConfig = await import('prettier-plugin-tailwindcss/dist/index.mjs');
  module.exports = esmPrettierConfig;
} catch (error) {
  console.error('Error loading ES Module Prettier configuration:', error);
}

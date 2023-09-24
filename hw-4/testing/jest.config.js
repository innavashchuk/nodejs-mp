module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src'],
  silent: false,
  verbose: true,
  collectCoverage: true,  
  coverageReporters: ["json", "html"],
  coverageThreshold: {
    global: {
      lines: 90
    }
  }
};

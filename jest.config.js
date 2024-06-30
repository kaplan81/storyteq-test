module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  moduleNameMapper: {
    '@vehicles/app/(.*)': '<rootDir>/projects/vehicles/src/app/app/$1',
    '@vehicles/cars/(.*)': '<rootDir>/projects/vehicles/src/app/cars/$1',
  },
};

module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "../",
  roots: ["<rootDir>/test/unit", "<rootDir>/src"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  testRegex: ".*\\.spec\\.ts$",
  testSequencer: "<rootDir>/test/jest-test-sequencer.js",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@config/(.*)$": ["<rootDir>src/config/$1"],
    "^@core/(.*)$": ["<rootDir>src/core/$1"],
    "^@app/(.*)$": ["<rootDir>src/app/$1"],
    "^@app$": ["<rootDir>src/app/index"],
    "^@utils$": ["<rootDir>src/utils/index"],
    "^@domain/(.*)$": ["<rootDir>src/domain/$1"],
    "^@services/(.*)$": ["<rootDir>src/services/$1"],
    "^@servers/(.*)$": ["<rootDir>src/servers/$1"],
    "^@graphql/(.*)$": ["<rootDir>src/graphql/$1"],
    "^test/(.*)$": ["<rootDir>test/$1"],
  },
}

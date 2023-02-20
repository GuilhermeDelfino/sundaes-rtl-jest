import { Config } from "jest";

export default {
	testEnvironment: "jsdom",
	testMatch: ["**/*.(spec|test).ts?(x)"],
	transform: {
		"^.+\\.tsx?$": "@swc/jest", // Transform TypeScript files using ts-jest
	},
	coverageDirectory: "<rootDir>/coverage/",
	collectCoverageFrom: [
		"<rootDir>/src/**/*.{ts,tsx}",
		"<rootDir>/test/**/*.{ts,tsx}",
		"!**/__mocks__/**",
		"!**/node_modules/**",
		"!**/*.d.ts",
	],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	moduleNameMapper: {
		"^.+\\.module\\.(css|sass|scss|less)$": "identity-obj-proxy",
		"^.+\\.(css|sass|scss|less)$": "<rootDir>/__mocks__/styleMock.js",
		"^.+\\.(jpg|jpeg|png|gif|webp|avif|svg|ttf|woff|woff2)$":
			"<rootDir>/__mocks__/fileMock.js",
		"^@/(.*)$": ["<rootDir>/src/$1", "<rootDir>/test/$1"],
	},
	roots: ["<rootDir>/src/", "<rootDir>/test/"],
	verbose: true,
	testTimeout: 30000,
} as Config;

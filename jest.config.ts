import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
    preset: "ts-jest",
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.json",
            },
        ],
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!lucide-react)/",
    ],
    moduleDirectories: ["node_modules", "<rootDir>"],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths),
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: [
        "@testing-library/jest-dom",
    ],
};

export default jestConfig;
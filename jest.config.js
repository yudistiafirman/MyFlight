module.exports = {
    preset: "react-native",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    transformIgnorePatterns: [
        "node_modules/(?!(react-native|react-native-vector-icons|react-native-paper|@react-native|@react-navigation))"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|webp|svg|css|scss)$":
            "<rootDir>/__mocks__/fileMock.js"
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};

import { Animated } from "react-native";

jest.mock("react-native-simple-toast", () => ({
    show: jest.fn()
}));

Animated.timing = () => ({
    start: () => jest.fn()
});

jest.mock("react-native-document-picker", () => {
    return {
        pick: jest.fn(() =>
            Promise.resolve({
                uri: "mock-file-uri",
                type: "mock/type",
                name: "mock-file-name",
                size: 1234
            })
        ),
        pickSingle: jest.fn(() =>
            Promise.resolve({
                uri: "mock-file-uri",
                type: "mock/type",
                name: "mock-file-name",
                size: 1234
            })
        ),
        types: {
            images: "images",
            pdf: "pdf",
            plainText: "plainText"
        },
        isCancel: jest.fn(
            (error) => error && error.message === "User canceled"
        ),
        isInProgress: jest.fn(() => false)
    };
});

jest.mock("react-native-fs", () => ({
    DocumentDirectoryPath: "/mock/path",
    readFile: jest.fn(() => Promise.resolve("{}")),
    writeFile: jest.fn(() => Promise.resolve()),
    unlink: jest.fn(() => Promise.resolve()),
    exists: jest.fn(() => Promise.resolve(true))
}));

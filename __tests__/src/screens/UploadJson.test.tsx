import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import DocumentPicker from "react-native-document-picker";
import fs from "react-native-fs";
import { useFlightContext } from "../../../src/context/FlightContext";
import UploadFlightDataJson from "../../../src/screens/UploadJson";

jest.mock("../../../src/context/FlightContext", () => ({
    useFlightContext: jest.fn()
}));

jest.mock("react-native-document-picker", () => ({
    pick: jest.fn(),
    isCancel: jest.fn(),
    isInProgress: jest.fn(),
    types: { json: "application/json" }
}));

jest.mock("react-native-fs", () => ({
    readFile: jest.fn()
}));

jest.mock("react-native-simple-toast", () => ({
    show: jest.fn()
}));

describe("UploadFlightDataJson", () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        (useFlightContext as jest.Mock).mockReturnValue({
            state: {},
            dispatch: mockDispatch
        });
    });

    it("should render the component", () => {
        const { getByText } = render(<UploadFlightDataJson />);

        expect(getByText("Upload Your Flight Data (JSON)")).toBeTruthy();
        expect(
            getByText(
                "Please upload a JSON file containing the flight data to proceed"
            )
        ).toBeTruthy();
        expect(getByText("upload here")).toBeTruthy();
        expect(
            getByText(
                "Only .json files are accepted. Please ensure your file format is correct."
            )
        ).toBeTruthy();
    });

    it("should call DocumentPicker when upload button is pressed", async () => {
        const mockFile = {
            uri: "fake-uri",
            name: "fake-file.json",
            type: "application/json"
        };

        const mockFileContent = '{"flights":[]}';

        (DocumentPicker.pick as jest.Mock).mockResolvedValue([mockFile]);
        (fs.readFile as jest.Mock).mockResolvedValue(mockFileContent);

        const { getByText } = render(<UploadFlightDataJson />);

        fireEvent.press(getByText("upload here"));

        await waitFor(() =>
            expect(DocumentPicker.pick).toHaveBeenCalledTimes(1)
        );
        await waitFor(() =>
            expect(fs.readFile).toHaveBeenCalledWith(mockFile.uri, "utf8")
        );
    });

    it("should dispatch actions after successful file selection", async () => {
        const mockFile = {
            uri: "fake-uri",
            name: "fake-file.json",
            type: "application/json"
        };

        const mockFileContent = JSON.stringify({
            flights: [
                [0, 1, 200],
                [1, 2, 400],
                [2, 1, 500]
            ],
            n: 3
        });

        (DocumentPicker.pick as jest.Mock).mockResolvedValue([mockFile]);
        (fs.readFile as jest.Mock).mockResolvedValue(mockFileContent);

        const { getByText } = render(<UploadFlightDataJson />);

        fireEvent.press(getByText("upload here"));

        await waitFor(() =>
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_FLIGHTS_DATA",
                payload: {
                    flights: [
                        [0, 1, 200],
                        [1, 2, 400],
                        [2, 1, 500]
                    ],
                    n: 3
                }
            })
        );

        await waitFor(() =>
            expect(mockDispatch).toHaveBeenCalledWith({
                type: "SET_UPLOAD_RESULT",
                payload: [mockFile]
            })
        );
    });
});

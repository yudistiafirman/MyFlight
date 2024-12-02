import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useFlightContext } from "../../../src/context/FlightContext";
import PopupInsertFlightInfo from "../../../src/components/PopupInsertFlightInfo";

jest.mock("../../../src/context/FlightContext");

const mockDispatch = jest.fn();
const mockClose = jest.fn();
const mockSearchCheapestFlight = jest.fn();

const mockState = {
    uploadJsonFile: {
        flightsData: {
            flights: [
                [0, 1],
                [1, 2]
            ],
            n: 3
        }
    },
    flightInput: {
        fromCity: null,
        toCity: null,
        stops: 0
    }
};

describe("PopupInsertFlightInfo", () => {
    beforeEach(() => {
        (useFlightContext as jest.Mock).mockReturnValue({
            state: mockState,
            dispatch: mockDispatch
        });
        jest.clearAllMocks();
    });

    it("renders correctly when visible", () => {
        const { getByText, getByPlaceholderText } = render(
            <PopupInsertFlightInfo
                isVisible={true}
                onClose={mockClose}
                onSearchCheapestFlight={mockSearchCheapestFlight}
            />
        );

        expect(getByText("Find Your Perfect Flight")).toBeTruthy();
        expect(getByText("From")).toBeTruthy();
        expect(getByText("To")).toBeTruthy();
        expect(getByText("Search Cheapest Flight")).toBeTruthy();
    });

    it("calls onClose when the close button is pressed", () => {
        const { getByTestId } = render(
            <PopupInsertFlightInfo
                isVisible={true}
                onClose={mockClose}
                onSearchCheapestFlight={mockSearchCheapestFlight}
            />
        );

        fireEvent.press(getByTestId("close-button"));
        expect(mockClose).toHaveBeenCalled();
    });

    it("updates fromCity and toCity when selecting from dropdowns", () => {
        const { getByTestId } = render(
            <PopupInsertFlightInfo
                isVisible={true}
                onClose={mockClose}
                onSearchCheapestFlight={mockSearchCheapestFlight}
            />
        );

        fireEvent(getByTestId("from-dropdown"), "onChange", { value: 0 });
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "SET_FLIGHT_FROM_CITY",
            payload: 0
        });

        fireEvent(getByTestId("to-dropdown"), "onChange", { value: 1 });
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "SET_FLIGHT_TO_CITY",
            payload: 1
        });
    });

    it("does not call onSearchCheapestFlight when button is disabled", () => {
        const { getByText } = render(
            <PopupInsertFlightInfo
                isVisible={true}
                onClose={mockClose}
                onSearchCheapestFlight={mockSearchCheapestFlight}
            />
        );

        const button = getByText("Search Cheapest Flight");
        fireEvent.press(button);
        expect(mockSearchCheapestFlight).not.toHaveBeenCalled(); // Pastikan tidak dipanggil
    });

    it("calls onSearchCheapestFlight when search button is clicked and input is valid", () => {
        mockState.flightInput = { fromCity: 0, toCity: 1, stops: 1 };

        const { getByText } = render(
            <PopupInsertFlightInfo
                isVisible={true}
                onClose={mockClose}
                onSearchCheapestFlight={mockSearchCheapestFlight}
            />
        );

        const button = getByText("Search Cheapest Flight");
        fireEvent.press(button);

        expect(mockSearchCheapestFlight).toHaveBeenCalled();
    });
});

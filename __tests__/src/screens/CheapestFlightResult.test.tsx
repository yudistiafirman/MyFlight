import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useFlightContext } from "../../../src/context/FlightContext";
import CheapestFlightResult from "../../../src/screens/CheapestFlightResult";

jest.mock("../../../src/context/FlightContext", () => ({
    useFlightContext: jest.fn()
}));

describe("CheapestFlightResult", () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        mockDispatch.mockReset();
        (useFlightContext as jest.Mock).mockReturnValue({
            state: {
                cheapestFlightResult: {
                    totalPrice: 800,
                    shortestRoutes: [0, 1, 2]
                }
            },
            dispatch: mockDispatch
        });
    });

    it("should render total price correctly", () => {
        const { getByText } = render(<CheapestFlightResult />);

        const priceText = getByText("$800.00");
        expect(priceText).toBeTruthy();
    });

    it("should render flight routes correctly", () => {
        const { getByText } = render(<CheapestFlightResult />);

        expect(getByText("JFK")).toBeTruthy();
        expect(getByText("LAX")).toBeTruthy();
        expect(getByText("ORD")).toBeTruthy();
    });

    it("should dispatch reset actions when 'Back to Search' is pressed", () => {
        const { getByText } = render(<CheapestFlightResult />);

        const backButton = getByText("Back to Search");
        fireEvent.press(backButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: "RESET_FLIGHT_RESULT_STATE"
        });
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "RESET_FLIGHT_INPUT_STATE"
        });
    });
});

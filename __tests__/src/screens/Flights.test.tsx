import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useFlightContext } from "../../../src/context/FlightContext";
import Flights from "../../../src/screens/Flights";

jest.mock("../../../src/context/FlightContext", () => ({
    useFlightContext: jest.fn()
}));

jest.mock("../../../src/helpers/findCheapestFlight", () => ({
    findCheapestFlight: jest.fn()
}));

jest.mock("react-native-simple-toast", () => ({
    show: jest.fn()
}));

describe("Flights", () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        mockDispatch.mockReset();
        (useFlightContext as jest.Mock).mockReturnValue({
            state: {
                uploadJsonFile: {
                    flightsData: {
                        flights: [
                            [0, 1, 200],
                            [1, 2, 300]
                        ],
                        n: 2
                    },
                    result: [{ name: "Flight Data" }]
                },
                flightInput: {
                    fromCity: 0,
                    toCity: 2,
                    stops: 0
                },
                flightList: {
                    isVisible: false
                }
            },
            dispatch: mockDispatch
        });
    });

    it("should render header and flight information", () => {
        const { getByText } = render(<Flights />);

        expect(getByText("AVAILABLE FLIGHTS")).toBeTruthy();
        expect(getByText("Cities(2)")).toBeTruthy();
        expect(getByText("using Flight Data")).toBeTruthy();
    });

    it("should render flight list correctly", () => {
        const { getByText, getAllByText } = render(<Flights />);

        expect(getByText("JFK")).toBeTruthy();
        const laxElements = getAllByText("LAX");
        expect(laxElements.length).toBe(2);
        expect(getByText("ORD")).toBeTruthy();
        expect(getByText("$200.00")).toBeTruthy();
        expect(getByText("$300.00")).toBeTruthy();
    });

    it("should dispatch SET_VISIBLE_POPUP_FLIGHT_INFO when 'Find Cheapest Flight' is pressed", async () => {
        const { getByText } = render(<Flights />);

        const findFlightButton = getByText("Find Cheapest Flight");
        fireEvent.press(findFlightButton);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: "SET_VISIBLE_POPUP_FLIGHT_INFO",
            payload: true
        });
    });
});

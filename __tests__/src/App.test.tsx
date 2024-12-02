import React from "react";
import { render } from "@testing-library/react-native";
import { useFlightContext } from "../../src/context/FlightContext";
import App from "../../App";

jest.mock("../../src/context/FlightContext", () => ({
    useFlightContext: jest.fn()
}));

describe("App", () => {
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
                },
                cheapestFlightResult: {
                    shortestRoutes: []
                }
            },
            dispatch: mockDispatch
        });
    });

    it("should render UploadJson screen when no JSON is uploaded", () => {
        (useFlightContext as jest.Mock).mockReturnValueOnce({
            state: {
                uploadJsonFile: {
                    result: null
                },
                flightInput: {
                    fromCity: 0,
                    toCity: 2,
                    stops: 0
                },
                flightList: {
                    isVisible: false
                },
                cheapestFlightResult: {
                    shortestRoutes: []
                }
            },
            dispatch: mockDispatch
        });

        const { getByTestId } = render(<App />);

        expect(getByTestId("upload-json-screen")).toBeTruthy();
    });

    it("should render Flights screen after JSON upload", () => {
        (useFlightContext as jest.Mock).mockReturnValueOnce({
            state: {
                uploadJsonFile: {
                    result: {
                        n: 3,
                        flights: [
                            [0, 1, 200],
                            [1, 2, 400],
                            [2, 1, 500]
                        ]
                    }
                },
                flightInput: {
                    fromCity: 0,
                    toCity: 2,
                    stops: 0
                },
                flightList: {
                    isVisible: false
                },
                cheapestFlightResult: {
                    shortestRoutes: []
                }
            },
            dispatch: mockDispatch
        });
        const { getByTestId } = render(<App />);

        expect(getByTestId("flights-screen")).toBeTruthy();
    });

    it("should render CheapestFlightResult screen when shortest routes are available", () => {
        (useFlightContext as jest.Mock).mockReturnValueOnce({
            state: {
                uploadJsonFile: {
                    result: {
                        n: 3,
                        flights: [
                            [0, 1, 200],
                            [1, 2, 400],
                            [2, 1, 500]
                        ]
                    }
                },
                flightInput: {
                    fromCity: 0,
                    toCity: 2,
                    stops: 0
                },
                flightList: {
                    isVisible: false
                },
                cheapestFlightResult: {
                    shortestRoutes: [1, 2, 3],
                    totalPrice: 200
                }
            },
            dispatch: mockDispatch
        });

        const { getByTestId } = render(<App />);

        expect(getByTestId("cheapest-flight-result-screen")).toBeTruthy();
    });
});

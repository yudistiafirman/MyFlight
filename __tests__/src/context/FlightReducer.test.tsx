import { describe, expect, it } from "@jest/globals";
import { DocumentPickerResponse } from "react-native-document-picker";
import {
    FlightAction,
    flightReducer,
    initialFlightState
} from "../../../src/context/FlightReducer";
import { FlightJsonData } from "../../../src/types/FlightData";

describe("flightReducer", () => {
    it("should return the initial state", () => {
        const result = flightReducer(initialFlightState, {
            type: "unknown"
        } as any);
        expect(result).toEqual(initialFlightState);
    });

    it("should handle SET_FLIGHTS_DATA", () => {
        const flightsData: FlightJsonData = {
            n: 3,
            flights: [
                [0, 1, 100],
                [1, 2, 200]
            ]
        };
        const action = {
            type: "SET_FLIGHTS_DATA",
            payload: flightsData
        } as FlightAction;

        const result = flightReducer(initialFlightState, action);
        expect(result.uploadJsonFile.flightsData).toEqual(flightsData);
    });

    it("should handle SET_UPLOAD_RESULT", () => {
        const uploadResult: DocumentPickerResponse[] = [
            {
                uri: "file1.json",
                name: "file1.json",
                type: "application/json",
                fileCopyUri: "file1.json",
                size: 90
            }
        ];
        const action = {
            type: "SET_UPLOAD_RESULT",
            payload: uploadResult
        } as FlightAction;

        const result = flightReducer(initialFlightState, action);
        expect(result.uploadJsonFile.result).toEqual(uploadResult);
    });

    it("should handle RESET_UPLOAD_JSON_FILE_STATE", () => {
        const action = { type: "RESET_UPLOAD_JSON_FILE_STATE" } as FlightAction;

        const result = flightReducer(initialFlightState, action);
        expect(result.uploadJsonFile).toEqual({
            flightsData: { n: 0, flights: [] },
            result: null
        });
    });

    it("should handle RESET_FLIGHT_INPUT_STATE", () => {
        const action = { type: "RESET_FLIGHT_INPUT_STATE" } as FlightAction;

        const result = flightReducer(initialFlightState, action);
        expect(result.flightInput).toEqual({
            fromCity: null,
            toCity: null,
            stops: 0
        });
    });

    it("should handle RESET_FLIGHT_RESULT_STATE", () => {
        const action = { type: "RESET_FLIGHT_RESULT_STATE" } as FlightAction;

        const result = flightReducer(initialFlightState, action);
        expect(result.cheapestFlightResult).toEqual({
            shortestRoutes: [],
            totalPrice: 0
        });
    });

    it("should handle SET_VISIBLE_POPUP_FLIGHT_INFO", () => {
        const action = {
            type: "SET_VISIBLE_POPUP_FLIGHT_INFO",
            payload: true
        } as FlightAction;

        const result = flightReducer(initialFlightState, action);
        expect(result.flightList.isVisible).toBe(true);
    });

    it("should handle SET_FLIGHT_FROM_CITY", () => {
        const action = {
            type: "SET_FLIGHT_FROM_CITY",
            payload: 1
        } as FlightAction;

        const result = flightReducer(initialFlightState, action);
        expect(result.flightInput.fromCity).toBe(1);
    });

    it("should handle SET_FLIGHT_TO_CITY", () => {
        const action = {
            type: "SET_FLIGHT_TO_CITY",
            payload: 2
        } as FlightAction;

        const result = flightReducer(initialFlightState, action);
        expect(result.flightInput.toCity).toBe(2);
    });

    it("should handle SET_FLIGHT_STOPS", () => {
        const action = { type: "SET_FLIGHT_STOPS", payload: 1 } as FlightAction;

        const result = flightReducer(initialFlightState, action);
        expect(result.flightInput.stops).toBe(1);
    });

    it("should handle SET_CHEAPEST_FLIGHT_RESULT", () => {
        const cheapestFlightResult = {
            shortestRoutes: [0, 1, 2],
            totalPrice: 300
        };
        const action = {
            type: "SET_CHEAPEST_FLIGHT_RESULT",
            payload: cheapestFlightResult
        } as FlightAction;

        const result = flightReducer(initialFlightState, action);
        expect(result.cheapestFlightResult).toEqual(cheapestFlightResult);
    });
});

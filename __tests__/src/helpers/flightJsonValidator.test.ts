import Toast from "react-native-simple-toast";
import { validateFlightsData } from "../../../src/helpers/flightJsonValidator";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { FlightJsonData } from "../../../src/types/FlightData";

describe("validateFlightsData", () => {
    const mockToast = Toast.show as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return false for invalid JSON structure", () => {
        const result = validateFlightsData(null as any);
        expect(result).toBe(false);
        expect(mockToast).toHaveBeenCalledWith(
            "Invalid JSON structure. Expected an object.",
            Toast.LONG
        );
    });

    it("should return false for missing 'n' property", () => {
        const data = { flights: [] } as any;
        const result = validateFlightsData(data);
        expect(result).toBe(false);
        expect(mockToast).toHaveBeenCalledWith(
            "Missing or invalid 'n'. Must be a number representing the number of cities.",
            Toast.LONG
        );
    });

    it("should return false for invalid 'flights' property", () => {
        const data = { n: 3, flights: "invalid" } as any;
        const result = validateFlightsData(data);
        expect(result).toBe(false);
        expect(mockToast).toHaveBeenCalledWith(
            "Missing or invalid 'flights'. Must be an array of flight data.",
            Toast.LONG
        );
    });

    it("should return false for invalid 'n' range", () => {
        const data = { n: 0, flights: [] } as FlightJsonData;
        const result = validateFlightsData(data);
        expect(result).toBe(false);
        expect(mockToast).toHaveBeenCalledWith(
            "Invalid number of cities (n). Must be between 1 and 100.",
            Toast.LONG
        );
    });

    it("should return false for exceeding maximum flights", () => {
        const data = {
            n: 3,
            flights: [
                [0, 1, 100],
                [1, 2, 200],
                [0, 2, 300],
                [1, 0, 400]
            ]
        } as FlightJsonData;
        const result = validateFlightsData(data);
        expect(result).toBe(false);
        expect(mockToast).toHaveBeenCalledWith(
            "Invalid number of flights. Must be between 0 and 3 for 3 cities.",
            Toast.LONG
        );
    });

    it("should return false for invalid flight format", () => {
        const data = { n: 3, flights: [[0, 1]] } as any;
        const result = validateFlightsData(data);
        expect(result).toBe(false);
        expect(mockToast).toHaveBeenCalledWith(
            "Each flight must be an array of 3 elements: [from, to, price].",
            Toast.LONG
        );
    });

    it("should return false for invalid flight price range", () => {
        const data = { n: 3, flights: [[0, 1, 10_001]] } as FlightJsonData;
        const result = validateFlightsData(data);
        expect(result).toBe(false);
        expect(mockToast).toHaveBeenCalledWith(
            "Flight price must be between 1 and 10000.",
            Toast.LONG
        );
    });

    it("should return true for valid data", () => {
        const data: FlightJsonData = {
            n: 3,
            flights: [
                [0, 1, 100],
                [1, 2, 200]
            ]
        };

        const result = validateFlightsData(data);
        expect(result).toBe(true);
        expect(mockToast).not.toHaveBeenCalled();
    });
});

import { findCheapestFlight } from "../../../src/helpers/findCheapestFlight";
import { FlightData } from "../../../src/types/FlightData";
import { describe, expect, it } from "@jest/globals";

describe("findCheapestFlight", () => {
    it("should find the cheapest flight with 0 stops", () => {
        const flights: FlightData = [
            [0, 1, 100],
            [1, 2, 200],
            [0, 2, 500]
        ];

        const result = findCheapestFlight(3, flights, 0, 2, 0);

        expect(result.price).toBe(500);
        expect(result.route).toEqual([0, 2]);
    });

    it("should find the cheapest flight with 1 stop", () => {
        const flights: FlightData = [
            [0, 1, 100],
            [1, 2, 200],
            [0, 2, 500]
        ];

        const result = findCheapestFlight(3, flights, 0, 2, 1);

        expect(result.price).toBe(300);
        expect(result.route).toEqual([0, 1, 2]);
    });

    it("should return no flight available (price -1) if there is no route", () => {
        const flights: FlightData = [
            [0, 1, 100],
            [1, 2, 200],
            [0, 2, 500]
        ];

        const result = findCheapestFlight(3, flights, 2, 0, 1);

        expect(result.price).toBe(-1);
        expect(result.route).toEqual([]);
    });

    it("should return no flight available (price -1) if the price is too high", () => {
        const flights: FlightData = [
            [0, 1, 100],
            [1, 2, 200],
            [0, 2, 500]
        ];

        const result = findCheapestFlight(3, flights, 0, 2, 0);

        expect(result.price).toBe(500);
        expect(result.route).toEqual([0, 2]);
    });

    it("should handle case with no flight data", () => {
        const flights: FlightData = [];

        const result = findCheapestFlight(3, flights, 0, 2, 1);

        expect(result.price).toBe(-1);
        expect(result.route).toEqual([]);
    });

    it("should find the cheapest flight with multiple stops", () => {
        const flights: FlightData = [
            [0, 1, 100],
            [1, 2, 100],
            [2, 3, 50],
            [0, 3, 300]
        ];

        const result = findCheapestFlight(4, flights, 0, 3, 2);

        expect(result.price).toBe(250);
        expect(result.route).toEqual([0, 1, 2, 3]);
    });
});

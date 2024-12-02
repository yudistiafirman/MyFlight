import Toast from "react-native-simple-toast";
import { FlightJsonData } from "../types/FlightData";

export const validateFlightsData = (data: FlightJsonData): boolean => {
    const MAX_CITIES = 100;
    const MAX_PRICE = 10_000;

    if (!data || typeof data !== "object") {
        Toast.show("Invalid JSON structure. Expected an object.", Toast.LONG);
        return false;
    }

    if (!("n" in data) || typeof data.n !== "number") {
        Toast.show(
            "Missing or invalid 'n'. Must be a number representing the number of cities.",
            Toast.LONG
        );
        return false;
    }

    if (!("flights" in data) || !Array.isArray(data.flights)) {
        Toast.show(
            "Missing or invalid 'flights'. Must be an array of flight data.",
            Toast.LONG
        );
        return false;
    }

    const { n, flights } = data;

    if (n < 1 || n > MAX_CITIES) {
        Toast.show(
            `Invalid number of cities (n). Must be between 1 and ${MAX_CITIES}.`,
            Toast.LONG
        );
        return false;
    }

    const maxFlights = (n * (n - 1)) / 2;
    if (flights.length > maxFlights) {
        Toast.show(
            `Invalid number of flights. Must be between 0 and ${maxFlights} for ${n} cities.`,
            Toast.LONG
        );
        return false;
    }

    const flightSet = new Set<string>();
    for (const flight of flights) {
        if (!Array.isArray(flight) || flight.length !== 3) {
            Toast.show(
                "Each flight must be an array of 3 elements: [from, to, price].",
                Toast.LONG
            );
            return false;
        }

        const [from, to, price] = flight;

        if (
            typeof from !== "number" ||
            typeof to !== "number" ||
            typeof price !== "number"
        ) {
            Toast.show(
                "Each element of a flight must be of type number.",
                Toast.LONG
            );
            return false;
        }

        if (from < 0 || from >= n || to < 0 || to >= n) {
            Toast.show(
                `City indices must be between 0 and ${
                    n - 1
                } (for ${n} cities).`,
                Toast.LONG
            );
            return false;
        }

        if (from === to) {
            Toast.show(
                "Source and destination cities cannot be the same.",
                Toast.LONG
            );
            return false;
        }

        if (price < 1 || price > MAX_PRICE) {
            Toast.show(
                `Flight price must be between 1 and ${MAX_PRICE}.`,
                Toast.LONG
            );
            return false;
        }

        const routeKey = `${from}-${to}`;
        if (flightSet.has(routeKey)) {
            Toast.show(
                "Duplicate flights between the same cities are not allowed.",
                Toast.LONG
            );
            return false;
        }

        flightSet.add(routeKey);
    }

    return true;
};

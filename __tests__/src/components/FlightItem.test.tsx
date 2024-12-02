import React from "react";
import { render } from "@testing-library/react-native";
import { describe, expect, it, jest } from "@jest/globals";
import { FlightFormattedData } from "../../../src/types/FlightData";
import FlightItem from "../../../src/components/FlightItem";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("FlightItem Component", () => {
    const mockFlightData: FlightFormattedData = {
        from: "New York",
        to: "London",
        price: 350
    };

    it("renders flight details correctly", () => {
        const { getByText } = render(
            <FlightItem
                from={mockFlightData.from}
                to={mockFlightData.to}
                price={mockFlightData.price}
            />
        );

        expect(getByText("New York")).toBeTruthy();
        expect(getByText("London")).toBeTruthy();
        expect(getByText("$350.00")).toBeTruthy();
    });

    it('renders "Lowest Fare" chip when isResult is true', () => {
        const { getByText } = render(
            <FlightItem
                from={mockFlightData.from}
                to={mockFlightData.to}
                price={mockFlightData.price}
                isResult={true}
            />
        );

        expect(getByText("Lowest Fare")).toBeTruthy();
    });

    it('does not render "Lowest Fare" chip when isResult is false', () => {
        const { queryByText } = render(
            <FlightItem
                from={mockFlightData.from}
                to={mockFlightData.to}
                price={mockFlightData.price}
                isResult={false}
            />
        );

        expect(queryByText("Lowest Fare")).toBeNull();
    });
});

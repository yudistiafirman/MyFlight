import React, { createContext, useReducer, useContext } from "react";
import {
    initialFlightState,
    flightReducer,
    FlightState,
    FlightAction
} from "./FlightReducer";

interface FlightContextType {
    state: FlightState;
    dispatch: React.Dispatch<FlightAction>;
}

const FlightContext = createContext<FlightContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const FlightProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(flightReducer, initialFlightState);

    return (
        <FlightContext.Provider value={{ state, dispatch }}>
            {children}
        </FlightContext.Provider>
    );
};

export const useFlightContext = (): FlightContextType => {
    const context = useContext(FlightContext);
    if (!context) {
        throw new Error(
            "useFlightContext must be used within a FlightProvider"
        );
    }
    return context;
};

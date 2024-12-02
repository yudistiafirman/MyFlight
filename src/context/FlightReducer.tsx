import {
    FlightData,
    FlightFormattedData,
    FlightJsonData
} from "../types/FlightData";
import { DocumentPickerResponse } from "react-native-document-picker";

interface UploadFileJsonState {
    flightsData: FlightJsonData;
    result: DocumentPickerResponse[] | undefined | null;
}

interface FlightListState {
    isVisible: boolean;
}

interface FlightInput {
    fromCity: number | null;
    toCity: number | null;
    stops: number;
}

interface CheapestFlightResultState {
    shortestRoutes: number[];
    totalPrice: number;
}

export interface FlightState {
    uploadJsonFile: UploadFileJsonState;
    flightList: FlightListState;
    flightInput: FlightInput;
    cheapestFlightResult: CheapestFlightResultState;
}

export type FlightAction =
    | { type: "SET_FLIGHTS_DATA"; payload: FlightJsonData }
    | {
          type: "SET_UPLOAD_RESULT";
          payload: DocumentPickerResponse[] | undefined | null;
      }
    | { type: "RESET_UPLOAD_JSON_FILE_STATE" }
    | { type: "RESET_FLIGHT_INPUT_STATE" }
    | { type: "RESET_FLIGHT_RESULT_STATE" }
    | { type: "SET_VISIBLE_POPUP_FLIGHT_INFO"; payload: boolean }
    | { type: "SET_FLIGHT_FROM_CITY"; payload: number }
    | { type: "SET_FLIGHT_TO_CITY"; payload: number }
    | { type: "SET_FLIGHT_STOPS"; payload: number }
    | {
          type: "SET_CHEAPEST_FLIGHT_RESULT";
          payload: CheapestFlightResultState;
      };

export const initialFlightState: FlightState = {
    uploadJsonFile: { flightsData: { n: 0, flights: [] }, result: null },
    flightList: { isVisible: false },
    flightInput: { fromCity: null, toCity: null, stops: 0 },
    cheapestFlightResult: { shortestRoutes: [], totalPrice: 0 }
};

export const flightReducer = (
    state: FlightState,
    action: FlightAction
): FlightState => {
    switch (action.type) {
        case "SET_FLIGHTS_DATA":
            return {
                ...state,
                uploadJsonFile: {
                    ...state.uploadJsonFile,
                    flightsData: action.payload
                }
            };
        case "SET_UPLOAD_RESULT":
            return {
                ...state,
                uploadJsonFile: {
                    ...state.uploadJsonFile,
                    result: action.payload
                }
            };
        case "RESET_UPLOAD_JSON_FILE_STATE":
            return {
                ...state,
                uploadJsonFile: {
                    flightsData: { n: 0, flights: [] },
                    result: null
                }
            };
        case "RESET_FLIGHT_INPUT_STATE":
            return {
                ...state,
                flightInput: {
                    fromCity: null,
                    toCity: null,
                    stops: 0
                }
            };
        case "RESET_FLIGHT_RESULT_STATE":
            return {
                ...state,
                cheapestFlightResult: {
                    shortestRoutes: [],
                    totalPrice: 0
                }
            };
        case "SET_VISIBLE_POPUP_FLIGHT_INFO":
            return {
                ...state,
                flightList: {
                    ...state.flightList,
                    isVisible: action.payload
                }
            };
        case "SET_FLIGHT_FROM_CITY":
            return {
                ...state,
                flightInput: {
                    ...state.flightInput,
                    fromCity: action.payload
                }
            };

        case "SET_FLIGHT_TO_CITY":
            return {
                ...state,
                flightInput: {
                    ...state.flightInput,
                    toCity: action.payload
                }
            };

        case "SET_FLIGHT_STOPS":
            return {
                ...state,
                flightInput: {
                    ...state.flightInput,
                    stops: action.payload
                }
            };
        case "SET_CHEAPEST_FLIGHT_RESULT":
            return {
                ...state,
                cheapestFlightResult: action.payload
            };
        default:
            return state;
    }
};

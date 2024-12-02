export type FlightData = [number, number, number][];

export interface FlightJsonData {
    n: number;
    flights: FlightData;
}

export interface FlightFormattedData {
    from: string;
    to: string;
    price: number;
}

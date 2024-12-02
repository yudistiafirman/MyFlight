import { FlightData } from "../types/FlightData";

export function findCheapestFlight(
    n: number,
    flights: FlightData,
    src: number,
    dst: number,
    k: number
) {
    let prices = new Array(n).fill(Infinity);
    let routes: number[][] = new Array(n).fill(null).map(() => []);
    prices[src] = 0;
    routes[src] = [src];

    for (let i = 0; i <= k; i++) {
        let tempPrices = [...prices];
        let tempRoutes = [...routes.map((route) => [...route])];

        for (const [from, to, price] of flights) {
            if (prices[from] === Infinity) continue;

            const newPrice = prices[from] + price;
            if (newPrice < tempPrices[to]) {
                tempPrices[to] = newPrice;
                tempRoutes[to] = [...routes[from], to];
            }
        }

        prices = tempPrices;
        routes = tempRoutes;
    }

    const finalPrice = prices[dst];
    const finalRoute = routes[dst];

    return finalPrice === Infinity
        ? { price: -1, route: [] }
        : { price: finalPrice, route: finalRoute };
}

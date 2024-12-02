/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { PaperProvider } from "react-native-paper";
import { FlightProvider } from "./src/context/FlightContext";

export default function Main() {
    return (
        <PaperProvider>
            <FlightProvider>
                <App />
            </FlightProvider>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);

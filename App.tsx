import React from "react";

import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import colors from "./src/theme/colors";
import layout from "./src/theme/layout";
import UploadFlightDataJson from "./src/screens/UploadJson";
import { useFlightContext } from "./src/context/FlightContext";
import Flights from "./src/screens/Flights";
import CheapestFlightResult from "./src/screens/CheapestFlightResult";

function App(): React.JSX.Element {
    const { state, dispatch } = useFlightContext();
    const backgroundStyle = {
        backgroundColor: colors.white,
        flex: 1
    };

    const hasUploadedJsonData = state.uploadJsonFile.result !== null;
    const foundCheapestFlightResult =
        state.cheapestFlightResult.shortestRoutes.length > 0;

    const configureScreen = () => {
        if (foundCheapestFlightResult) {
            return <CheapestFlightResult />;
        } else if (hasUploadedJsonData) {
            return <Flights />;
        } else {
            return <UploadFlightDataJson />;
        }
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={colors.primary}
            />

            {configureScreen()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: layout.pad.lg
    }
});

export default App;

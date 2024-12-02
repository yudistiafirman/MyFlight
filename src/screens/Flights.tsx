import React, { Fragment } from "react";
import { Dimensions, FlatList, StyleSheet, Text } from "react-native";
import FlightItem from "../components/FlightItem";
import { CITY_CODES } from "../constant/cityCodes";
import Spacer from "../components/Spacer";
import fonts from "../theme/fonts";
import layout from "../theme/layout";
import { View } from "react-native";
import { Button, Chip } from "react-native-paper";
import colors from "../theme/colors";
import PopupInsertFlightInfo from "../components/PopupInsertFlightInfo";
import { useFlightContext } from "../context/FlightContext";
import { findCheapestFlight } from "../helpers/findCheapestFlight";
import Toast from "react-native-simple-toast";

const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.family.roboto[700],
        fontSize: fonts.size.lg,
        fontWeight: "700"
    },
    floatingBtnContainer: {
        position: "absolute",
        top: Dimensions.get("window").height - layout.pad.xxl * 2,
        width: "100%",
        padding: layout.pad.lg,
        backgroundColor: colors.white
    }
});

const Flights = () => {
    const { state, dispatch } = useFlightContext();
    const formattedFlights = state.uploadJsonFile.flightsData.flights.map(
        ([from, to, price]) => ({
            from,
            to,
            price
        })
    );

    const { fromCity, toCity, stops } = state.flightInput;
    const { flights, n } = state.uploadJsonFile.flightsData;

    const onSearchCheapestFlight = () => {
        const result = findCheapestFlight(
            n,
            flights,
            fromCity ? fromCity : 0,
            toCity ? toCity : 0,
            stops ? stops : 0
        );
        if (result.price !== -1) {
            dispatch({ type: "SET_VISIBLE_POPUP_FLIGHT_INFO", payload: false });
            dispatch({
                type: "SET_CHEAPEST_FLIGHT_RESULT",
                payload: {
                    shortestRoutes: result.route,
                    totalPrice: result.price
                }
            });
        } else {
            Toast.show("No route found for the given criteria.", Toast.SHORT);
        }
    };

    const renderHeaderComponent = () => {
        return (
            <View>
                <Chip
                    onClose={() =>
                        dispatch({ type: "RESET_UPLOAD_JSON_FILE_STATE" })
                    }
                    icon="information"
                >
                    using{" "}
                    {state.uploadJsonFile.result &&
                        state.uploadJsonFile.result[0].name}
                </Chip>
                <Spacer size="extraSmall" />

                <Text style={styles.title}>AVAILABLE FLIGHTS</Text>
                <Text style={styles.title}>
                    Cities({state.uploadJsonFile.flightsData.n})
                </Text>
            </View>
        );
    };

    return (
        <View testID="flights-screen" style={{ flex: 1 }}>
            <FlatList
                data={formattedFlights}
                contentContainerStyle={{ margin: layout.pad.lg }}
                ListHeaderComponent={renderHeaderComponent}
                ListHeaderComponentStyle={{ marginBottom: layout.pad.lg }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <FlightItem
                        from={CITY_CODES[item.from]}
                        to={CITY_CODES[item.to]}
                        price={item.price}
                    />
                )}
                ItemSeparatorComponent={() => <Spacer size="extraSmall" />}
            />
            <View style={styles.floatingBtnContainer}>
                <Button
                    onPress={() =>
                        dispatch({
                            type: "SET_VISIBLE_POPUP_FLIGHT_INFO",
                            payload: true
                        })
                    }
                    buttonColor={colors.primary}
                    mode="contained"
                >
                    Find Cheapest Flight
                </Button>
            </View>
            <PopupInsertFlightInfo
                isVisible={state.flightList.isVisible}
                onSearchCheapestFlight={onSearchCheapestFlight}
                onClose={() =>
                    dispatch({
                        type: "SET_VISIBLE_POPUP_FLIGHT_INFO",
                        payload: false
                    })
                }
            />
        </View>
    );
};

export default Flights;

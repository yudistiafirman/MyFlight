import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { useFlightContext } from "../context/FlightContext";
import colors from "../theme/colors";
import layout from "../theme/layout";
import fonts from "../theme/fonts";
import { CITY_CODES } from "../constant/cityCodes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: layout.pad.lg,
        backgroundColor: colors.white
    },
    card: {
        marginVertical: layout.pad.md,
        padding: layout.pad.lg,
        borderRadius: layout.radius.md,
        backgroundColor: colors.primary
    },
    header: {
        fontSize: fonts.size.vs + fonts.size.lg,
        fontFamily: fonts.family.roboto["700"],
        fontWeight: "700",
        color: colors.primary,
        textAlign: "center",
        marginBottom: layout.pad.lg
    },
    subHeader: {
        fontSize: fonts.size.lg,
        fontFamily: fonts.family.roboto["500"],
        fontWeight: "500",
        color: colors.white,
        textAlign: "center"
    },
    price: {
        fontSize: fonts.size.xs + fonts.size.md,
        fontFamily: fonts.family.roboto["700"],
        fontWeight: "bold",
        color: colors.white,
        textAlign: "center"
    },
    routeContainer: {
        marginTop: layout.pad.md
    },
    stepContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: layout.pad.md
    },
    stepCircle: {
        width: layout.pad.xl,
        height: layout.pad.xl,
        borderRadius: layout.pad.xl / 2,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: layout.pad.md
    },
    stepCircleText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: fonts.size.md
    },
    stepText: {
        fontSize: fonts.size.lg,
        color: colors.black,
        fontFamily: fonts.family.roboto["500"],
        fontWeight: "500"
    },
    footer: {
        marginTop: layout.pad.xxl
    },
    floatingBtnContainer: {
        bottom: layout.pad.lg,
        width: "100%",
        position: "absolute",
        alignSelf: "center"
    },
    verticalBorder: {
        height: layout.pad.xxl,
        borderLeftWidth: 1,
        borderColor: colors.primary,
        borderStyle: "dashed",
        marginLeft: layout.pad.lg,
        marginBottom: layout.pad.md
    }
});

const CheapestFlightResult = () => {
    const { state, dispatch } = useFlightContext();
    const { shortestRoutes, totalPrice } = state.cheapestFlightResult;

    return (
        <View testID="cheapest-flight-result-screen" style={styles.container}>
            <Text style={styles.header}>Cheapest Flight Found!</Text>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.subHeader}>Total Price</Text>
                    <Text style={styles.price}>
                        {totalPrice
                            ? totalPrice.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD"
                              })
                            : "$0.00"}{" "}
                       
                    </Text>
                </Card.Content>
            </Card>

            {shortestRoutes.length > 0 && (
                <View style={styles.routeContainer}>
                    <FlatList
                        keyExtractor={(item, idx) => idx.toString()}
                        data={shortestRoutes}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <View
                                        style={styles.stepContainer}
                                        key={index}
                                    >
                                        <View style={styles.stepCircle}>
                                            <Text style={styles.stepCircleText}>
                                                {index + 1}
                                            </Text>
                                        </View>
                                        <Text style={styles.stepText}>
                                            {CITY_CODES[item]}
                                        </Text>
                                    </View>
                                    {index !== shortestRoutes.length - 1 && (
                                        <View style={styles.verticalBorder} />
                                    )}
                                </View>
                            );
                        }}
                    />
                </View>
            )}

            <View style={styles.floatingBtnContainer}>
                <Button
                    mode="contained"
                    buttonColor={colors.primary}
                    onPress={() => {
                        dispatch({
                            type: "RESET_FLIGHT_RESULT_STATE"
                        });
                        dispatch({ type: "RESET_FLIGHT_INPUT_STATE" });
                    }}
                >
                    Back to Search
                </Button>
            </View>
        </View>
    );
};

export default CheapestFlightResult;

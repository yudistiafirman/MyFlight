import React from "react";
import { FlightFormattedData } from "../types/FlightData";
import { StyleSheet, Text, View } from "react-native";
import { Card, Chip } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import fonts from "../theme/fonts";
import layout from "../theme/layout";
import colors from "../theme/colors";
import Spacer from "./Spacer";

const styles = StyleSheet.create({
    cityText: {
        fontFamily: fonts.family.roboto[500],
        fontSize: fonts.size.lg,
        fontWeight: "500"
    },
    border: {
        borderWidth: 0.5,
        flex: 1,
        borderStyle: "dashed",
        borderColor: colors.grey,
        margin: layout.pad.sm
    },
    contentContainer: { flexDirection: "row", alignItems: "center" },
    chipText: {
        fontSize: fonts.size.sm,
        fontFamily: fonts.family.roboto["500"],
        color: colors.black
    }
});

interface FlightItemProps extends FlightFormattedData {
    isResult?: boolean;
}

const FlightItem: React.FC<FlightItemProps> = ({
    from,
    price,
    to,
    isResult
}) => {
    return (
        <Card theme={{ colors: { outline: colors.grey_88 } }} mode="outlined">
            <Card.Content>
                {isResult && (
                    <>
                        <View style={{ alignItems: "flex-end" }}>
                            <Chip
                                textStyle={styles.chipText}
                                icon="information"
                            >
                                Lowest Fare
                            </Chip>
                        </View>
                        <Spacer size="extraSmall" />
                    </>
                )}
                <View style={styles.contentContainer}>
                    <Text style={styles.cityText}>{from}</Text>
                    <View style={styles.border} />
                    <Ionicons
                        size={layout.pad.lg}
                        color={colors.grey}
                        name="airplane-outline"
                    />
                    <View style={styles.border} />
                    <Text style={styles.cityText}>{to}</Text>
                </View>
                <Spacer size="extraSmall" />
                <Text style={styles.cityText}>
                    {price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    })}
                </Text>
            </Card.Content>
        </Card>
    );
};

export default FlightItem;

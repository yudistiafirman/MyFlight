import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import colors from "../theme/colors";
import layout from "../theme/layout";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { Text } from "react-native";
import Spacer from "./Spacer";
import resScale from "../helpers/resScale";
import fonts from "../theme/fonts";
import { Button, TextInput } from "react-native-paper";
import { useFlightContext } from "../context/FlightContext";
import { CITY_CODES } from "../constant/cityCodes";

interface PopupInsertFlightInfoProps {
    isVisible: boolean;
    onClose: () => void;
    onSearchCheapestFlight: () => void;
}

const styles = StyleSheet.create({
    bottomStyle: {
        justifyContent: "flex-end",
        margin: 0
    },
    modalContent: {
        backgroundColor: colors.white,
        padding: layout.pad.lg + layout.pad.sm,
        borderRadius: layout.radius.sm,
        borderColor: colors.grey_88,
        height: Dimensions.get("window").width + layout.pad.xxl
    },
    container: {
        backgroundColor: colors.white,
        padding: layout.pad.lg
    },
    dropdown: {
        height: resScale(50),
        borderColor: colors.grey_88,
        borderWidth: 0.5,
        borderRadius: layout.radius.md,
        paddingHorizontal: layout.pad.md
    },
    icon: {
        marginRight: layout.pad.sm
    },
    label: {
        position: "absolute",
        backgroundColor: colors.white,
        left: resScale(22),
        top: layout.pad.md,
        zIndex: 999,
        paddingHorizontal: layout.pad.md,
        fontSize: fonts.size.md,
        fontFamily: fonts.family.roboto["400"],
        fontWeight: "400"
    },
    placeholderStyle: {
        fontSize: fonts.size.lg,
        fontFamily: fonts.family.roboto["400"],
        fontWeight: "400"
    },
    selectedTextStyle: {
        fontSize: fonts.size.lg,
        fontFamily: fonts.family.roboto["400"],
        fontWeight: "400"
    },
    iconStyle: {
        width: layout.pad.lg,
        height: layout.pad.lg
    },
    titlePopup: {
        fontSize: fonts.size.lg,
        fontFamily: fonts.family.roboto["500"],
        fontWeight: "500"
    },
    searchFlightContainer: {
        bottom: layout.pad.lg,
        width: "100%",
        position: "absolute",
        alignSelf: "center"
    }
});

const PopupInsertFlightInfo: React.FC<PopupInsertFlightInfoProps> = ({
    isVisible,
    onClose,
    onSearchCheapestFlight
}) => {
    const { state, dispatch } = useFlightContext();
    const { flights, n } = state.uploadJsonFile.flightsData;
    const { fromCity, toCity, stops } = state.flightInput;

    const [isFocusFrom, setIsFocusFrom] = useState(false);
    const [isFocusTo, setIsFocusTo] = useState(false);

    const cityOptions = useMemo(() => {
        const uniqueCities = new Set<number>();
        flights.forEach(([from, to]) => {
            uniqueCities.add(from);
            uniqueCities.add(to);
        });
        return Array.from(uniqueCities).map((city) => ({
            label: CITY_CODES[city],
            value: city
        }));
    }, [flights]);

    const filteredToOptions = useMemo(() => {
        return cityOptions.filter((city) => city.value !== fromCity);
    }, [cityOptions, fromCity]);

    const filteredFromOptions = useMemo(() => {
        return cityOptions.filter((city) => city.value !== toCity);
    }, [cityOptions, toCity]);

    const isStopsValid = stops >= 0 && stops < n;
    const isButtonDisabled =
        fromCity === null ||
        toCity === null ||
        !isStopsValid ||
        fromCity === toCity;

    const handleStopsInput = (value: string) => {
        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue)) {
            dispatch({ type: "SET_FLIGHT_STOPS", payload: numericValue });
        } else {
            dispatch({ type: "SET_FLIGHT_STOPS", payload: 0 });
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            backdropColor={"black"}
            backdropOpacity={0.5}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={500}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
            style={styles.bottomStyle}
            onBackButtonPress={onClose}
        >
            <View style={styles.modalContent}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text style={styles.titlePopup}>
                        Find Your Perfect Flight
                    </Text>
                    <TouchableOpacity testID="close-button" onPress={onClose}>
                        <AntDesign
                            name="close"
                            size={layout.pad.lg + layout.pad.sm}
                            color={colors.black}
                        />
                    </TouchableOpacity>
                </View>
                <Spacer size="small" />
                <Dropdown
                    style={[
                        styles.dropdown,
                        isFocusFrom && { borderColor: colors.primary }
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={filteredFromOptions}
                    maxHeight={250}
                    testID="from-dropdown"
                    labelField="label"
                    valueField="value"
                    placeholder="From"
                    value={fromCity}
                    onFocus={() => setIsFocusFrom(true)}
                    onBlur={() => setIsFocusFrom(false)}
                    onChange={(item) => {
                        dispatch({
                            type: "SET_FLIGHT_FROM_CITY",
                            payload: item.value
                        });
                        setIsFocusFrom(false);
                    }}
                    renderLeftIcon={() => (
                        <FontAwesomeIcon
                            style={styles.icon}
                            color={isFocusFrom ? colors.primary : colors.grey}
                            name="plane-departure"
                            size={layout.pad.lg}
                        />
                    )}
                />

                <Spacer size="small" />

                <Dropdown
                    style={[
                        styles.dropdown,
                        isFocusTo && { borderColor: colors.primary }
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={filteredToOptions}
                    maxHeight={250}
                    labelField="label"
                    valueField="value"
                    testID="to-dropdown"
                    placeholder="To"
                    value={toCity}
                    onFocus={() => setIsFocusTo(true)}
                    onBlur={() => setIsFocusTo(false)}
                    onChange={(item) => {
                        dispatch({
                            type: "SET_FLIGHT_TO_CITY",
                            payload: item.value
                        });
                        setIsFocusTo(false);
                    }}
                    renderLeftIcon={() => (
                        <FontAwesomeIcon
                            style={styles.icon}
                            color={isFocusTo ? colors.primary : colors.grey}
                            name="plane-arrival"
                            size={layout.pad.lg}
                        />
                    )}
                />
                <Spacer size="small" />
                <TextInput
                    mode="outlined"
                    testID="stops-input"
                    label="Stops"
                    keyboardType="numeric"
                    value={stops.toString()}
                    onChangeText={handleStopsInput}
                    error={!isStopsValid && stops !== null}
                />
                <View style={styles.searchFlightContainer}>
                    <Button
                        theme={{ colors: { primary: colors.primary } }}
                        onPress={
                            isButtonDisabled
                                ? () => {}
                                : () => onSearchCheapestFlight()
                        }
                        disabled={isButtonDisabled}
                        mode="outlined"
                    >
                        Search Cheapest Flight
                    </Button>
                </View>
            </View>
        </Modal>
    );
};

export default PopupInsertFlightInfo;

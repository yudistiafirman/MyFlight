import { StyleSheet, View } from "react-native";
import colors from "../theme/colors";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import layout from "../theme/layout";
import Spacer from "../components/Spacer";
import { Text } from "react-native";
import fonts from "../theme/fonts";
import { Button } from "react-native-paper";
import DocumentPicker, {
    isCancel,
    isInProgress,
    types
} from "react-native-document-picker";
import { useFlightContext } from "../context/FlightContext";
import fs from "react-native-fs";
import { FlightJsonData } from "../types/FlightData";
import { validateFlightsData } from "../helpers/flightJsonValidator";
import Toast from "react-native-simple-toast";

const styles = StyleSheet.create({
    uploadTitle: {
        fontFamily: fonts.family.roboto["500"],
        fontSize: fonts.size.lg,
        color: colors.white,
        fontWeight: "500"
    },
    uploadBody: {
        fontFamily: fonts.family.roboto["400"],
        fontSize: fonts.size.md,
        color: colors.white,
        fontWeight: "400",
        textAlign: "center"
    },
    layout: {
        flex: 0.5,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center"
    }
});

const UploadFlightDataJson = () => {
    const { state, dispatch } = useFlightContext();

    const handleUploadError = (err: unknown) => {
        if (isCancel(err)) {
            console.warn("cancelled");
            // User cancelled the picker, exit any dialogs or menus and move on
        } else if (isInProgress(err)) {
            console.warn(
                "multiple pickers were opened, only the last will be considered"
            );
        } else {
            Toast.show(err, Toast.SHORT);
        }
    };

    const openDocumentPicker = async () => {
        try {
            const result = await DocumentPicker.pick({ type: types.json });
            const content = await fs.readFile(result[0].uri, "utf8");
            const flightData: FlightJsonData = JSON.parse(content);

            if (!validateFlightsData(flightData)) {
                return;
            }

            dispatch({
                type: "SET_FLIGHTS_DATA",
                payload: flightData
            });
            dispatch({ type: "SET_UPLOAD_RESULT", payload: result });
        } catch (error) {
            handleUploadError(error);
        }
    };
    return (
        <View testID="upload-json-screen" style={{ flex: 1 }}>
            <View style={styles.layout}>
                <MaterialCommunityIcon
                    name="file-upload-outline"
                    size={layout.pad.xxl * 2}
                    color={colors.white}
                />
                <Spacer size="small" />
                <Text style={styles.uploadTitle}>
                    Upload Your Flight Data (JSON)
                </Text>
                <Spacer size="small" />
                <Text style={styles.uploadBody}>
                    Please upload a JSON file containing the flight data to
                    proceed
                </Text>
            </View>
            <View style={{ ...styles.layout, backgroundColor: colors.white }}>
                <Button
                    icon="file-upload"
                    buttonColor={colors.black}
                    mode="contained"
                    onPress={openDocumentPicker}
                >
                    upload here
                </Button>
                <Spacer size="small" />
                <Text style={{ ...styles.uploadBody, color: colors.grey }}>
                    Only .json files are accepted. Please ensure your file
                    format is correct.
                </Text>
            </View>
        </View>
    );
};

export default UploadFlightDataJson;

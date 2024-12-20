import * as React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import layout from "../theme/layout";
import resScale from "../helpers/resScale";

interface IProps {
    size:
        | "verySmall"
        | "extraSmall"
        | "middleSmall"
        | "small"
        | "medium"
        | "large"
        | "extraLarge"
        | number;
}

const styles: StyleProp<ViewStyle> = {
    // marginHorizontal: resScale(0),
};

const makeStyle = ({ size }: IProps): ViewStyle => {
    if (size === "verySmall") {
        return {
            ...styles,
            margin: layout.pad.xs
        };
    }

    if (size === "extraSmall") {
        return {
            ...styles,
            margin: resScale(5)
        };
    }

    if (size === "middleSmall") {
        return {
            ...styles,
            margin: resScale(7)
        };
    }

    if (size === "small") {
        return {
            ...styles,
            margin: resScale(10)
        };
    }

    if (size === "medium") {
        return {
            ...styles,
            margin: resScale(15)
        };
    }

    if (size === "large") {
        return {
            ...styles,
            margin: resScale(20)
        };
    }

    if (typeof size === "number") {
        return {
            ...styles,
            margin: resScale(size)
        };
    }

    return styles;
};

function Spacer({ size = "small" }: IProps) {
    return <View style={makeStyle({ size })} />;
}

export default Spacer;

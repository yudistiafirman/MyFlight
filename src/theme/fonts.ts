import respFS from "../helpers/resFontSize";

const fonts = {
    family: {
        roboto: {
            400: "Roboto-Regular",
            500: "Roboto-Medium",
            700: "Roboto-Bold"
        }
    },
    size: {
        vs: respFS(8),
        xs: respFS(10),
        sm: respFS(12),
        md: respFS(14),
        lg: respFS(16),
        xl: respFS(18)
    }
};

export default fonts;

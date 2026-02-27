import { StyleSheet } from "react-native";
import { COLORS } from "../../theme/color";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        padding: 16,
        justifyContent: "flex-start",
        marginTop: 20
    },
    input: {
        height: 40,
        marginInlineStart: 15
    },
    inputContainer: {
        borderWidth: 0.5,
        borderColor: COLORS.grey,
        borderRadius: 13,
        padding: 10,
        marginBottom: 15
    },
    button: {
        marginTop: 15,
        backgroundColor: COLORS.primary,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderColor: "#E5E5E5",
        backgroundColor: "#fff"
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.text,
    },
    containerTitle: { 
        marginBottom: 10, 
        padding: 5 
    },
    title: {
        fontSize: 18,
        fontWeight: 700,
        color: COLORS.text
    },
    buttonText:{
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 500

    }

});
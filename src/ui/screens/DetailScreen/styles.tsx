import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../theme/color";
const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
    safeModal: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end", // empurra modal para baixo
    },
    modalEditarContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: "flex-start",
        flex: 1
    },
    headerModal: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // título à esquerda, botão à direita
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.text,
    },
    containerTitle: {
        marginBottom: 10,
        padding: 5,
    },
    inputContainer: {
        borderWidth: 0.5,
        borderColor: COLORS.grey,
        borderRadius: 13,
        padding: 10,
        marginBottom: 15,
    },
    input: {
        height: 40,
        marginStart: 5,
    },
    button: {
        backgroundColor: COLORS.primary,
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "500",
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.white,
        marginTop: 30,

    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 8,
        color: COLORS.text,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 4
    },
    address: {
        fontSize: 16,
        color: COLORS.grey
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderColor: "#E5E5E5",
        backgroundColor: COLORS.white,
    },

    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    buttonsContainer: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonsContainerActions: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    buttonEdit: {
        backgroundColor: COLORS.primary,
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonCancel: {
        backgroundColor: COLORS.remove,
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    }

});
// export const styles = StyleSheet.create({



//     buttonText: {
//         color: COLORS.white,
//         fontSize: 16,
//         fontWeight: 500
//     },
//     button: {
//         backgroundColor: COLORS.primary,
//         width: width * 0.9,
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10
//     },
//     headerModal: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "flex-end",
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         backgroundColor: COLORS.white,
//         marginBottom: 20,
//         position: 'absolute',
//         right: 20,
//         top: 30
//     },
//     modalEditarContainer: {
//         backgroundColor: "#fff",
//         padding: 20,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         // flex: 1,
//         justifyContent: 'center'
//     },
//     safeModal: {
//         flex: 1,
//         backgroundColor: "rgba(0,0,0,0.4)"
//     },
//       containerTitle: { 
//         marginBottom: 10, 
//         padding: 5 
//     },
//    input: {
//         height: 40,
//         marginInlineStart: 15
//     },
//     inputContainer: {
//         borderWidth: 0.5,
//         borderColor: COLORS.grey,
//         borderRadius: 13,
//         padding: 10,
//         marginBottom: 15
//     },
// });
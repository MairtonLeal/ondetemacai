import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../../theme/color";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        marginTop: 10,
        fontSize: 15,
        color: COLORS.grey
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        padding: 16,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 60,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#EF476F',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    fabText: {
        color: '#fff',
        fontSize: 30,
        lineHeight: 32,
    },
    searchContainer: {
        // padding: 16,
        borderWidth: 0.5,
        borderColor: '#C4C4C4',
        flexDirection: 'row',
        borderRadius: 15,
        width: width * 0.95,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 5
    },
    searchInput: {
        paddingHorizontal: 12,
        height: 45,
        width: width * 0.8
    },
});
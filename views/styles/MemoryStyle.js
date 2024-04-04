import { StyleSheet } from "react-native";

export const MemoryStyle = StyleSheet.create({
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    memoryTitle: {
        width: '90%',
        borderColor: '#909090',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10
    },
    memoryField: {
        width: '90%',
        borderColor: '#909090',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingTop: 10,
        height: 100
    },
    label: {
        fontWeight: '600',
        width: '90%',
        paddingVertical: 8,
    }
});
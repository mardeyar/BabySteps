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
        borderWidth: 1.5,
        borderRadius: 3,
        padding: 10,
        paddingHorizontal: 7,
        paddingVertical: 13
    },
    nameField: {
        width: '90%',
        borderColor: '#909090',
        borderWidth: 1.5,
        borderRadius: 3,
        padding: 10,
        fontWeight: '500',
        color: 'rgba(0, 0, 0, 0.85)'
    },
    memoryField: {
        width: '90%',
        textAlignVertical: 'top',
        borderColor: '#909090',
        borderWidth: 1.5,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingTop: 10,
        height: 100,
        fontWeight: '500',
        color: 'rgba(0, 0, 0, 0.85)'
    },
    label: {
        fontWeight: '600',
        fontSize: 15,
        width: '90%',
        paddingVertical: 8,
    },
    photo: {
        width: 350,
        height: 250,
        borderRadius: 3,
        borderColor: '#909090',
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    }
});
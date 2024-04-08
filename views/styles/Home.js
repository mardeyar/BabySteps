import { StyleSheet } from "react-native";

export const MemoryFeed = StyleSheet.create({
    card: {
        width: '100%',
        flex: 1,
        backgroundColor: 'rgb(242, 242, 242)',
        marginBottom: 5,
        paddingVertical: 10
    },
    divider: {
        borderBottomColor: '#BABABA',
        borderBottomWidth: .5,
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 10
    },
    dateText: {
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'left',
        borderBottomColor: "#909090",
        borderBottomWidth: 5,
        color: 'rgba(0, 0, 0, 0.75)'
    },
    memoryText: {
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: '500',
        width: '65%',
        color: 'rgba(0, 0, 0, 0.75)'
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
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    row: {
        flexDirection: 'row', 
    },
    feedTitle: {
        fontWeight: '700',
        fontSize: 22,
        color: 'rgba(0, 0, 0, 0.7)',
        padding: 10
    },
    feedPhoto: {
        width: 70,
        height: 70,
        borderRadius: 100
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        backgroundColor: '#EAEEEF',
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        borderBottomWidth: 1
    }
});

export const PhotoView = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
    }
});

export const NoMemory = StyleSheet.create({
    text: {
        fontSize: 16,
        textAlign: 'center',
        padding: 20
    },
    span: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

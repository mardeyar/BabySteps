import { StyleSheet } from "react-native";

export const MemoryFeed = StyleSheet.create({
    card: {
        width: '100%',
        flex: 1,
        backgroundColor: '#EEEEEE',
        marginBottom: 4,
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
        fontSize: 17,
        textAlign: 'left',
        color: 'rgba(0, 0, 0, 0.75)'
    },
    memoryText: {
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: '300',
        fontSize: 15,
        width: '65%',
        color: 'rgba(0, 0, 0, 0.85)'
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
        width: 125,
        height: 125,
        resizeMode: 'cover',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(20, 20, 20, 0.3)'

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
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: 'grey'
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

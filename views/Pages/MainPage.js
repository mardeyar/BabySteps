import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, Alert, Animated } from 'react-native';
import { checkData, fetchMemories, deleteMemory } from '../../database/DatabaseManager';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import MemoryCard from '../../components/MemoryCard';
import { NoMemory, MemoryFeed } from '../styles/Home';

const Home = () => {
    const [memories, setMemories] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedMemory, setSelectedMemory] = useState(null);
    const navigation = useNavigation();
    const scaleValue = useRef(new Animated.Value(1)).current;

    // This block will refresh the page everytime it opens up memories pop up instantly
    useFocusEffect(
        React.useCallback(() => {
            fetchMemories((data) => {
                const sorted = data.sort((a, b) => new Date(b.memory_date) - new Date(a.memory_date));
                setMemories(sorted);
            });
        }, [])
    );

    const handlePhotoTap = (photo) => {
        setSelectedPhoto(photo);
        animatePhoto();
    }

    const animatePhoto = () => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            scaleValue.setValue(1);
        });
    };

    const closePhoto = () => {
        setSelectedPhoto(null);
        scaleValue.setValue(0);
    }

    const handleDeleteMemory = (memoryId) => {
        setSelectedMemory(memoryId);
        Alert.alert(
            'Delete Memory', 
            'Are you sure you want to delete this memory?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                { 
                    text: 'Delete', 
                    onPress: () => {
                        deleteMemory(memoryId, () => {
                            setMemories(prevMemories => prevMemories.filter(memory => memory.memory !== memoryId));
                        });
                    }
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView>
            {memories.length === 0 ? (
                <View>
                    <Text style={NoMemory.text}>You have not posted any memories yet. Get started by tapping the <Text style={NoMemory.span}>Add Memory</Text> button below.</Text>
                </View>
            ) : (
                memories.map((memory, index) => (
                    <MemoryCard 
                        key={index}
                        memoryDate={memory.memory_date}
                        photo={memory.photo}
                        memoryInfo={memory.memory_info}
                        onPressPhoto={() => handlePhotoTap(memory.photo)}
                        onLongPressDelete={() => handleDeleteMemory(memory.memory_id)}
                        style={MemoryFeed.card}
                    />
                ))
            )}

            {/* Fullscreen photo viewer */}
            <Modal visible={!!selectedPhoto} transparent={true} onRequestClose={closePhoto}>
                <TouchableWithoutFeedback onPress={closePhoto}>
                    <View style={styles.modalBackground}>
                        <Animated.Image source={{ uri: selectedPhoto }} resizeMode="contain" style={[styles.fullScreenImage, { transform: [{ scale: scaleValue }] }]} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
    },
});

export default Home;
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, Alert, Animated } from 'react-native';
import { fetchMemories, deleteMemory } from '../../database/DatabaseManager';
import { useFocusEffect } from '@react-navigation/native';
import { checkData } from '../../database/DatabaseManager';

import MemoryCard from '../../components/MemoryCard';
import { NoMemory, MemoryFeed, PhotoView } from '../styles/Home';

const Home = () => {
    const [memories, setMemories] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedMemory, setSelectedMemory] = useState(null);
    const [babyName, setBabyName] = useState('');
    const [babyPhoto, setBabyPhoto] = useState('');
    const scaleValue = useRef(new Animated.Value(1)).current;

    // This block will refresh the page everytime it opens up memories pop up instantly
    useFocusEffect(
        React.useCallback(() => {
            checkData((data) => {
                if (data.length > 0) {
                    setBabyName(data[0].first_name);
                    setBabyPhoto(data[0].photo);
                }
            });

            fetchMemories((data) => {
                const sorted = data.sort((a, b) => new Date(b.memory_date) - new Date(a.memory_date));
                setMemories(sorted);
            });
        },[])
    );

    // Photo animations on full screen render
    const handlePhotoTap = (photo) => {
        setSelectedPhoto(photo);
        openPhoto();
    };

    const openPhoto = () => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 180,
            useNativeDriver: true,
        }).start();
    };
    
    const closePhoto = () => {
        Animated.timing(scaleValue, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
        }).start(() => {
            setSelectedPhoto(null);
        });
    };

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
                            // Refresh feed page on memory deletion
                            fetchMemories((data) => {
                                const sorted = data.sort((a, b) => new Date(b.memory_date) - new Date(a.memory_date));
                                setMemories(sorted);
                            });
                        });
                    }
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView>
            <View style={MemoryFeed.titleRow}>
                <Image source={{ uri: babyPhoto }} style={MemoryFeed.feedPhoto} />
                <Text style={MemoryFeed.feedTitle}>{babyName}'s Feed</Text>
            </View>
            {memories.length === 0 ? (
                <View>
                    <Text style={NoMemory.text}>You have not posted any memories yet. Get started by tapping the <Text style={NoMemory.span}>Add Memory</Text> button below.</Text>
                </View>
            ) : (
                <View>
                    {memories.map((memory, index) => (
                        <MemoryCard 
                            key={index}
                            memoryDate={memory.memory_date}
                            photo={memory.photo}
                            memoryInfo={memory.memory_info}
                            onPressPhoto={() => handlePhotoTap(memory.photo)}
                            onLongPressDelete={() => handleDeleteMemory(memory.memory_id)}
                            style={MemoryFeed.card}
                        />
                    ))}
                </View>
            )}

            {/* Fullscreen photo viewer */}
            <Modal visible={!!selectedPhoto} transparent={true} onRequestClose={closePhoto}>
                <TouchableWithoutFeedback onPress={closePhoto}>
                    <View style={PhotoView.modalBackground}>
                        <Animated.Image 
                            source={{ uri: selectedPhoto }} 
                            resizeMode="contain" 
                            style={[PhotoView.fullScreenImage, { transform: [{ scale: scaleValue }] }]} 
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </ScrollView>
    );
};

export default Home;
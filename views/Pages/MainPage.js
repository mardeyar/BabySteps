import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { checkData, fetchMilestones, deleteMemory } from '../../database/DatabaseManager';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import MilestoneCard from '../../components/MilestoneCard';

const Home = () => {
    const [milestones, setMilestones] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedMemory, setSelectedMemory] = useState(null);
    const navigation = useNavigation();

    // This block will refresh the page everytime it opens up memories pop up instantly
    useFocusEffect(
        React.useCallback(() => {
            fetchMilestones((data) => {
                const sorted = data.sort((a, b) => new Date(b.milestone_date) - new Date(a.milestone_date));
                setMilestones(sorted);
            });
        }, [])
    );

    const handlePhotoTap = (photo) => {
        setSelectedPhoto(photo);
    }

    const closePhoto = () => {
        setSelectedPhoto(null);
    }

    const handleDeleteMemory = (milestoneId) => {
        setSelectedMemory(milestoneId);
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
                        deleteMemory(milestoneId, () => {
                            setMilestones(prevMilestones => prevMilestones.filter(milestone => milestone.milestone_id !== milestoneId));
                        });
                    }
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView>
            {milestones.length === 0 ? (
                <View>
                    <Text>You have no memories posted</Text>
                </View>
            ) : (
                milestones.map((milestone, index) => (
                    <MilestoneCard 
                        key={index}
                        milestoneDate={milestone.milestone_date}
                        milestoneName={milestone.milestone_name}
                        milestoneInfo={milestone.milestone_info}
                        photo={milestone.photo}
                        onPressPhoto={() => handlePhotoTap(milestone.photo)}
                        onLongPressDelete={() => handleDeleteMemory(milestone.milestone_id)}
                    />
                ))
            )}

            {/* Fullscreen photo viewer */}
            <Modal visible={!!selectedPhoto} transparent={true} onRequestClose={closePhoto}>
                <TouchableWithoutFeedback onPress={closePhoto}>
                    <View style={styles.modalBackground}>
                        <Image source={{ uri: selectedPhoto }} resizeMode="contain" style={styles.fullScreenImage} />
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
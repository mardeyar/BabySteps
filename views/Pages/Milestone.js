import React, { useState } from "react"
import * as ImagePicker from 'expo-image-picker';
import { View, TextInput, Button, Image, Alert } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';

import { infoStyle } from '../styles/firstrun';
import { createMilestone } from '../../database/DatabaseManager';
import MilestoneBody from '../../components/MilestoneBody';

const Milestone = () => {
    const navigation = useNavigation();
    
    const [milestoneDate, setMilestoneDate] = useState('');
    const [milestoneName, setMilestoneName] = useState('');
    const [milestoneInfo, setMilestoneInfo] = useState('');
    const [photo, setPhoto] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // TODO: Change this to better suit a posting image instead of profile 
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const handleConfirm = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setMilestoneDate(formattedDate);
        hideDatePicker();
    }

    const saveToDb = () => {
        // Need to ensure required fields are not null
        if (!milestoneDate || !milestoneName || !milestoneInfo) {
            Alert.alert('Missing information', 'Please fill in all required fields');
            return;
        }

        // Save img path as 'photo' column in the milestones table
        createMilestone(milestoneDate, milestoneName, milestoneInfo, photo || '');
        Alert.alert('Success', 'Milestone created!', [
            { text: 'OK', onPress: () => {
                // Reset all state variable to clear the screen then nav to home
                setMilestoneDate('');
                setMilestoneName('');
                setMilestoneInfo('');
                setPhoto('');

                navigation.navigate('Home');
            }}
        ]);
    };

    // The view
    return (
        <View>
        {photo && <Image source={{ uri: photo }} style={infoStyle.photo} />}
            <Button title="Choose photo" onPress={pickImage} />
            <TextInput 
                placeholder="Milestone Name"
                value={milestoneName}
                onChangeText={setMilestoneName}
            />
            <MilestoneBody text={milestoneInfo} setText={setMilestoneInfo}/>
            <View>
                <Button title="Date of milestone" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    value={milestoneDate}
                    textColor="black"
                />
                <TextInput
                    placeholder="Date" 
                    value={milestoneDate}
                    editable={false}
                />
            </View>
            <Button title="Save" onPress={saveToDb} />
        </View>
    );
}

export default Milestone;
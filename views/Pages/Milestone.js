import React, { useState } from "react"
import { View, TextInput, Button } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { createMilestone } from '../../database/DatabaseManager';
import MilestoneBody from '../../components/MilestoneBody';

const Milestone = () => {
    const [milestoneDate, setMilestoneDate] = useState('');
    const [milestoneName, setMilestoneName] = useState('');
    const [milestoneInfo, setMilestoneInfo] = useState('');
    const [photo, setPhoto] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // This code block is here to ask the user permission to access photos for setting profile picture
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
        // This will format the date to string type instead of numbers ex. April 1/2020 vs 4/01/2020
        const dateFormat = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const formattedDate = date.toLocaleDateString(undefined, dateFormat);
        setMilestoneDate(formattedDate);
        hideDatePicker();
    }

    const saveToDb = () => {
        // Need to ensure required fields are not null
        if (!postingDate || !milestoneName || !milestoneInfo) {
            Alert.alert('Missing information', 'Please fill in all required fields');
            return;
        }

        // Save img path as 'photo' column in the milestones table
        createMilestone(postingDate, milestoneName, milestoneInfo, photo || '');
        //navigation.navigate('MainPage', {refresh: true });
    };

    // The view
    return (
        <View>
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
                {/* {dob && <Text>DOB: {dob}</Text>} */}
            </View>
        </View>
    );
}

export default Milestone;
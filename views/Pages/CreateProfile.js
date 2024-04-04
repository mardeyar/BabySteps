import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, Alert, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { createProfile, checkData } from '../../database/DatabaseManager';
import { infoStyle, Body, displayMessage, photoBackground } from '../styles/CreationStyle';
import { Btn } from '../styles/Global';

const CreateProfile = () => {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState(new Date());
    const [dadName, setDadName] = useState('');
    const [momName, setMomName] = useState('');
    const [birthHeight, setBirthHeight] = useState('');
    const [birthLb, setBirthLb] = useState('');
    const [birthOz, setBirthOz] = useState('');
    const [photo, setPhoto] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [profileExists, setProfileExists] = useState(false);

    // Check for data in baby_profile for conditional display on this screen
    useEffect(() => {
        checkData((data) => {
            setProfileExists(data.length > 0);
        });
    }, []);

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
        setDob(date);
        console.log(date);
        hideDatePicker();
    }
    
    // Format the DOB into July 14, 2023 with timezone offset to avoid issues
    const dobFormat = (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        };
        return date.toLocaleDateString('en-US', options);
    };

    const saveToDb = () => {
        // Need to ensure required fields are not null
        if (!firstName || !lastName || !dob || !dadName || !momName || !birthHeight || !birthLb || !birthOz) {
            Alert.alert('Missing information', 'Please fill in all required fields');
            return;
        }

        // Save img path as 'photo' column in the baby_profile table. Also use dob.toIsoString() or else it just will not store date properly
        createProfile(firstName, lastName, dob.toISOString().split('T')[0], dadName, momName, birthHeight, birthLb, birthOz, photo || '');
        Alert.alert(
            'Success!',
            "You have created your baby's profile",
            [
                {
                    text: 'Okay',
                    onPress: () => navigation.navigate('Settings')
                }
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "position"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            style={{ flex: 1 }}
        >
        {/* If no profile exists, display the form */}
        {!profileExists && (
            <ScrollView contentContainerStyle={Body.scrollContainer} >
                <TouchableOpacity onPress={pickImage}>
                    <View style={[infoStyle.photo, photoBackground]}>
                        {photo ? (
                            <Image source={{ uri: photo }} style={infoStyle.photo} />
                        ) : (
                            <View style={infoStyle.placeholder}>
                                <MaterialCommunityIcons name="image" size={32} color="#5A5A5A" />
                                <Text style={infoStyle.addPhoto}>Add Photo</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>

                <View style={Body.inputRow}>
                <Text style={Body.labelText}>First Name</Text>
                    <TextInput
                        style={Body.inputField}
                        placeholder="First name"
                        value={firstName}
                        onChangeText={setFirstName}
                        returnKeyType='next'
                        onSubmitEditing={() => { lastNameInput.focus(); }}
                    />
                </View>

                <View style={Body.inputRow}>
                <Text style={Body.labelText}>Last Name</Text>
                    <TextInput
                        style={Body.inputField}
                        placeholder="Last name"
                        value={lastName}
                        onChangeText={setLastName}
                        ref={(input) => { lastNameInput = input; }}
                    />
                </View>

                <View style={Body.inputRow}>
                <Text style={Body.labelText}>DOB</Text>
                    <TouchableOpacity style={Body.inputField} onPress={showDatePicker}>
                    <Text style={{ color: dob ? 'black' : 'gray' }}>{dobFormat(dob) || 'Select Date'}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        value={dob}
                        date={dob || new Date()}
                        textColor='black'
                    />
                </View>
                    
                <View style={Body.inputRow}>
                <Text style={Body.labelText}>Dad's Name</Text>
                    <TextInput
                    style={Body.inputField}
                    placeholder="Dad"
                    value={dadName}
                    onChangeText={setDadName}
                    returnKeyType='next'
                    onSubmitEditing={() => { momNameInput.focus(); }}
                />
                </View>

                <View style={Body.inputRow}>
                <Text style={Body.labelText}>Mom's Name</Text>
                    <TextInput
                    style={Body.inputField}
                    placeholder="Mom"
                    value={momName}
                    onChangeText={setMomName}
                    ref={(input) => { momNameInput = input; }}
                    returnKeyType='next'
                    onSubmitEditing={() => { heightInput.focus(); }}
                />
                </View>    
                
                <Text style={Body.labelText}>Delivery Details</Text>
                <View style={Body.numberRow}>
                    <TextInput 
                        style={Body.numberInput}
                        placeholder='Birth Height (in)'
                        keyboardType='numeric'
                        value={birthHeight}
                        onChangeText={setBirthHeight}
                        ref={(input) => { heightInput = input; }}
                        returnKeyType='next'
                        onSubmitEditing={() => { birthLbInput.focus(); }}
                    />
                    <TextInput 
                        style={Body.numberInput}
                        placeholder='Birth Weight (lb)'
                        keyboardType='numeric'
                        value={birthLb}
                        onChangeText={setBirthLb}
                        ref={(input) => { birthLbInput = input; }}
                        returnKeyType='next'
                        onSubmitEditing={() => { birthOzInput.focus(); }}
                    />
                    <TextInput 
                        style={Body.numberInput}
                        placeholder='Birth Weight (oz)'
                        keyboardType='numeric'
                        value={birthOz}
                        onChangeText={setBirthOz}
                        ref={(input) => { birthOzInput = input; }}
                        returnKeyType='done'
                    />
                </View>

                <TouchableOpacity
                    style={Btn.buttonStyle}
                    title="Save" 
                    onPress={saveToDb} 
                >
                    <Text style={Btn.text}>Save Profile</Text>
                </TouchableOpacity>
            </ScrollView>
        )}   
        {/* If a profile exists, display the following message */}
        {profileExists && (
            <Text style={displayMessage.styleErer}>You've already set up your babys profile! You can view it from the settings menu</Text>
        )}
        </KeyboardAvoidingView>
    );
};

export default CreateProfile;
import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, Alert, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { editProfile, checkData } from '../../database/DatabaseManager';
import { infoStyle, Body } from '../styles/CreationStyle';
import { Btn } from '../styles/Global';

const EditProfile = () => {
    // To use navigation to get from this page to Disclaimer.js
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

    // Where there is already data inside the table, fetch and display it here
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = checkData((data) => {
                    console.log("Fetched data:", data);
                    if (data && data.length > 0) {
                        const profileData = data[0];
                        setFirstName(profileData.first_name);
                        setLastName(profileData.last_name);
                        setDob(new Date(profileData.dob));
                        setDadName(profileData.dad_name);
                        setMomName(profileData.mom_name);
                        setBirthHeight(profileData.birth_height.toString());
                        setBirthLb(profileData.birth_weight_lb.toString());
                        setBirthOz(profileData.birth_weight_oz.toString());
                        setPhoto(profileData.photo);
                    }
                });
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        fetchProfileData();
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
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDob(date);
        console.log(date);
        hideDatePicker();
    };
    
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
        editProfile(firstName, lastName, dob.toISOString().split('T')[0], dadName, momName, birthHeight, birthLb, birthOz, photo || '');
        Alert.alert(
            'Success!',
            "You have updated your baby's profile",
            [
                {
                    text: 'Okay',
                    onPress: () => navigation.navigate('ProfileScreen')
                }
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "position"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 5}
            style={{ flex: 1 }}>

        <ScrollView contentContainerStyle={Body.scrollContainer}>
        <TouchableOpacity onPress={pickImage}>
            <View style={[infoStyle.photoContainer]}>
                {photo ? (
                    <Image source={{ uri: photo }} style={infoStyle.photo} />
                ) : null}
                <TouchableOpacity onPress={pickImage} style={infoStyle.editIcon}>
                    <MaterialCommunityIcons name="pencil" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>


            <View style={Body.inputRow}>
                <Text style={Body.labelText}>First Name</Text>
                <TextInput
                    style={Body.inputField}
                    placeholder="First name"
                    value={firstName}
                    onChangeText={setFirstName}
                />
            </View>

            <View style={Body.inputRow}>
            <Text style={Body.labelText}>Last Name</Text>
                <TextInput
                    style={Body.inputField}
                    placeholder="Last name"
                    value={lastName}
                    onChangeText={setLastName}
                />
            </View>

            <View style={Body.inputRow}>
            <Text style={Body.labelText}>DOB</Text>
                <TouchableOpacity style={Body.inputField} onPress={showDatePicker}>
                    <Text>{dob ? dobFormat(dob) : 'Select DOB'}</Text>
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
            />
            </View> 

            <View style={Body.inputRow}>
            <Text style={Body.labelText}>Mom's Name</Text>
                <TextInput 
                style={Body.inputField}
                placeholder="Mom"
                value={momName}
                onChangeText={setMomName}
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
                />
                <TextInput 
                    style={Body.numberInput}
                    placeholder='Birth Weight (lb)'
                    keyboardType='numeric'
                    value={birthLb}
                    onChangeText={setBirthLb}
                />
                <TextInput 
                    style={Body.numberInput}
                    placeholder='Birth Weight (oz)'
                    keyboardType='numeric'
                    value={birthOz}
                    onChangeText={setBirthOz}
                />
            </View>

            <TouchableOpacity
                style={Btn.buttonStyle}
                title="Save" 
                onPress={saveToDb} 
            >
                <Text style={Btn.text}>Save Changes</Text>
            </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
        
    );
};

export default EditProfile;
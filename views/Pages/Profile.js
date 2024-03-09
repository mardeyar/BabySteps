import React, { useEffect, useState } from 'react';
import { Card } from '@rneui/themed';
import { View, Text, Image } from 'react-native';
import { checkData } from '../../database/DatabaseManager';
import { useFocusEffect } from '@react-navigation/native';

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [babyPhoto, setBabyPhoto] = useState('');

    useFocusEffect(() => {
        checkData((data) => {
            if (data.length > 0) {
                setFirstName(data[0].first_name);
                setLastName(data[0].last_name);
                setDob(data[0].dob);
                setBabyPhoto(data[0].photo);
            }
        });
    });

    return(
        <View>
            <Image source={{ uri: babyPhoto}} style={{ width: 300, height: 300}} />
            <Text>{firstName} {lastName}</Text>
            <Text>{dob}</Text>    
        </View>
    )
}

export default Profile;
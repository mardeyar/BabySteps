import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { checkData } from '../../database/DatabaseManager';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
    const [firstName, setFirstName] = useState('');
    const [babyPhoto, setBabyPhoto] = useState('');

    useFocusEffect(() => {
        checkData((data) => {
            if (data.length > 0) {
                setFirstName(data[0].first_name);
                setBabyPhoto(data[0].photo);
            }
        });
    });

    return(
        <View>
            {firstName && <Text>Hello {firstName}!</Text>}
            {babyPhoto && <Image source={{ uri: babyPhoto }} style={{ width: 100, height: 100}} />}
        </View>
    )
}

export default Home;
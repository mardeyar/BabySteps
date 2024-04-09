import React from "react";
import { Text } from 'react-native';

const CustomTitle = ({ title }) => {
    return (
        <Text style={{ margin: 0, padding: 0 }}>
          <Text style={{ fontSize: 38, fontWeight: '800', color: '#91A8AA' }}>{title.charAt(0)}</Text>
          <Text style={{ fontSize: 22, fontWeight: '700', color: '#91A8AA' }}>{title.slice(1).toUpperCase()}</Text>
        </Text>
      );
};

export default CustomTitle;

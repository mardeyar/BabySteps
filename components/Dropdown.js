import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const GenderDropdown = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Boy', value: 'Boy'},
        { label: 'Girl', value: 'Girl'}
    ]);

    return (
        <DropDownPicker 
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={(value) => setValue(value)}
        />
    );
}

export default GenderDropdown;
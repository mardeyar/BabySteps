import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const GenderDropdown = ({ value, setValue }) => {
    const [open, setOpen] = useState(false);
    //const [value, setValue] = useState(null); <--- comment out this lin ehere, pass as a prop
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
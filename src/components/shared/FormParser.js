import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl, FormControlLabel, TextField, Switch } from '@mui/material';

export const FormBuilder = ({ controlledValue, setControlledValue, enumOptions, isBoolean, specifiedType, label }) => {
    const handleSwitchChange = (event) => {
        setControlledValue(label, event.target.checked);
    }

    const handleEnumChange = (event) => {
        setControlledValue(label, event.target.value);
    }

    const handlePrimitiveTypeChange = (event) => {
        setControlledValue(label, event.target.value);
    }

    let returnComponent = null;
    if (isBoolean === true) {
        returnComponent = <FormControl fullWidth>
            <FormControlLabel
                value="top"
                control={<Switch
                    checked={controlledValue}
                    onChange={handleSwitchChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />}
                label={label}
                labelPlacement="top"
            />
        </FormControl>
    }

    if (enumOptions !== undefined) {
        returnComponent = <FormControl fullWidth>
            <InputLabel id={`${label}-input-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-input-label`}
                id={`${label}-input`}
                value={controlledValue}
                label={label}
                onChange={handleEnumChange}
            >
                {enumOptions.map(option => {
                    return <MenuItem value={option}>{option}</MenuItem>
                })}
            </Select>
        </FormControl>
    }

    switch (specifiedType) {
        case undefined:
            break;

        case "int":
        case "float":
        case "str":
            returnComponent = <FormControl fullWidth>
                <TextField
                id={`${label}-input`}
                label={label}
                value={controlledValue}
                onChange={handlePrimitiveTypeChange}
            />
            </FormControl>
            break;

        default:
            break;
    }

    return returnComponent;
}

export const TranslateFunctionSignature = (obj) => {
    let translatedObject = {};
    for(let key in obj) {
        let type = undefined;
        let enumOptions = undefined;

        if (Array.isArray(obj[key])) {
            type = "enum";
            enumOptions = obj[key];
        }
        else {
            type = obj[key];
        }
        
        translatedObject[key] = {label: key, specifiedType: type, enumOptions: enumOptions, isBoolean: type==="bool"}
        
    }
    
    return translatedObject;
}

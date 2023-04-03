import React, { useEffect } from 'react';
import { useState } from 'react';
import { GetDatasetGroupedBy } from '../../services/datasetQueryService';
import { FormControl, InputLabel, Select, MenuItem, Grid, OutlinedInput, Checkbox, TextField, Button } from '@mui/material';

export const DataSelectors = ({allowedDataSelectors, setDataSelectors}) => {
    const [disabled, setDisabled] = useState(true);
    const [datasetName, setDatasetName] = useState('');
    const [measurementTypesExisting, setMeasurementTypesExisting] = useState([]);
    const [measurementTypesSelected, setMeasurementTypesSelected] = useState([]);
    const [singleMeasurementTypeSelected, setSingleMeasurementTypeSelected] = useState("");
    const [timeAggregationSelected, setTimeAggregationSelected] = useState('1min');

    useEffect(()=>{}, [allowedDataSelectors]);
    
    const returnParametersValue = () => {
        const newSelectors = {
            "datasetName": datasetName,
            "measurementTypes": measurementTypesSelected,
            "timeAggregate": timeAggregationSelected,
            "measurementType": JSON.stringify([singleMeasurementTypeSelected]),
        };
        setDataSelectors(newSelectors);
    };

    const shouldDisplay = (fieldName) => {
        if (allowedDataSelectors.indexOf(fieldName) > -1) {
            return true;
        }
        return false;
    }

    const handleMTSelectionChange = (event) => {
        const {
          target: { value },
        } = event;
        setMeasurementTypesSelected(typeof value === 'string' ? value.split(',') : value);
      };

    const handleSingleMeasurementTypeChange = (event) => {
        setSingleMeasurementTypeSelected(event.target.value);
    }

    const handleDatasetNameChange = (event) => {
        setDatasetName(event.target.value);
        setDisabled(true);
    }

    const handleTimeAggregateChange = (event) => {
        setTimeAggregationSelected(event.target.value);
    }

    const findMeasurementTypesForDataset = () => {
        setMeasurementTypesSelected([]);
        GetDatasetGroupedBy(datasetName, 'fragment.series').then(res => {
            setMeasurementTypesExisting(Object.keys(res.data));
            if (Object.keys(res.data).length < 1) {
                setDisabled(true);
            }else{
                setDisabled(false);
            }
        })
    }


    return (
        <Grid container>
            <Grid item xs={3}>
                <FormControl fullWidth>
                    <TextField
                    id={`dataset-name-input`}
                    label={'Dataset name'}
                    value={datasetName}
                    onChange={handleDatasetNameChange}
                    />
                </FormControl>
                <Button onClick={() => {findMeasurementTypesForDataset()}}>Choose</Button>
            </Grid>
            {shouldDisplay("measurementTypes") && (
                <Grid item xs={3}>
                    <FormControl fullWidth disabled={disabled}>
                        <InputLabel id={`measurement-types-input-label`}>{"Measurement types"}</InputLabel>
                        <Select
                            multiple
                            labelId={`measurement-types-input-label`}
                            id={`measurement-types-input`}
                            value={measurementTypesSelected}
                            label={"Measurement types"}
                            input={<OutlinedInput label={"Measurement types"}/>}
                            renderValue={(selected) => selected.join(', ')}
                            onChange={handleMTSelectionChange}
                        >
                            {measurementTypesExisting.map((option, idx) => {
                                return <MenuItem value={option} key={`measurement-type-item-${idx}`}>
                                        <Checkbox checked={measurementTypesSelected.indexOf(option) > -1} />
                                        {option}
                                    </MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            )}
            {shouldDisplay("measurementType") && (
                <Grid item xs={3}>
                    <FormControl fullWidth disabled={disabled}>
                        <InputLabel id={`measurement-type-selection-input-label`}>{"Measurement type"}</InputLabel>
                        <Select
                            labelId={`measurement-type-selection-input-label`}
                            id={`measurement-type-selection-input`}
                            value={singleMeasurementTypeSelected}
                            input={<OutlinedInput label={"Measurement type"} />}
                            onChange={handleSingleMeasurementTypeChange}
                        >
                            {measurementTypesExisting.map((option, idx) => {
                                return <MenuItem value={option} key={`measurement-type-selection-item-${idx}`}>
                                        {option}
                                    </MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            )}
            {shouldDisplay("timeAggregate") && (
                <Grid item xs={2}>
                    <FormControl fullWidth disabled={disabled}>
                        <InputLabel id={`time-aggregate-input-label`}>{"Time aggregate"}</InputLabel>
                        <Select
                            labelId={`time-aggregate-input-label`}
                            id={`time-aggregate-input`}
                            value={timeAggregationSelected}
                            input={<OutlinedInput label={"Time aggregate"} />}
                            onChange={handleTimeAggregateChange}
                        >
                            {['1D', '12H', '6H', '1H', '30min', '5min', '1min', '30S'].map((option, idx) => {
                                return <MenuItem value={option} key={`time-aggregate-item-${idx}`}>
                                        {option}
                                    </MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            )}
            <Grid item xs={1}>
                <Button onClick={()=>{returnParametersValue()}} >Apply</Button>
            </Grid>
        </Grid>
    )
}

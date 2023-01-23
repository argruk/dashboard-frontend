import React from 'react';
import { useState } from 'react';
import { Grid, MenuItem, InputLabel, Select, FormControlLabel, Switch } from '@mui/material';
import { Line } from 'react-chartjs-2';


export const MeasurementsRow = ({ 
    selectedMeasurementType, 
    measurementTypes, 
    options, 
    chartData, 
    handleMeasurementTypeSelection, 
    selectedMeasurementsSize, 
    handleNumberOfMeaurements 
}) => {
    const availableNumberOfMeasurements = [10, 20, 50, 100, 200, 500, 1000];
    const [checked, setChecked] = useState(true);

    const handleRealTimeSwitch = (event) => {
        setChecked(event.target.checked);
      };

    return (
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
                <InputLabel id="measurement-type">Measurement Type</InputLabel>
                <Select
                    labelId="measurement-type"
                    id="measurement-type-selection"
                    value={selectedMeasurementType}
                    label="MeasurementType"
                    onChange={handleMeasurementTypeSelection}
                >
                    {measurementTypes.map(type => (
                        <MenuItem value={type}>{type}</MenuItem>
                    ))}
                </Select>
                <InputLabel id="measurements-size">Number of measurements</InputLabel>
                <Select
                    labelId="measurements-size"
                    id="measurements-size-selection"
                    value={selectedMeasurementsSize}
                    label="MeasurementsSize"
                    onChange={handleNumberOfMeaurements}
                >
                    {availableNumberOfMeasurements.map(type => (
                        <MenuItem value={type}>{type}</MenuItem>
                    ))}
                </Select>
                <br/>
                <FormControlLabel
                    value={checked}
                    onChange={handleRealTimeSwitch}
                    control={<Switch color="primary" />}
                    label="Top"
                    labelPlacement="top"
                />
            </Grid>
            <Grid item xs={6}>
                <Line options={options} data={chartData} />
            </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
    );
}

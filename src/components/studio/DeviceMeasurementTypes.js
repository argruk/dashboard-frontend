import React from 'react';
import { useState, useEffect } from 'react';
import { GetAllMeasurementTypesForDevice } from '../../services/measurementService';
import { Grid } from '@mui/material';

export const DeviceMeasurementTypes = ({devicesXMeasurementTypes}) => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
      setTableData(Object.keys(devicesXMeasurementTypes));
    }, [devicesXMeasurementTypes]);

    return (
        <Grid container spacing={0}>
            {tableData.map( key => {
                return (
                    <Grid container spacing={0.2} key={key}>
                        <Grid item xs={1}>{key}</Grid>
                        <Grid item xs={11}>{devicesXMeasurementTypes[key]}</Grid>
                    </Grid>
                );
            })}
        </Grid>
    )
}

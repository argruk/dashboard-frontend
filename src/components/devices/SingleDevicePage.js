import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Grid, MenuItem, InputLabel, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import { GetSingleDevice } from '../../services/deviceService';
import { GetAllMeasurementsWithParams, GetAllMeasurementTypesForDevice } from '../../services/measurementService';
import { DeviceList } from './DeviceList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import 'chartjs-adapter-moment';
import { Chart, registerables } from 'chart.js';
import { MeasurementsRow } from '../shared/MeasurementsRow';
Chart.register(...registerables);

export const SingleDevicePage = (props) => {
  const { id } = useParams();
  const [device, setDevice] = useState(undefined);
  const [deviceDataMeasurements, setDeviceDataMeasurements] = useState([]);
  const [deviceDataStatistics, setDeviceDataStatistics] = useState({});
  const [deviceMeasurementTypes, setDeviceMeasurementTypes] = useState([]);
  const [selectedNumberOfMeasurements, setSelectedNumberOfMeasurements] = useState(10);
  const [selectedDeviceMeasurementType, setSelectedDeviceMeasurementType] = useState("");
  const [chartData, setChartData] = useState({
    datasets: [{
      data: []
    }]
  })
  const navigate = useNavigate();


  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time'
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Measurements',
      },
      legend: {
        display: false
      },
    },
  };

  useEffect(() => {
    
  }, [])
  

  useEffect(() => {
    GetSingleDevice(id).then(res => setDevice(res.data));
    GetAllMeasurementsWithParams(id, selectedDeviceMeasurementType, selectedNumberOfMeasurements).then(res => {
      setDeviceDataMeasurements(res.data.measurements);
      setDeviceDataStatistics(res.data.statistics);
    });
    GetAllMeasurementTypesForDevice(id).then(res => setDeviceMeasurementTypes(res.data));
  }, [id, selectedDeviceMeasurementType, selectedNumberOfMeasurements])

  console.log(deviceDataMeasurements);
  console.log(deviceDataStatistics);

  useEffect(() => {
    setChartData({
      datasets: [{
        data: deviceDataMeasurements.map(measurement => ({
          x: measurement.time,
          y: measurement[selectedDeviceMeasurementType].T.value
        }))
      }]
    });
  }, [deviceDataMeasurements])

  const handleMeasurementTypeSelection = (event) => {
    setSelectedDeviceMeasurementType(event.target.value);
  };

  const handleNumberOfMeaurements = (event) => {
    setSelectedNumberOfMeasurements(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Button onClick={() => navigate(-1)}>
            <ArrowBackIcon /> Go back
          </Button>
        </Grid>
        <Grid item xs={11}>
          <Typography variant='h3' align="left">
            {device?.name}
          </Typography>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <DeviceList devices={device?.childDevices.references.map(ref => ref.managedObject)} />
        </Grid>
        <MeasurementsRow 
          selectedMeasurementType={selectedDeviceMeasurementType}
          handleMeasurementTypeSelection={handleMeasurementTypeSelection}
          measurementTypes={deviceMeasurementTypes}
          options={options}
          chartData={chartData}
          selectedMeasurementsSize={selectedNumberOfMeasurements}
          handleNumberOfMeaurements={handleNumberOfMeaurements} />
      </Grid>
    </div>

  )
}

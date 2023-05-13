import React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GetDatasetGroupedBy } from '../../services/datasetQueryService';


const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 50 },
    { field: "deviceName", headerName: "Name of the device (with id)", width: 300 },
    { field: "measurementTypes", headerName: "Measurements present for device", width: 600 },
]

function processMeasurementTypes(devicesObj) {
    let devicesArray = [];
    let runningId = 0;
    
    for(let key in devicesObj){
        devicesArray.push({ id: runningId, deviceName: key, measurementTypes: devicesObj[key] });
        runningId++;
    }

    return devicesArray;
}

export const DatasetDeviceInfo = ({datasetName}) => {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    GetDatasetGroupedBy(datasetName, "device_name", 'mt').then(res => {
        setDevices(processMeasurementTypes(res.data));
    })
  
  }, [datasetName])
  

  return (
    <div style={{ height: 400, width: '75%', marginBottom: '5rem' }}>
      <DataGrid
        rows={devices}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}

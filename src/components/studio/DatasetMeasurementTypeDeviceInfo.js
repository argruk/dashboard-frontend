import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import {useState, useEffect} from 'react'
import { GetDatasetGroupedBy } from '../../services/datasetQueryService';


const columns = [
    { field: "id", headerName: "ID", flex: 1, width: 50 },
    { field: "measurementTypes", headerName: "Name of measurement type", width: 300 },
    { field: "deviceName", headerName: "Devices present for measurement type (with id)", width: '100%' },
]

function processMeasurementTypes(devicesObj) {
    let devicesArray = [];
    let runningId = 0;
    
    for(let key in devicesObj){
        devicesArray.push({ id: runningId, deviceName: devicesObj[key], measurementTypes: key });
        runningId++;
    }

    return devicesArray;
}

export const DatasetMeasurementTypeDeviceInfo = ({datasetName}) => {
    const [devices, setDevices] = useState([]);
    useEffect(() => {
      GetDatasetGroupedBy(datasetName, "fragment.series", 'mt').then(res => {
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

import React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GetDatasetGroupedBy } from '../../services/datasetQueryService';


const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "measurementType", headerName: "Measurement type", width: 300 },
    { field: "numberOfMeasurements", headerName: "Number of measurements in dataset", width: 200 },
]

function processMeasurementTypes(mtObj) {
    let mtArray = [];
    let runningId = 0;
    
    for(let property in mtObj){
        mtArray.push({ id: runningId, measurementType: property, numberOfMeasurements: mtObj[property] });
        runningId++;
    }
    return mtArray;
}

export const DatasetMeasurementTypes = ({datasetName}) => {
  const [datasetMeasurementTypes, setDatasetMeasurementTypes] = useState([]);
  useEffect(() => {
    GetDatasetGroupedBy(datasetName, "fragment.series").then(res => {
        setDatasetMeasurementTypes(processMeasurementTypes(res.data));
    })
  
  }, [datasetName])
  

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={datasetMeasurementTypes}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}

import React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GetDatasetGroupedBy } from '../../services/datasetQueryService';
import { Box, Button, Modal, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 50 },
    { field: "deviceName", headerName: "Name of the device (with id)", width: 300 },
    { field: "measurementTypes", headerName: "Measurements present for device", width: 600 },
    { field: "fullTextButton", headerName: 'View',
      renderCell: (params) => (
        <Button onClick={() => params.value.fn(params.value.text)}>
          <RemoveRedEyeIcon></RemoveRedEyeIcon>
        </Button>
      )
    }
]

function processMeasurementTypes(devicesObj, handleOnModalOpenClick) {
    let devicesArray = [];
    let runningId = 0;
    
    for(let key in devicesObj){
        devicesArray.push({ id: runningId, deviceName: key, measurementTypes: devicesObj[key], fullTextButton: {fn: handleOnModalOpenClick, text: devicesObj[key]} });
        runningId++;
    }

    return devicesArray;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const DatasetDeviceInfo = ({datasetName}) => {
  const [devices, setDevices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleOnModalOpenClick = (fullText) => {
    setModalOpen(true);
    setModalText(fullText);
  }

  
  const handleOnModalCloseClick = () => {
    setModalOpen(false);
    setModalText("");
  };

  useEffect(() => {
    GetDatasetGroupedBy(datasetName, "device_name", 'mt').then(res => {
        setDevices(processMeasurementTypes(res.data, handleOnModalOpenClick));
    })
  
  }, [datasetName])
  

  return (
    <div style={{ height: 400, width: '100%', marginBottom: '5rem' }}>
      <DataGrid
        rows={devices}
        columns={columns}
        rowsPerPageOptions={[10,25,50,100]}
      />
      <Modal
          open={modalOpen}
          onClose={handleOnModalCloseClick}
        >
          <Box sx={style}>
            <Typography>
              {modalText}
            </Typography>
          </Box>
        </Modal>
    </div>
  )
}

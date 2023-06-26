import React from 'react';
import { useState } from 'react';

import { AlgorithmSelectionSection } from './AlgorithmSelectionSection';
import { DatasetSelectionSection } from './DatasetSelectionSection';
import Grid from '@mui/material/Grid';
import { TextField, Typography } from '@mui/material';

export const AlgorithmSelectionPage = () => {
  const [selectedDataset, setSelectedDataset] = useState(undefined);
  const [newDatasetName, setNewDatasetName] = useState("result");

  const handleChange = (event) => {
    setNewDatasetName(event.target.value);
  };

  return (
      <Grid container sx={{ height: '100%', width: "100%" }} justifyContent="center" rowSpacing={0.5}>
        <Grid key={2} xs={12} item>
          <Typography>Select resulting dataset name: </Typography>
          <TextField value={newDatasetName} onChange={handleChange}></TextField>
        </Grid>
        <Grid key={0} xs={3} bgcolor="yellow" item>
          <Typography m="10px" variant="h4">Select dataset</Typography>

          <DatasetSelectionSection selectedDataset={selectedDataset} setSelectedDataset={setSelectedDataset} />
        </Grid>
        <Grid key={1} xs={9} bgcolor="red" item>
        <Typography  m="10px" variant="h4">Select algorithm and provide values</Typography>
          <AlgorithmSelectionSection newDatasetName={newDatasetName} selectedDataset={selectedDataset} />
        </Grid>
      </Grid>
  )
}

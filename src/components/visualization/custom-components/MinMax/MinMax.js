import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { GetDatasetWindowGroupedBy } from '../../../../services/datasetQueryService';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { CircularProgress } from '@mui/material';
import { prepareDataset } from '../../helperFunctions';
import zoomPlugin from 'chartjs-plugin-zoom';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
  );

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: "Minimum and maximum values",
      },
    },
  };

export const MinMaxChart = ({datasetName, measurementTypes, timeAggregate}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  })

  const composeDataset = async () => {
    let min = (await GetDatasetWindowGroupedBy(datasetName, "min", JSON.stringify(measurementTypes), timeAggregate)).data;
    let max = (await GetDatasetWindowGroupedBy(datasetName, "max", JSON.stringify(measurementTypes), timeAggregate)).data;
  
    const finalMinDataset = prepareDataset(min, "min values");
    const finalMaxDataset = prepareDataset(max, "max values");
    if(JSON.stringify(finalMaxDataset.labels) !== JSON.stringify(finalMinDataset.labels)){
      return [];
    }

    return {
      labels: finalMaxDataset.labels,
      datasets: finalMaxDataset.datasets.concat(finalMinDataset.datasets),
    }
  }

  useEffect(() => {
    if(datasetName && measurementTypes && timeAggregate) {
      composeDataset().then(res => {
        setData(res);
        setLoading(false);
      })
    }
  }, [datasetName, measurementTypes, timeAggregate])
  
  return (
    <div>
      {loading && (<CircularProgress />) }
      <Line
        options={options}
        data={data}
      />
    </div>
  )
}


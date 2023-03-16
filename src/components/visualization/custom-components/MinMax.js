import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { GetDatasetWindowGroupedBy } from '../../../services/datasetQueryService';
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
import { COLUMN_NAMES } from '../../../constants/ColumnNames';
import { prepareDataset } from '../helperFunctions';
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

export const MinMaxChart = ({datasetName}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    labels: [],
    datasets: [],
      // {
      //   label: 'Min values',
      //   data: [],
      //   borderColor: 'rgb(255, 99, 132)',
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
      // {
      //   label: 'Max values',
      //   data: [],
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    // ],
  })

  const convertRawDataset = (dataset) => {
    const fragmentSeries = dataset[COLUMN_NAMES.FRAGMENT_SERIES];
    const time = dataset[COLUMN_NAMES.TIME];
    const value = dataset[COLUMN_NAMES.VALUE];

    const ids = Object.keys(time);
    let collector = {};
    let labels = new Set();

    ids.forEach(id => {
      if(!(fragmentSeries[id] in collector)){
        collector[fragmentSeries[id]] = [];
      }

      collector[fragmentSeries[id]].push(value[id]);
      labels.add(time[id]);
    });

    return {
      labels: Array.from(labels),
      collector: collector
    }
  }

  const composeDataset = async () => {
    const measurementTypes = ["TSu.T", "DP.T", "DP2.T"];
    let min = (await GetDatasetWindowGroupedBy(datasetName, "min", JSON.stringify(measurementTypes))).data;
    let max = (await GetDatasetWindowGroupedBy(datasetName, "max", JSON.stringify(measurementTypes))).data;
  
    const finalMinDataset = prepareDataset(convertRawDataset, min, "min values");
    const finalMaxDataset = prepareDataset(convertRawDataset, max, "max values");
    if(JSON.stringify(finalMaxDataset.labels) !== JSON.stringify(finalMinDataset.labels)){
      return [];
    }

    return {
      labels: finalMaxDataset.labels,
      datasets: finalMaxDataset.datasets.concat(finalMinDataset.datasets),
    }
  }

  useEffect(() => {
    composeDataset().then(res => {
      // const [labelValues, minValues, maxValues] = res;

      setData(res);
      setLoading(false);
      // setData({
      //   labels: labelValues,
      //   datasets: [
      //     {
      //       label: 'Min values',
      //       data: minValues,
      //       borderColor: 'rgb(255, 99, 132)',
      //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
      //     },
      //     {
      //       label: 'Max values',
      //       data: maxValues,
      //       borderColor: 'rgb(53, 162, 235)',
      //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
      //     },
      //   ],
      // })
    })
  }, [datasetName])
  
  
  console.log(data);
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


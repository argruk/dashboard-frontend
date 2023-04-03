import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { GetDatasetGroupedBy } from '../../../../services/datasetQueryService';
import { COLUMN_NAMES } from '../../../../constants/ColumnNames';
import { dynamicColors } from '../../helperFunctions';

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({datasetName}) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  const composeDataset = async () => {
    const obj = (await GetDatasetGroupedBy(datasetName, COLUMN_NAMES.FRAGMENT_SERIES)).data;
    const numberOfDevices = Object.keys(obj).length;
    const colors = Array.from({length: numberOfDevices}, (_, i) => dynamicColors(0.2));

    const borderColors = [];
    const backgroundColors = [];

    colors.forEach(colorSet => {
      backgroundColors.push(colorSet[0]);
      borderColors.push(colorSet[1]);
    })

    return {
      labels: Object.keys(obj),
      datasets: [
        {
          label: 'Amount of measurements/measurement type',
          data: Object.values(obj),
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    }
  };

  useEffect(() => {
    composeDataset().then( res => setData(res));
  }, [datasetName]);
  
  return <Doughnut data={data} />;
}

import { useState, useEffect } from 'react';
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
import { Line } from 'react-chartjs-2';
import { GetDatasetWindowGroupedBy } from '../../../../services/datasetQueryService';
import { COLUMN_NAMES } from '../../../../constants/ColumnNames';
import { dynamicColors } from '../../helperFunctions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Mean measurements',
    },
  },
};


export const MeanMeasurement = ({datasetName, measurementType, timeAggregate}) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });


  const composeDataset = async () => {
    const obj = (await GetDatasetWindowGroupedBy(datasetName, "mean", measurementType, timeAggregate)).data;
    const timeLabels = Object.values(obj[COLUMN_NAMES.TIME]);
    const values = Object.values(obj[COLUMN_NAMES.VALUE]);

    const color = dynamicColors();

    return {
        labels: timeLabels,
        datasets: [
          {
            label: `${measurementType} mean values`,
            data: values,
            borderColor: color,
            borderWidth: 1,
          },
        ],
      }
  };

  useEffect(() => {
    if(datasetName && measurementType && timeAggregate){
      composeDataset().then( res => {setData(res)});
    }
  }, [datasetName, measurementType, timeAggregate]);
  

  return (
    <Line options={options} data={data} />
  )
}

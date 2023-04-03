import { COLUMN_NAMES } from '../../constants/ColumnNames';

export const dynamicColors = function(opacity=1) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    if(opacity<1){
      return ["rgb(" + r + "," + g + "," + b + "," + opacity + ")", "rgb(" + r + "," + g + "," + b + "," + 1 + ")"]
    }
    return "rgb(" + r + "," + g + "," + b + "," + opacity + ")";
 };

export function prepareDataset(rawDataset, additionalName) {
    const { labels, collector } = convertRawDataset(rawDataset);
    const datasets = Object.keys(collector).map((val) => {
      let color = dynamicColors();
      return {
        label: `${val} ${additionalName}`,
        data: collector[val],
        backgroundColor: color,
        borderColor: color,
      };
    });
    return {
      labels: labels.map(lbl => { return (new Date(parseInt(lbl))).toISOString(); }),
      datasets: datasets,
    };
  }

export const convertRawDataset = (dataset) => {
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
export const dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };

export function prepareDataset(convertRawDataset, rawDataset, additionalName) {
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
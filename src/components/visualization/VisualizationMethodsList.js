import { DoughnutChart } from "./custom-components/DoughnutChart/DoughnutChart";
import { MeanMeasurement } from "./custom-components/MeanMeasurement/MeanMeasurement";
import { MinMaxChart } from "./custom-components/MinMax/MinMax";

export const VisualizationMethods = [
    { render: (args) => <MinMaxChart {...args} />, dataSelectors: ["measurementTypes", "datasetName", "timeAggregate"], tabLabel: "MinMax" },
    { render: (args) => <DoughnutChart {...args} />, dataSelectors: ["datasetName"], tabLabel: "Doughnut" },
    { render: (args) => <MeanMeasurement {...args} />, dataSelectors: ["datasetName", "measurementType", "timeAggregate"], tabLabel: "MeanMeasurement" }
    // <p>3</p>,
    // <p>4</p>,
    // <p>5</p>
];
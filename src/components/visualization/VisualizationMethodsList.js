import { DoughnutChart } from "./custom-components/DoughnutChart/DoughnutChart";
import { MinMaxChart } from "./custom-components/MinMax/MinMax";

export const VisualizationMethods = [
    { render: (args) => <MinMaxChart {...args} />, dataSelectors: ["measurementTypes", "datasetName", "timeAggregate"], tabLabel: "MinMax"},
    { render: (args) => <DoughnutChart {...args} />, dataSelectors: ["measurementTypes", "datasetName"], tabLabel: "Doughnut"},
    // <p>3</p>,
    // <p>4</p>,
    // <p>5</p>
];
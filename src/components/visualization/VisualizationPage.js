import { Grid, Tab, Tabs, Box } from '@mui/material';
import { VisualizationMethods } from './VisualizationMethodsList';
import { DataSelectors } from './DataSelectors';
import { TabView } from '../shared/TabView';
import { React, useState } from 'react';

export const VisualizationPage = () => {
    const [visualizationMethod, setVisualizationMethod] = useState(0);
    const [dataSelectors, setDataSelectors] = useState({});

    const handleChange = (event, newValue) => {
        setVisualizationMethod(newValue);
    };

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const verifyNecessaryFieldsPresent = (neededFields) => {
        let returnValue = true;
        neededFields.forEach(field => {
            if (!(field in dataSelectors)) {
                console.log(field, field in dataSelectors)
                returnValue = false;
            }
        });
        return returnValue;
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={3} bgcolor={"green"}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={visualizationMethod ?? 0}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        {VisualizationMethods.map((method, idx) => {
                            return <Tab key={`visualization-method-tab-${idx}`} label={method.tabLabel} {...a11yProps(idx)} />
                        })}
                    </Tabs>

                </Grid>
                <Grid item container xs={9}>
                    {VisualizationMethods.map( (method, idx) => {
                        return (
                            <TabView value={visualizationMethod} index={idx} key={`visualization-method-render-${idx}`}>
                                <Grid item xs={12} bgcolor={"yellow"}>
                                    Data to visualize:
                                    <DataSelectors allowedDataSelectors={method.dataSelectors} setDataSelectors={setDataSelectors} />
                                </Grid>
                                <Grid item xs={12}>
                                    {verifyNecessaryFieldsPresent(method.dataSelectors) && method.render(dataSelectors)}
                                </Grid>
                            </TabView>
                        );
                    })}
                </Grid>
            </Grid>
        </div>
    )
}

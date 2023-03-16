import { Grid, Tab, Tabs } from '@mui/material';
import { VisualizationMethods } from './VisualizationMethodsList';
import { TabView } from '../shared/TabView';
import { React, useState } from 'react';

export const VisualizationPage = () => {
    const [visualizationMethod, setVisualizationMethod] = useState(undefined);

    const handleChange = (event, newValue) => {
        setVisualizationMethod(newValue);
    };

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }


    return (
        <div>
            <Grid container>
                <Grid item xs={3} bgcolor={"green"}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={visualizationMethod}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Item One" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                        <Tab label="Item Four" {...a11yProps(3)} />
                        <Tab label="Item Five" {...a11yProps(4)} />
                    </Tabs>

                </Grid>
                <Grid item container xs={9}>
                    <Grid item xs={12} bgcolor={"yellow"}>
                        Data to visualize:

                    </Grid>
                    <Grid item xs={12}>
                        {VisualizationMethods.map( (method, idx) => {
                            return <TabView value={visualizationMethod} index={idx}>
                                {method}
                            </TabView>
                        })}

                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}

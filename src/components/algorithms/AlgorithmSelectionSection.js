import React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import { Grid, ListItem, ListItemButton, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { GetAllAlgorithms, GetAlgorithmParameters, RunAlgorithm } from '../../services/algorithmService';
import { FormBuilder, TranslateFunctionSignature } from '../shared/FormParser';

export const AlgorithmSelectionSection = ({newDatasetName, selectedDataset}) => {
    const [algorithmsList, setAlgorithmsList] = useState([]);
    const [algorithmParameters, setAlgorithmParameters] = useState({});
    const [expanded, setExpanded] = React.useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        GetAllAlgorithms().then(res => {
            setAlgorithmsList(res.data);
        });
    }, [])

    const loadAlgorithm = (algorithmName) => {
        GetAlgorithmParameters(algorithmName).then(res => {
            let translatedObject = TranslateFunctionSignature(res.data);
            for(let key in translatedObject){
                translatedObject[key]["controlledValue"] = undefined;
            }
            setAlgorithmParameters(translatedObject);
            })
            console.log(algorithmParameters)
    }

    const setSpecificAlgorithmParameter = (key, value) => {
        setAlgorithmParameters(prev => {
            let newObj = {...prev};
            newObj[key]["controlledValue"] = value;
            return newObj;
        })
    }

    const createParameters = () => {
        const parameters = Object.keys(algorithmParameters);
        const finalParametersObj = {};
        parameters.forEach( parameter => {
            if (parameter !== "dataset") {
                finalParametersObj[parameter] = algorithmParameters[parameter]["controlledValue"];
            }
        })
        return finalParametersObj;
    }

    const runAlgorithm = async (algorithmName) => {
        await RunAlgorithm(algorithmName, selectedDataset, newDatasetName, 
            {parameters: createParameters()}
        );
        setNotificationOpen(true);
    }

    const handleClose = () => {
        setNotificationOpen(false);
    };

    return (
        <>
            <Snackbar open={notificationOpen} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={1000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
                    Algorithm has completed!
                </MuiAlert>
            </Snackbar>
            <List>
                {algorithmsList.map(element => {
                    return (
                        <ListItem key={`algorithm-key-${element}`}>
                            <ListItem>
                                <Accordion sx={{ width: "100%" }} expanded={expanded === element} onChange={handleChange(element)}>
                                    <AccordionSummary
                                        onClick={() => loadAlgorithm(element)}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{element}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid justifyContent="center" alignItems="center" container>
                                            <Grid xs={3} item>
                                                {Object.keys(algorithmParameters).map(key => {
                                                    return <FormBuilder key={`algorithm-key-${element}-${key}`} {...algorithmParameters[key]} setControlledValue={setSpecificAlgorithmParameter} />
                                                })}
                                            </Grid>
                                            <Grid xs={1} sx={{height: "100%"}} item onClick={() => runAlgorithm(element)}><Button color="success">Use</Button></Grid>
                                        </Grid>
                                        
                                    </AccordionDetails>
                                </Accordion>
                            </ListItem>
                        </ListItem>
                    )

                })}
            </List>
        </>
        
    )
}

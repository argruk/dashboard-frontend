import React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import { Grid, ListItem, ListItemButton, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetAllAlgorithms, GetAlgorithmParameters } from '../../services/algorithmService';
import { FormBuilder, TranslateFunctionSignature } from '../shared/FormParser';

export const AlgorithmSelectionSection = () => {
    const [algorithmsList, setAlgorithmsList] = useState([]);
    const [algorithmParameters, setAlgorithmParameters] = useState({});
    const [expanded, setExpanded] = React.useState(false);

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
    }

    const setSpecificAlgorithmParameter = (key, value) => {
        setAlgorithmParameters(prev => {
            let newObj = {...prev};
            newObj[key]["controlledValue"] = value;
            return newObj;
        })
    }

    return (
        <List>
            {algorithmsList.map(element => {
                return (
                    <ListItem>
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
                                        <Grid xs={3} bgcolor="pink" item>
                                            {Object.keys(algorithmParameters).map(key => {
                                                return <FormBuilder {...algorithmParameters[key]} setControlledValue={setSpecificAlgorithmParameter} />
                                            })}
                                        </Grid>
                                        <Grid xs={8} sx={{height: "100%"}} bgcolor="orange" item>Description</Grid>
                                        <Grid xs={1} sx={{height: "100%"}} item><Button color="success">Use</Button></Grid>
                                    </Grid>
                                    
                                </AccordionDetails>
                            </Accordion>
                        </ListItem>
                    </ListItem>
                )

            })}
        </List>
    )
}

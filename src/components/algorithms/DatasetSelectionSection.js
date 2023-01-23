import React from 'react';
import { useState, useEffect } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { GetAllDatasets } from '../../services/datasetService';
import CheckIcon from '@mui/icons-material/Check';

export const DatasetSelectionSection = ({selectedDataset, setSelectedDataset}) => {
    const [datasetList, setDatasetList] = useState([1,2,3,4,5]);

    useEffect(() => {
        GetAllDatasets().then(res => {
            setDatasetList(res.data);
        });
    }, [])

    const handleDatasetSelect = (datasetName) => {
        setSelectedDataset(datasetName);
    };

    const handleClearSelection = () => {
        setSelectedDataset(undefined);
    };

    return (
        <List width="100%">
            {selectedDataset? <ListItem>
                <ListItemButton onClick={() => handleClearSelection()}>
                    <ListItemText color='red'>Clear selection</ListItemText>
                </ListItemButton>
            </ListItem> : ""}
            {datasetList.map(
                (datasetName) => {
                    return <ListItem>
                        <ListItemButton onClick={() => handleDatasetSelect(datasetName)}>
                            {selectedDataset === datasetName ? <ListItemIcon><CheckIcon/></ListItemIcon> : ""}
                            <ListItemText>{datasetName}</ListItemText>
                        </ListItemButton>
                    </ListItem>
                }
            )}
        </List>
    );
}

import { Grid, Divider, TextField, MenuItem, Select, Button } from '@mui/material'
import React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState, useEffect } from 'react';
import { GetAllMeasurementTypesForDevice } from '../../services/measurementService';
import { GetDatasetGroupedBy } from '../../services/datasetQueryService';
import {SearchParameters} from "../../constants/SearchParameters";
import {TransferList} from '../shared/TransferList';
import { FindDeviceById, FindDeviceByName } from '../../services/searchService';
import { replaceSpecialCharacters } from '../../helpers/EncodingHelpers';
import { DeviceMeasurementTypes } from './DeviceMeasurementTypes';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DownloadNewDataset } from '../../services/datasetService';
import { DatasetMeasurementTypes } from './DatasetMeasurementTypes';


export const DataStudioPage = () => {
    const [searchParameter, setSearchParameter] = useState("name");
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [devicesXMeasurementTypes, setDevicesXMeasurementTypes] = useState({});
    const [dateTimeFrom, setDateTimeFrom] = useState(new Date(Date.now()));
    const [dateTimeTo, setDateTimeTo] = useState(new Date(Date.now()));
    const [filenameInput, setFilenameInput] = useState("");

    useEffect(() => {
      var newDevicesXMeasurementTypes = {};
      right.forEach(device => {
        GetAllMeasurementTypesForDevice(device.id).then(resp => {
            newDevicesXMeasurementTypes[device.name] = resp.data.sort();
        })
      });
      setDevicesXMeasurementTypes(newDevicesXMeasurementTypes);

    }, [right]);

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleFilenameInputChange = (event) => {
        setFilenameInput(event.target.value);
    };

    const handleSearchParameterChange = (event) => {
        setSearchParameter(event.target.value);
    };

    const handleDateTimeFromSelect = (newDate) => {
        setDateTimeFrom(newDate);
    };

    const handleDateTimeToSelect = (newDate) => {
        setDateTimeTo(newDate);
    };

    const addItemsToLeft = (items) => {
        setLeft(items);
    };

    const searchClicked = () => {
        const clearedSearchInput = replaceSpecialCharacters(searchInput);
        switch (searchParameter) {
            case "name":
                FindDeviceByName(clearedSearchInput).then((resp) => addItemsToLeft(resp.data));
                break;
        
            case "id":
                FindDeviceById(clearedSearchInput).then((resp) => {
                    addItemsToLeft(resp.data)
                });
                break;

            default:
                break;
        }
    };

    const downloadClicked = () => {
        DownloadNewDataset(filenameInput, dateTimeFrom, dateTimeTo);
    };

    return (
        <div style={{marginTop:"5vh"}}>
            <Grid container spacing={0.5}>
            <Grid item xs={2}>
                    Pick range to download data
                </Grid>
                <Grid item xs={10}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="From"
                            value={dateTimeFrom}
                            onChange={handleDateTimeFromSelect}
                            ampm={false}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DateTimePicker
                            label="To"
                            value={dateTimeTo}
                            onChange={handleDateTimeToSelect}
                            ampm={false}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TextField
                            id="outlined-search"
                            label="Resulting dataset name"
                            type="text"
                            variant="outlined"
                            value={filenameInput}
                            onChange={(e) => handleFilenameInputChange(e)}
                        />
                        <Button onClick={() => downloadClicked()}>
                            Download
                        </Button>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                    Select devices
                </Grid>
                <Grid item xs={10}>
                    <TextField
                        id="outlined-search"
                        label="Find device"
                        type="search"
                        variant="outlined"
                        value={searchInput}
                        onChange={(e) => handleSearchInputChange(e)}
                    />
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchParameter}
                        label="Search by"
                        onChange={(e) => handleSearchParameterChange(e)}
                    >
                        {SearchParameters.map((item) => {
                            return <MenuItem value={item.toLowerCase()}>{item}</MenuItem>
                        })}
                    </Select>
                    <Button onClick={() => searchClicked()}>
                        Find
                    </Button>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={10}>
                    <TransferList right={right}
                                  left={left}
                                  checked={checked}
                                  setRight={setRight}
                                  setLeft={setLeft}
                                  setChecked={setChecked}
                    
                    />
                </Grid>
                <Grid item xs={12}>
                    <Divider orientation="horizontal" flexItem />
                </Grid>
                <Grid item xs={2}>
                    Select data
                </Grid>
                <Grid item xs={10}>
                    {/* {right && <DeviceMeasurementTypes devicesXMeasurementTypes={Object.assign({}, devicesXMeasurementTypes)} />} */}
                    <DatasetMeasurementTypes datasetName={"new_set"}/>
                </Grid>
            </Grid>
        </div>
    )
}

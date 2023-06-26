import { Grid, Divider, TextField, MenuItem, Select, Button, InputLabel, OutlinedInput } from '@mui/material'
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
import { DatasetDeviceInfo } from './DatasetDeviceInfo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DownloadNewDataset, DownloadNewDatasetWithMt, GetAllDatasets } from '../../services/datasetService';
import { DatasetMeasurementTypes } from './DatasetMeasurementTypes';
import { DatasetMeasurementTypeDeviceInfo } from './DatasetMeasurementTypeDeviceInfo';


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
    const [datasetSelected, setDatasetSelected] = useState(undefined);
    const [datasetNames, setDatasetNames] = useState([]);
    const [selectedMeasurementType, setSelectedMeasurementType] = useState(undefined);


    useEffect(() => {
        GetAllDatasets().then( res => setDatasetNames(res.data));
    }, [])
    

    useEffect(() => {
      var newDevicesXMeasurementTypes = {};
      right.forEach(device => {
        GetAllMeasurementTypesForDevice(device.id).then(resp => {
            newDevicesXMeasurementTypes[device.name] = resp.data.sort();
        })
      });
      setDevicesXMeasurementTypes(newDevicesXMeasurementTypes);

    }, [right]);

    const handleDatasetInfoSelect = (event) => {
        setDatasetSelected(event.target.value);
    }

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleFilenameInputChange = (event) => {
        setFilenameInput(event.target.value);
    };

    const handleSelectedMTInputChange = (event) => {
        setSelectedMeasurementType(event.target.value);
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
        if (selectedMeasurementType !== '' || selectedMeasurementType !== undefined) {
            DownloadNewDatasetWithMt(filenameInput, dateTimeFrom, dateTimeTo, selectedMeasurementType);
        } else {
            DownloadNewDataset(filenameInput, dateTimeFrom, dateTimeTo);
        }
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
                            id="outlined-mt"
                            label="Measurement type"
                            type="text"
                            variant="outlined"
                            value={selectedMeasurementType}
                            onChange={(e) => handleSelectedMTInputChange(e)}
                        />
                        <TextField
                            id="outlined-filename"
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
                    Dataset information:
                </Grid>
                <Grid item xs={8}>
                    {/* {right && <DeviceMeasurementTypes devicesXMeasurementTypes={Object.assign({}, devicesXMeasurementTypes)} />} */}
                    {datasetSelected && <DatasetMeasurementTypes datasetName={datasetSelected}/>}
                    {datasetSelected && <DatasetDeviceInfo datasetName={datasetSelected} />}     
                    {datasetSelected && <DatasetMeasurementTypeDeviceInfo datasetName={datasetSelected} />}
                </Grid>
                <Grid item xs={2}>
                    <InputLabel id={`dataset-information-label`}>{"Dataset"}</InputLabel>
                    <Select
                        labelId={`dataset-information-label`}
                        id={`dataset-information`}
                        value={datasetSelected}
                        input={<OutlinedInput label={"Dataset"} />}
                        onChange={handleDatasetInfoSelect}
                    >
                        {datasetNames.map((option, idx) => {
                            return <MenuItem value={option} key={`dataset-information-item-${idx}`}>
                                    {option}
                                </MenuItem>
                        })}
                    </Select>
                </Grid>
            </Grid>
        </div>
    )
}

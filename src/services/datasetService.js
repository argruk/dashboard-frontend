import axios from "axios";
import { URL } from "../constants/urls";

export function GetAllDatasets(){
    return axios.get(`${URL.LOCAL_BACKEND}/dataset/all`)
}

export function DownloadNewDataset(filename, dateFrom, dateTo){
    return axios.post(`${URL.LOCAL_BACKEND}/jobs/new/dataset`, {
        "filename": filename,
        "date_from": dateFrom.toISOString().slice(0,-5)+"Z",
        "date_to": dateTo.toISOString().slice(0,-5)+"Z"
    })
}

export function GetDatasetSample(datasetName){
    return axios.get(`${URL.LOCAL_BACKEND}/dataset/sample?dataset_name=${datasetName}`)
}
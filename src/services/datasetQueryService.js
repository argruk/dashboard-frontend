import axios from "axios";
import { URL } from "../constants/urls";
import { replaceSpecialCharacters } from "../helpers/EncodingHelpers";

export function GetDatasetGroupedBy(datasetName, columnName, groupType){
    return axios.get(`${URL.LOCAL_BACKEND}/dataset/transform/group?dataset_name=${datasetName}&column_name=${columnName}${(groupType !== undefined)? `&group_type=${groupType}` : ""}`)
}

export function GetDatasetWindowGroupedBy(datasetName, groupType, measurementType, window="1min"){
    console.log(window);
    return axios.get(`${URL.LOCAL_BACKEND}/dataset/transform/window?dataset_name=${datasetName}&group_type=${groupType}&window=${window}&measurement_type=${measurementType}`)
}
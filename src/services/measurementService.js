import axios from "axios";
import { URL } from "../constants/urls";

export function GetAllMeasurements(deviceId){
    return axios.get(`${URL.LOCAL_BACKEND}/devices/${deviceId}/measurements`)
}

export function GetAllMeasurementsWithParams(deviceId, type, pageSize){
    return axios.get(`${URL.LOCAL_BACKEND}/devices/${deviceId}/measurements?type=${type}&pageSize=${pageSize}`)
}

export function GetAllMeasurementTypesForDevice(deviceId){
    return axios.get(`${URL.LOCAL_BACKEND}/devices/${deviceId}/measurements/types`)
}
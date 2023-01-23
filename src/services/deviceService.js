import axios from "axios";
import { URL } from "../constants/urls";

export function GetAllDevices(){
    return axios.get(`${URL.LOCAL_BACKEND}/devices`)
}

export function GetSingleDevice(id){
    return axios.get(`${URL.LOCAL_BACKEND}/devices/${id}`)
}

export function GetSingleDeviceChildren(id){
    return axios.get(`${URL.LOCAL_BACKEND}/devices/${id}/children`)
}
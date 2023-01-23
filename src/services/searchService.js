import axios from "axios";
import { URL } from "../constants/urls";

export function FindDeviceByName(name){
    return axios.get(`${URL.LOCAL_BACKEND}/search/devices?type=name&name=${name}`)
}

export function FindDeviceById(id){
    return axios.get(`${URL.LOCAL_BACKEND}/search/devices?type=id&id=${id}`)
}
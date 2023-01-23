import axios from "axios";
import { URL } from "../constants/urls";

export function GetAllDatasets(){
    return axios.get(`${URL.LOCAL_BACKEND}/dataset/all`)
}
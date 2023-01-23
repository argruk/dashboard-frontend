import axios from "axios";
import { URL } from "../constants/urls";

export function GetAllAlgorithms(){
    return axios.get(`${URL.LOCAL_BACKEND}/algorithms`)
}

export function GetAlgorithmParameters(algorithmName){
    return axios.get(`${URL.LOCAL_BACKEND}/algorithms/parameters?algorithm_name=${algorithmName}`)
}
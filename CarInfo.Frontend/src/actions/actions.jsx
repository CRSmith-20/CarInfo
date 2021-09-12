import axios from 'axios';
import React from 'react';

const GET_AVAILABLE_MAKES = process.env.REACT_APP_API_BASE_URL + '/make'
const GET_MODELS_FOR_MAKES = process.env.REACT_APP_API_BASE_URL + '/models/'
const GET_YEARS_FOR_MODEL = process.env.REACT_APP_API_BASE_URL + '/years/'
const GET_CAR_DETAILS = process.env.REACT_APP_API_BASE_URL + '/details/'

export async function getAvailableMakes() {
    var data = await axios.get(GET_AVAILABLE_MAKES).then(
        response => {
            return response.data;
        }
    )
    .catch(error => "API Request failed with: " + error);

    
    return data;
}

export async function getModelsForMake(maker) {
    var data = await axios.get(GET_MODELS_FOR_MAKES + maker).then(
        response => {
            return response.data
        }
    );

    return data;
}

export async function getYearsForModel(model) {
    var data = await axios.get(GET_YEARS_FOR_MODEL + model).then(
        response => {
            let yearsWithId = []
            response.data.map(function(pair) {
                yearsWithId.push({ID: pair["ID"], "Year": pair["Year"]});
            })
            return yearsWithId
        }
    );

    return data;
}

export async function getCarDetails(id) {
    var data = await axios.get(GET_CAR_DETAILS + id).then(
        response => {
            let carInfo = {}
            let engineData = []

            response.data.map(function(details) {
                if(Object.keys(carInfo).length == 0){
                    carInfo = {Drive: details["Drive"], Transmission: details["Transmission"]}
                }

                engineData.push({Style: details["EngineStyle"], Horsepower: details["Horsepower"], Rpm: details["EngineRpm"], CityMPG: details["CityMpg"], HighwayMPG: details["HighwayMpg"]})
            })
            return {CarInfo: carInfo, EngineData: engineData}
        }
    );
    return data;
}

export default getAvailableMakes;
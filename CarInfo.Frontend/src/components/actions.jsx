import axios from 'axios';
import React from 'react';

const GET_AVAILABLE_MAKES = process.env.REACT_APP_API_BASE_URL + '/make'
const GET_MODELS_FOR_MAKES = process.env.REACT_APP_API_BASE_URL + '/model/'
const GET_YEARS_FOR_MODEL = process.env.REACT_APP_API_BASE_URL + '/years/'

export async function getAvailableMakes() {
    var data = await axios.get(GET_AVAILABLE_MAKES).then(
        response => {
            console.log(response);
            return { makes: response.data };
        }
    );
    
    return data;
}

export async function getModelsForMake(maker) {
    var data = await axios.get(GET_MODELS_FOR_MAKES + maker).then(
        response => {
            return { models: response.data}
        }
    );

    return data;
}

export async function getYearsForModel(model) {
    var data = await axios.get(GET_YEARS_FOR_MODEL + model).then(
        response => {
            console.log(response.data)
            let x = []
            response.data.map(function(pair) {
                console.log();
                x.push({ID: pair["ID"], "Year": pair["Year"]});
            })
            console.log(x);
            return {years: x}
        }
    );

    return data;
}
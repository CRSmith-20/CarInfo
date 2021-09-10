import axios from 'axios';
import React from 'react';

const GET_AVAILABLE_MAKES = process.env.REACT_APP_API_BASE_URL + '/make'
const GET_MODELS_FOR_MAKES = process.env.REACT_APP_API_BASE_URL + '/model/'

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
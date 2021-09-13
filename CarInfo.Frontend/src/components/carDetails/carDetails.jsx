import React, {useEffect, useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { getCarDetails } from '../../actions/actions.jsx';
import ErrorDisplay from '../errorDisplay/errorDisplay.jsx';


function CarDetails(props, state) {
    const [currentModel] = useState(props.match.params.model)
    const [currentYear] = useState(props.match.params.year)
    const [carId] = useState(props.match.params.id);
    const [carInfo, setCarInfo] = useState([]);
    const [engineData, setEngineData] = useState([]);
    const [errorState, setError] = useState([]);

    useEffect(() => {getCarDetails(carId).then(response => {
            if(response.CarInfo === undefined || response.EngineData === undefined){
                setError(response)
            }
            setCarInfo(response.CarInfo);
            setEngineData(response.EngineData);
        })
    }, [])

    if(errorState.length > 0){
        return(<ErrorDisplay title={"Details for " + currentYear + " " + currentModel}></ErrorDisplay>);
    }

    if(engineData.length == 0){
        return(<div>loading...</div>)
    }

    return (
    <div className="container">
        <h1 style={{textAlign: 'center'}}>Details for {currentYear + " " + currentModel}</h1>
        <div style={{textAlign: 'center'}}>    
            <h5 style={{fontWeight:'bold'}}>Drive: {carInfo.Drive}</h5>
            <h5 style={{fontWeight:'bold'}}>Transmission: {carInfo.Transmission}</h5>
        </div>

        <div className="d-flex flex-wrap justify-content-left">
            {engineData.map((engine, index) => {
                return(
                    <div className="col-6 mt-2" key={index}>
                        <h3 style={{textDecoration:'underline'}}>{engine.Style}</h3>
                        <ul id={"engine" + index}>
                            <li>Horsepower: {engine.Horsepower}</li>
                            <li>RPM: {engine.Rpm}</li>
                            <li>City MPG: {engine.CityMPG}</li>
                            <li>Highway MPG: {engine.HighwayMPG}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
        <button type="button" className="mt-3 btn btn-secondary" onClick={props.history.goBack}>Return to Years</button>
    </div>);
}

export default CarDetails;
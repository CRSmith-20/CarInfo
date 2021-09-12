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
        console.log(response);
            if(response.CarInfo === undefined || response.EngineData === undefined){
                setError(response)
            }
            setCarInfo(response.CarInfo);
            setEngineData(response.EngineData);
        })
    }, [])

    console.log(errorState);
    if(errorState.length > 0){
        return(<ErrorDisplay title={"Details for " + currentYear + " " + currentModel}></ErrorDisplay>);
    }

    if(engineData.length == 0){
        return(<div>loading...</div>)
    }

    return (
    <div>
        <h1 style={{textAlign: 'center'}}>Details for {currentYear + " " + currentModel}</h1>

        <ul>
            <li>{carInfo.Drive}</li>
            <li>{carInfo.Transmission}</li>
        </ul>
        <div>
            {engineData.map((engine, index) => {
                return(
                    <div>
                        <h3>{engine.Style}</h3>
                        <ul>
                            <li>Horsepower: {engine.Horsepower}</li>
                            <li>RPM: {engine.Rpm}</li>
                            <li>City MPG: {engine.CityMPG}</li>
                            <li>Highway MPG: {engine.HighwayMPG}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
        <button onClick={props.history.goBack}>Return to Years</button>
    </div>);
}

export default CarDetails;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getModelsForMake } from '../../actions/actions.jsx';
import ErrorDisplay from '../errorDisplay/errorDisplay.jsx';


function CarModels(props){
    const [make] = useState(props.match.params.make);
    const [models, setModels] = useState([]);

    useEffect(() => {
        getModelsForMake(make).then(results => {
            setModels(results);
        })
    }, [])

    if(models[0] == "Error"){
        return(<ErrorDisplay title="Select Model"></ErrorDisplay>);
    }

    if(models.length == 0){
        return(<div>loading...</div>)
    }

    return (   
        <div>
            <div>
            {models.map(item => {
                return(
                    <div key={item}>
                        <Link to={"/model/" + item}>{item}</Link> 
                    </div>);
                })
            }
            </div>
            <button onClick={props.history.goBack}>Return to Makes</button>
        </div>
    )
}

export default CarModels;
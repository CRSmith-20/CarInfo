import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getModelsForMake } from '../../actions/actions.jsx';
import { Alert } from 'react-bootstrap'


function CarModels(props){
    const [make] = useState(props.match.params.make);
    const [models, setModels] = useState([]);

    useEffect(() => {
        getModelsForMake(make).then(results => {
            setModels(results);
        })
    }, [])

    if(models[0] == "Error"){
        return(<div>
            <h1 style={{textAlign: 'center'}}>Select Model</h1>
            <Alert key="error" variant={'warning'} style={{textAlign: 'center'}}>An error has occurred while loading, please refresh and try again.</Alert>
            
        </div>)
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
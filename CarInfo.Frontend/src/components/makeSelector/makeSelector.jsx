import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getAvailableMakes } from '../../actions/actions.jsx';
import { Alert } from 'react-bootstrap'
import ErrorDisplay from '../errorDisplay/errorDisplay.jsx';

function MakeSelector(props) {
    const [makes, setMakes] = useState([]);

    useEffect(() => {
        getAvailableMakes().then(response => {
            setMakes(response)
        })
    }, [])

    if(makes[0] == "Error"){
        return(<ErrorDisplay title="Select Make"></ErrorDisplay>);
    }

    if(makes.length == 0){
        return(<div>loading...</div>)
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Select Make</h1>

            {makes.map(item => {
                return(
                <div style={{display: 'inline-block', maxHeight: '500px', maxWidth: '500px'}} key={item}>
                    <Link to={"/" + item}>
                        <img style={{maxWidth: "500px", maxHeight: '500px'}} src={process.env.PUBLIC_URL + '/MakerImages/' + item + '.png'}></img>    
                    </Link>
                </div>);
            })}
        </div>
    )
}

export default MakeSelector
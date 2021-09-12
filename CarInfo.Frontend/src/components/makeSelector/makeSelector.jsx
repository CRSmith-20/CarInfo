import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getAvailableMakes } from '../../actions/actions.jsx';
import { Alert } from 'react-bootstrap'

function MakeSelector(props) {
    const [makes, setMakes] = useState([]);

    useEffect(() => {
        getAvailableMakes().then(response => {
            setMakes(response)
        })
    }, [])

    if(makes[0] == "Error"){
        return(<div>
            <h1 style={{textAlign: 'center'}}>Select Make</h1>
            <Alert key="error" variant={'warning'} style={{textAlign: 'center'}}>An error has occurred while loading, please refresh and try again.</Alert>
            
        </div>)
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
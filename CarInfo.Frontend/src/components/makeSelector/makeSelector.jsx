import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getAvailableMakes } from '../../actions/actions.jsx';

function MakeSelector(props) {
    const [makes, setMakes] = useState(new Array());

    useEffect(() => {
        getAvailableMakes().then(response => {
            setMakes(response)
        })
    }, [])

    if(makes === []){
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
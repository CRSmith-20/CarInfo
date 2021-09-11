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
            {makes.map(item => {
                return(
                <div key={item}>
                    <Link to={"/models/" + item}>{item}</Link>
                </div>);
            })}
        </div>
    )
}

export default MakeSelector
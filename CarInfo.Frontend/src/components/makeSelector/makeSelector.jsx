import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { getAvailableMakes } from '../../actions/actions.jsx';
import ErrorDisplay from '../errorDisplay/errorDisplay.jsx';

function MakeSelector(props) {
    const [makes, setMakes] = useState([]);

    useEffect(() => {
        getAvailableMakes().then(response => {
            setMakes(response)
        })
    }, [])

    if (makes !== undefined && makes[0] == "Error") {
        return (<ErrorDisplay title="Select Make"></ErrorDisplay>);
    }

    if (makes.length == 0) {
        return (<div>loading...</div>)
    }

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>Select Make</h1>
            <div className="d-flex flex-wrap justify-content-center">
                {makes.map(item => {
                    return (
                        <div className="d-flex col-3 mt-1 mb-1 justify-content-center" key={item}>
                            <Link to={"/" + item}>
                                <img style={{ width: "100%", height: "100%" }} src={process.env.PUBLIC_URL + '/MakerImages/' + item + '.png'}></img>
                            </Link>
                        </div>);
                })}
            </div>

        </div>
    )
}

export default MakeSelector
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getModelsForMake } from '../../actions/actions.jsx';
import ErrorDisplay from '../errorDisplay/errorDisplay.jsx';


function CarModels(props) {
    const [make] = useState(props.match.params.make);
    const [models, setModels] = useState([]);

    useEffect(() => {
        getModelsForMake(make).then(results => {
            setModels(results);
        })
    }, [])

    if (models[0] == "Error") {
        return (<ErrorDisplay title="Select Model"></ErrorDisplay>);
    }

    if (models.length == 0) {
        return (<div>loading...</div>)
    }

    return (
        <div className="container">
            <h1 style={{ textAlign: "center" }}> Select Model </h1>
            <div >
                <div className="d-flex flex-wrap justify-content-center">
                    {models.map(item => {
                        return (
                            <div className="col-4 text-center" key={item}>
                                <Link type="button" className="btn btn-lg btn-primary" to={"/model/" + item}>{item}</Link>
                            </div>);
                    })
                    }
                </div>
            </div>
            <button type="button" className="mt-3 btn btn-secondary" onClick={props.history.goBack}>Return to Makes</button>
        </div>
    )
}

export default CarModels;
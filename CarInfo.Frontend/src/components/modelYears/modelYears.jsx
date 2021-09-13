import { useState, useEffect } from 'react';
import { getYearsForModel } from '../../actions/actions.jsx';
import { Link } from 'react-router-dom';
import ErrorDisplay from '../errorDisplay/errorDisplay.jsx';

function ModelYears(props) {
    const [model] = useState(props.match.params.model)
    const [years, setYears] = useState([])

    useEffect(() => {
        getYearsForModel(model).then(results => {
            setYears(results);
        })
    }, [])

    if (years[0] == "Error") {
        return (<ErrorDisplay title="Select Year"></ErrorDisplay>);
    }

    if (years.length == 0) {
        return (<div>loading...</div>)
    }

    return (
        <div className="container">
            <h1 style={{ textAlign: "center" }}> Select Year </h1>
            <div >
                <div className="d-flex flex-wrap justify-content-center">
                    {years.map(yearWithId => {
                        return (
                            <div className="d-flex col-3 mt-1 mb-1 justify-content-center" key={yearWithId["ID"]}>
                                <Link type="button" className="btn btn-lg btn-primary" to={'/details/' + model + '/' + yearWithId["Year"] + '/' + yearWithId["ID"]}>
                                    {yearWithId["Year"]}
                                </Link>
                            </div>);
                    })}

                </div>
                <button type="button" className="mt-3 btn btn-secondary" onClick={props.history.goBack}>Return to Models</button>
            </div>
        </div>
    )
}

export default ModelYears;
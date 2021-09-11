import React, { useEffect, useState } from 'react';
import { getYearsForModel } from '../../actions/actions.jsx';
import { Link } from 'react-router-dom';

function ModelYears(props) {
    const [model] = useState(props.match.params.model)
    const [years, setYears] = useState([])

    useEffect(() => {
        getYearsForModel(model).then(results => {
            setYears(results);
        })
    }, [])

    return (   
        <div>
            <div>
            {years.map(yearWithId => {
                return(
                <div key={yearWithId["ID"]}>
                    <Link to={'/' + model + '/' + yearWithId["ID"]}>{yearWithId["Year"]}</Link> 
                </div>);
            })}
            </div>
            <Link to="/">Return to Makes</Link>
        </div>
    )
}

export default ModelYears;
import { Component, useState, useEffect } from 'react';
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
                    <Link to={{ pathname:'/details/' + model + '/' + yearWithId["Year"], state: {id: yearWithId["ID"]}}}>
                        {yearWithId["Year"]}
                    </Link> 
                </div>);
            })}

            </div>
            <button onClick={props.history.goBack}>Return to Makes</button>
        </div>
    )
}

export default ModelYears;
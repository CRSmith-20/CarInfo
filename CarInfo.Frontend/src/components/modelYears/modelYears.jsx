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

    if(years[0] == "Error"){
        return(<ErrorDisplay title="Select Year"></ErrorDisplay>);
    }

    if(years.length == 0){
        return(<div>loading...</div>)
    }

    return (   
        <div>
            <div>
            {years.map(yearWithId => {
                return(
                <div key={yearWithId["ID"]}>
                    <Link to={'/details/' + model + '/' + yearWithId["Year"] + '/' + yearWithId["ID"]}>
                        {yearWithId["Year"]}
                    </Link> 
                </div>);
            })}

            </div>
            <button onClick={props.history.goBack}>Return to Models</button>
        </div>
    )
}

export default ModelYears;
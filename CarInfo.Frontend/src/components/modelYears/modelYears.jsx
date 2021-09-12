import { useState, useEffect } from 'react';
import { getYearsForModel } from '../../actions/actions.jsx';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap'

function ModelYears(props) {
    const [model] = useState(props.match.params.model)
    const [years, setYears] = useState([])

    useEffect(() => {
        getYearsForModel(model).then(results => {
            setYears(results);
        })
    }, [])

    if(years[0] == "Error"){
        return(<div>
            <h1 style={{textAlign: 'center'}}>Select Years</h1>
            <Alert key="error" variant={'warning'} style={{textAlign: 'center'}}>An error has occurred while loading, please refresh and try again.</Alert>
            
        </div>)
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
            <button onClick={props.history.goBack}>Return to Makes</button>
        </div>
    )
}

export default ModelYears;
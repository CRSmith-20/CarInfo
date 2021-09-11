import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getModelsForMake } from '../../actions/actions.jsx';

function CarModels(props){
    const [make] = useState(props.match.params.make);
    const [models, setModels] = useState([]);

    useEffect(() => {
        getModelsForMake(make).then(results => {
            setModels(results);
        })
    }, [])

    return (   
        <div>
            <div>
            {models.map(item => {
                return(
                    <div key={item}>
                        <a href={"/" + item + "/years/" }>{item}</a> 
                    </div>);
                })
            }
            </div>
            <Link to="/">Return to Makes</Link>
        </div>
    )
}

export default CarModels;
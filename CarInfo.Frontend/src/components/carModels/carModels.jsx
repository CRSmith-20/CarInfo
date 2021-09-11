import { Component } from 'react';
import * as actions from '../../actions/actions.jsx';

class CarModels extends Component {
    constructor(props) {
        super(props);
        this.state = { make: props.match.params.make, models: [] }
    }

    componentDidMount() {
        actions.getModelsForMake(this.state.make).then(results => 
            this.setState(results)
        );
    }

    render() { 
        if(this.state.models === []){
            return(<div>loading...</div>)
        }

        //refactor mapping into shared function
        return (   
            <div>
                <div>
                {this.state.models.map(function(item){
                    return(
                    <div key={item}>
                        <a href={"/years/" + item}>{item}</a> 
                    </div>);
                }.bind(this))}
                </div>
                <a href="/">Return to Makes</a>
            </div>
        )
    }
}

export default CarModels;
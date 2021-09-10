import { Component } from 'react';
import * as actions from '../actions.jsx';

class ModelYears extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { model: props.match.params.model, years: [], activeID: "" }
    }

    componentDidMount() {
        actions.getYearsForModel(this.state.model).then(results => 
            this.setState(results)
        );
    }

    renderCar(id) {
        this.setState({activeID: id});
    }

    render() { 
        if(this.state.years === []){
            return(<div>loading...</div>)
        }

        if(this.state.activeID !== "") {
            //return <CarDetails id=this.state.activeID/>
        }

        return (   
            <div>
                <div>
                {this.state.years.map(function(yearWithId){
                    return(
                    <div key={yearWithId["ID"]}>
                        <a onClick={() => this.renderCar()}>{yearWithId["Year"]}</a> 
                    </div>);
                }.bind(this))}
                </div>
                <a href="/">Return to Makes</a>
            </div>
        )
    }
}

export default ModelYears;
import { Component } from 'react';
import * as actions from '../actions.jsx';

class MakeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = { makes: [] }
    }

    componentDidMount() {
        actions.getAvailableMakes().then(results => 
            this.setState(results)
        );
    }

    render() { 
        if(this.state.makes === []){
            return(<div>loading...</div>)
        }

        return (
            <div>
                {this.state.makes.map(function(item){
                    console.log(this.state);
                    return(
                    <div key={item}>
                        <a  href={"/models/" + item}>{item}</a>
                    </div>);
                }.bind(this))}
            </div>
        )
    }
}

export default MakeSelector;
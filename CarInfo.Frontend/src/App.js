import logo from './logo.svg';
import './App.css';
import MakeSelector from './components/makeSelector/makeSelector';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CarModels from './components/carModels/carModels';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component={MakeSelector}/>
        <Route exact path = "/models/:make" component={CarModels}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

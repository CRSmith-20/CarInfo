import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CarModels from './components/carModels/carModels';
import MakeSelector from './components/makeSelector/makeSelector'
import ModelYears from './components/modelYears/modelYears';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component={MakeSelector}/>
        <Route exact path = "/:make" component={CarModels}/>
        <Route exact path = "/:model/years" component={ModelYears}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

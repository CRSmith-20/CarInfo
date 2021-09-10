import logo from './logo.svg';
import './App.css';
import MakeSelector from './components/makeSelector/makeSelector';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import CarModels from './components/carModels/carModels';
import ModelYears from './components/modelYears/modelYears';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component={MakeSelector}/>
        <Route exact path = "/models/:make" component={CarModels}/>
        <Route exact path = "/years/:model" component={ModelYears}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

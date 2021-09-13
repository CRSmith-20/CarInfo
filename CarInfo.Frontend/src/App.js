import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CarModels from './components/carModels/carModels';
import MakeSelector from './components/makeSelector/makeSelector'
import ModelYears from './components/modelYears/modelYears';
import CarDetails from './components/carDetails/carDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MakeSelector} />
        <Route exact path="/:make" component={CarModels} />
        <Route exact path="/model/:model" component={ModelYears} />
        <Route exact path="/details/:model/:year/:id" component={CarDetails} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

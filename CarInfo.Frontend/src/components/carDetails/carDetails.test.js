import {shallow, mount} from 'enzyme';
import CarDetails from './carDetails';
import axios from "axios";
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import toJson from 'enzyme-to-json';
import { createMemoryHistory } from 'history'
import { getCarDetails } from '../../actions/actions';

jest.mock("../../actions/actions", () => ({getCarDetails: jest.fn()}));

let carInfo;
let engineData;
let match;
let wrapper;
let history;

beforeEach(() => {
    carInfo = {Drive: 'yes', Transmission: "manual"}
    engineData = [
        {Style: "big", Horsepower: 1, Rpm: 3, CityMPG: -1, HighwayMPG: -2},
        {Style: "awfe", Horsepower: 10, Rpm: 123, CityMPG: 59999, HighwayMPG: 5},
        {Style: "zxcvcxz", Horsepower: 100, Rpm: 5432, CityMPG: -2, HighwayMPG: 4},
        {Style: "fewafew", Horsepower: 1000, Rpm: 5555555, CityMPG: -3, HighwayMPG: 6},
    ]

    match = { params: { model: 'Gambino', year: 3005, id: 3 } }

    history = createMemoryHistory();
    history.location.key = 'consistent'; //needed for snapshot as it's unique per run

});

describe('<CarDetails />', () => {
    describe('when component initalizes', () => {
        it('should initalize to loading', () => {
            const test = shallow(<Router><CarDetails /></Router>);
            expect(toJson(test)).toMatchSnapshot();
        });
    });
    
    describe('when component loads', () => {
        it('should render models with links', async () => {
            
            await act(async () => {
                getCarDetails.mockResolvedValueOnce({CarInfo: carInfo, EngineData: engineData});
                wrapper = mount(
                    <Router>
                        <CarDetails history={history} match={match} />
                    </Router>
                );
            });
    
            wrapper.update();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('ul').length).toBe(5);
        })
    });
    
    describe('when the api call fails', () => {
        it('should render a ErrorDisplay', async () => {                      
            await act(async () => {
                getCarDetails.mockImplementationOnce(() => Promise.resolve(["Error", new Error("Generic Failure")]));
                wrapper = mount(<Router><CarDetails history={history} match={match} /></Router>);
            });
    
            wrapper.update();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('ErrorDisplay').length).toBe(1);
        })
    });
})
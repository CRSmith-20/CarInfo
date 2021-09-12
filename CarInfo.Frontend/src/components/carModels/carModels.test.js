import {shallow, mount} from 'enzyme';
import CarModels from './carModels';
import axios from "axios";
import { BrowserRouter as Router } from 'react-router-dom';
import { getModelsForMake } from '../../actions/actions';
import { act } from "react-dom/test-utils";
import toJson from 'enzyme-to-json';
import { createMemoryHistory } from 'history'

jest.mock("../../actions/actions", () => ({getModelsForMake: jest.fn()}));

let models;
let match;
let wrapper;
let history;

beforeEach(() => {
    models =  [
        "Sonata", "Elantra", "Hotel", "Trivago"
    ]
    match = { params: { make: 'Horrible' } }

    history = createMemoryHistory();
    history.location.key = 'consistent'; //needed for snapshot as it's unique per run

});

describe('<CarModels />', () => {
    describe('when component initalizes', () => {
        it('should initalize to loading', () => {
            const test = shallow(<Router><CarModels /></Router>);
            expect(toJson(test)).toMatchSnapshot();
        });
    });
    
    describe('when component loads', () => {
        it('should render models with links', async () => {
            
            await act(async () => {
                getModelsForMake.mockResolvedValueOnce(models);
                wrapper = mount(
                    <Router>
                        <CarModels history={history} match={match} />
                    </Router>
                );
            });
    
            wrapper.update();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('Link').length).toBe(4);
        })
    });
    
    describe('when the api call fails', () => {
        it('should render a ErrorDisplay', async () => {                      
            await act(async () => {
                getModelsForMake.mockImplementationOnce(() => Promise.resolve(["Error", new Error("Generic Failure")]));
                wrapper = mount(<Router><CarModels history={history} match={match} /></Router>);
            });
    
            wrapper.update();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('ErrorDisplay').length).toBe(1);
        })
    });
})
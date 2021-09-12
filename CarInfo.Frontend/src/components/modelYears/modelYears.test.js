import {shallow, mount} from 'enzyme';
import ModelYears from './modelYears';
import axios from "axios";
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import toJson from 'enzyme-to-json';
import { createMemoryHistory } from 'history'

jest.mock("axios");

let formattedPairs;
let match;
let wrapper;
let history;

beforeEach(() => {
    formattedPairs = [
        {ID: 1, Year: 1990}, {ID: 2, Year: 2220}, {ID: 3, Year: 3330}
    ]
    match = { params: { model: 'Test' } }

    history = createMemoryHistory();
    history.location.key = 'consistent'; //needed for snapshot as it's unique per run

});

describe('<ModelYears />', () => {
    describe('when component initalizes', () => {
        it('should initalize to loading', () => {
            const test = shallow(<Router><ModelYears /></Router>);
            expect(toJson(test)).toMatchSnapshot();
        });
    });
    
    describe('when component loads', () => {
        it('should render makes with links', async () => {
            
            
            await act(async () => {
                axios.get.mockResolvedValueOnce({data: formattedPairs});
                wrapper = mount(
                    <Router>
                        <ModelYears history={history} match={match} />
                    </Router>
                );
            });
    
            wrapper.update();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('Link').length).toBe(3);
        })
    });
    
    describe('when api calls fail', () => {
        it('should render a ErrorDisplay', async () => {                      
            await act(async () => {
                axios.get.mockRejectedValueOnce(new Error("Generic Failure"));
                wrapper = mount(<Router><ModelYears history={history} match={match} /></Router>);
            });
    
            wrapper.update();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('ErrorDisplay').length).toBe(1);
        })
    });
})
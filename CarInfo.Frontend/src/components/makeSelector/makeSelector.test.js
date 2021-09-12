import {shallow, mount} from 'enzyme';
import MakeSelector from './makeSelector';
import axios from "axios";
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import toJson from 'enzyme-to-json';

jest.mock("axios");


describe('<MakeSelector />', () => {
    describe('when component initalizes', () => {
        it('should initalize to loading', () => {
            const test = shallow(<Router><MakeSelector /></Router>);
            expect(toJson(test)).toMatchSnapshot();
        });
    });
    
    describe('when component loads', () => {
        it('should render makes with images', async () => {
            const makes = [
                "Hyundai", "Ford"
            ]
            
            let wrapper;
            
            await act(async () => {
                axios.get.mockResolvedValueOnce({data: makes});
                wrapper = mount(<Router><MakeSelector /></Router>);
            });
    
            wrapper.update();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('Link').length).toBe(2);
        })
    });
    
    describe('when component loads', () => {
        it('should render makes with images', async () => {          
            let wrapper;
            
            await act(async () => {
                axios.get.mockRejectedValueOnce(new Error("Generic Failure"));
                wrapper = mount(<Router><MakeSelector /></Router>);
            });
    
            wrapper.update();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('ErrorDisplay').length).toBe(1);
        })
    });
})
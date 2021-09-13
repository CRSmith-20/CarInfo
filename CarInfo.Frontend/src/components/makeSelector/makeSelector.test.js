import { shallow, mount } from 'enzyme';
import MakeSelector from './makeSelector';
import { getAvailableMakes } from '../../actions/actions';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import toJson from 'enzyme-to-json';

jest.mock("../../actions/actions", () => ({ getAvailableMakes: jest.fn() }));

let makes;
let wrapper;

beforeEach(() => {
    makes = [
        "Hyundai", "Ford"
    ]
})

describe('<MakeSelector />', () => {
    describe('when component initalizes', () => {
        it('should initalize to loading', () => {
            const test = shallow(<Router><MakeSelector /></Router>);
            expect(toJson(test)).toMatchSnapshot();
        });
    });

    describe('when component loads', () => {
        it('should render makes with images', async () => {
            getAvailableMakes.mockImplementationOnce(() => Promise.resolve(makes));

            await act(async () => {
                wrapper = mount(<Router><MakeSelector /></Router>);
            });

            wrapper.update();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('Link').length).toBe(2);
        })
    });

    describe('when the api call fails', () => {
        it('should render a ErrorDisplay', async () => {
            getAvailableMakes.mockImplementationOnce(() => Promise.resolve(["Error", new Error("Generic Failure")]));

            await act(async () => {
                wrapper = mount(<Router><MakeSelector /></Router>);
            });

            wrapper.update();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('ErrorDisplay').length).toBe(1);
        })
    });
})
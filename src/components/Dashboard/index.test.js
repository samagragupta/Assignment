import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Dashboard from '.';
import { render } from '@testing-library/react';
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();
const store = mockStore({});

configure({ adapter: new Adapter() });

describe("Dashboard", () => {
    it("should render my Dashboard", () => {
        render(<Provider store={store}>
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        </Provider>)
        // const wrapper = shallow(<Dashboard />);
    });
});
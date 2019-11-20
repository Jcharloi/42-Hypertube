
import * as React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import EnzymeToJson from 'enzyme-to-json';
import { mount, configure } from 'enzyme';

import App from "../components/App";

configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders correctly', () => {
    const domNode = mount(<App />);
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });
});

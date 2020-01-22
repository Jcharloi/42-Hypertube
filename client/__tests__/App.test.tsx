import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";

import App from "../components/App";

import { UseApiReturn, ApiAuthResponse } from "../models/models";

configure({ adapter: new Adapter() });

jest.mock("../hooks/useApi", () => (): UseApiReturn<
  ApiAuthResponse,
  ApiAuthResponse
> => ({
  data: { validToken: true },
  loading: false,
  error: null
}));

describe("App", () => {
  it("renders correctly", () => {
    const domNode = mount(<App />);
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });
});

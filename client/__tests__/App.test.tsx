import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import App from "../components/App";

import { UseApiReturn, ApiAuthResponse } from "../models/models";

configure({ adapter: new Adapter() });

// `loading: true` to avoid mounting all <Home> or <SignIn> component
jest.mock("../hooks/useApi", () => (): UseApiReturn<
  ApiAuthResponse,
  ApiAuthResponse
> => ({
  callApi: jest.fn(),
  loading: true,
  res: null,
  resData: null,
  error: null,
  setUrl: jest.fn(),
  setMethod: jest.fn(),
  setHeaders: jest.fn(),
  setData: jest.fn(),
  cancelAllRequests: jest.fn()
}));

jest.mock("../helpers/history", () => {
  // require after code makes the disable required
  // eslint-disable-next-line
  const { createBrowserHistory } = require("history");

  const history = createBrowserHistory({
    keyLength: 0
  });

  return history;
});

describe("App", () => {
  it("renders correctly", () => {
    const domNode = mount(<App />);
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });
});

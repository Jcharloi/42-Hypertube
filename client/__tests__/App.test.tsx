import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import App from "../components/App";

configure({ adapter: new Adapter() });

jest.mock("../helpers/history", () => {
  // eslint-disable-next-line
  const { createBrowserHistory } = require("history");

  const history = createBrowserHistory({
    keyLength: 0
  });

  return history;
});

describe("App", () => {
  it("renders correctly", async () => {
    const domNode = mount(<App />);
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });
});

import React from "react";
import EnzymeToJson from "enzyme-to-json";
import { History, Location, LocationState } from "history";
import { StaticRouter } from "react-router-dom";

import { mountWithIntl } from "./helpers/intl-enzyme-test-helper";
import SignIn from "../components/Authentication/SignIn";
import { checkErrors } from "../components/Authentication/SignIn.service";
import { requiredErrorKey } from "../components/Authentication/errorKey";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: (): History<LocationState> => ({
    length: null,
    action: null,
    location: null,
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    goBack: jest.fn(),
    goForward: jest.fn(),
    block: jest.fn(),
    listen: jest.fn(),
    createHref: jest.fn()
  }),
  useLocation: (): Location<LocationState> => ({
    pathname: "/",
    search: "",
    state: { from: "/" },
    hash: null
  })
}));

describe("SignIn", () => {
  it("should render <SignIn> in english", () => {
    const domNode = mountWithIntl(
      <StaticRouter>
        <SignIn />
      </StaticRouter>,
      "en"
    );
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("should render <SignIn> in french", () => {
    const domNode = mountWithIntl(
      <StaticRouter>
        <SignIn />
      </StaticRouter>,
      "fr"
    );
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("should return the good error key", () => {
    // No Username
    expect(checkErrors({ username: "", password: "Password1" })).toEqual({
      username: requiredErrorKey,
      password: ""
    });

    // No Password
    expect(checkErrors({ username: "Toto", password: "" })).toEqual({
      username: "",
      password: requiredErrorKey
    });

    // No Username and Password
    expect(checkErrors({ username: "", password: "" })).toEqual({
      username: requiredErrorKey,
      password: requiredErrorKey
    });

    expect(checkErrors({ username: "Toto", password: "Password1" })).toEqual({
      username: "",
      password: ""
    });
  });
});

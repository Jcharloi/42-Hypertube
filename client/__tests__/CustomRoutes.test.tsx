import React, { ReactElement } from "react";
import renderer from "react-test-renderer";
import { Route, MemoryRouter } from "react-router-dom";

import CustomRoute from "../components/Routes/CustomRoute";

import useApi from "../hooks/useApi";
import { UseApiReturn, ApiAuthResponse } from "../models/models";

jest.mock("../hooks/useApi", () => jest.fn());

const mockUseApi = useApi as jest.Mock<
  UseApiReturn<ApiAuthResponse, ApiAuthResponse>
>;

const basicUseApiValue: UseApiReturn<ApiAuthResponse, ApiAuthResponse> = {
  callApi: jest.fn(),
  loading: false,
  res: null,
  resData: null,
  error: null,
  setUrl: jest.fn(),
  setMethod: jest.fn(),
  setHeaders: jest.fn(),
  setData: jest.fn(),
  cancelAllRequests: jest.fn()
};

interface Props {
  children: ReactElement;
}

const MockRouter = ({ children }: Props): ReactElement => {
  return (
    <MemoryRouter initialEntries={["/test"]}>
      {children}

      <Route exact path="/">
        <div>Home/Login</div>
      </Route>
    </MemoryRouter>
  );
};

describe("CustomRoute", () => {
  it("Is connected, private route : should show div", () => {
    mockUseApi.mockImplementation(() => ({
      ...basicUseApiValue,
      resData: { validToken: true }
    }));
    const domNode = (
      <MockRouter>
        <CustomRoute
          path="/test"
          exact
          authComponent={(): ReactElement => <div>Should be shown</div>}
        />
      </MockRouter>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Is connected, public route : should redirect to Home/Login", () => {
    mockUseApi.mockImplementation(() => ({
      ...basicUseApiValue,
      resData: { validToken: true }
    }));
    const domNode = (
      <MockRouter>
        <CustomRoute
          path="/test"
          exact
          notAuthComponent={(): ReactElement => <div>Should NOT be shown</div>}
        />
      </MockRouter>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Is not connected, private route : should redirect to Home/Login", () => {
    mockUseApi.mockImplementation(() => ({
      ...basicUseApiValue,
      resData: { validToken: false }
    }));
    const domNode = (
      <MockRouter>
        <CustomRoute
          path="/test"
          exact
          authComponent={(): ReactElement => <div>Should NOT be shown</div>}
        />
      </MockRouter>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Is not connected, public route : should show div", () => {
    mockUseApi.mockImplementation(() => ({
      ...basicUseApiValue,
      resData: { validToken: false }
    }));
    const domNode = (
      <MockRouter>
        <CustomRoute
          path="/test"
          exact
          notAuthComponent={(): ReactElement => <div>Should be shown</div>}
        />
      </MockRouter>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Is connected, public/private route : should show private", () => {
    mockUseApi.mockImplementation(() => ({
      ...basicUseApiValue,
      resData: { validToken: true }
    }));
    const domNode = (
      <MockRouter>
        <CustomRoute
          path="/test"
          exact
          notAuthComponent={(): ReactElement => <div>Public component</div>}
          authComponent={(): ReactElement => <div>Private component</div>}
        />
      </MockRouter>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Is not connected, public/private route : should show public", () => {
    mockUseApi.mockImplementation(() => ({
      ...basicUseApiValue,
      resData: { validToken: false }
    }));
    const domNode = (
      <MockRouter>
        <CustomRoute
          path="/test"
          exact
          notAuthComponent={(): ReactElement => <div>Public component</div>}
          authComponent={(): ReactElement => <div>Private component</div>}
        />
      </MockRouter>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Loading", () => {
    mockUseApi.mockImplementation(() => ({
      ...basicUseApiValue,
      loading: true
    }));
    const domNode = (
      <MockRouter>
        <CustomRoute
          path="/test"
          exact
          notAuthComponent={(): ReactElement => <div>Loading</div>}
        />
      </MockRouter>
    );
    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Error", () => {
    mockUseApi.mockImplementation(() => ({
      ...basicUseApiValue,
      error: {
        response: {
          data: { validToken: false },
          status: 500,
          statusText: "",
          headers: null,
          config: null
        },
        config: null,
        name: null,
        message: null,
        isAxiosError: true,
        toJSON: null
      }
    }));
    const domNode = (
      <MockRouter>
        <CustomRoute
          path="/test"
          exact
          notAuthComponent={(): ReactElement => <div>Should NOT be shown</div>}
        />
      </MockRouter>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });
});

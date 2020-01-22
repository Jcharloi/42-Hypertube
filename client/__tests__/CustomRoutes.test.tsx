import React, { ReactElement } from "react";
import renderer from "react-test-renderer";
import { Router } from "react-router-dom";

import CustomRoute from "../components/Routes/CustomRoute";
import history from "../helpers/history";

import useApi from "../hooks/useApi";
import { UseApiReturn, ApiAuthResponse } from "../models/models";

jest.mock("../hooks/useApi", () => jest.fn());

const mockUseApi = useApi as jest.Mock<
  UseApiReturn<ApiAuthResponse, ApiAuthResponse>
>;

interface Props {
  children: ReactElement;
}

const MockComponent = ({ children }: Props): ReactElement => (
  <Router history={history}>{children}</Router>
);

describe("CustomRoute", () => {
  it("Is connected, private route : should show div", () => {
    mockUseApi.mockImplementation(() => ({
      setUrl: jest.fn(),
      loading: false,
      error: null,
      data: { validToken: true }
    }));
    const domNode = (
      <MockComponent>
        <CustomRoute
          authComponent={(): ReactElement => <div>Should be shown</div>}
        />
      </MockComponent>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Is connected, public route : should NOT show div", () => {
    mockUseApi.mockImplementation(() => ({
      setUrl: jest.fn(),
      loading: false,
      error: null,
      data: { validToken: true }
    }));
    const domNode = (
      <MockComponent>
        <CustomRoute
          notAuthComponent={(): ReactElement => <div>Should NOT be shown</div>}
        />
      </MockComponent>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Is not connected, private route : should NOT show div", () => {
    mockUseApi.mockImplementation(() => ({
      setUrl: jest.fn(),
      loading: false,
      error: null,
      data: { validToken: false }
    }));
    const domNode = (
      <MockComponent>
        <CustomRoute
          authComponent={(): ReactElement => <div>Should NOT be shown</div>}
        />
      </MockComponent>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Is not connected, public route : should show div", () => {
    mockUseApi.mockImplementation(() => ({
      setUrl: jest.fn(),
      loading: false,
      error: null,
      data: { validToken: false }
    }));
    const domNode = (
      <MockComponent>
        <CustomRoute
          notAuthComponent={(): ReactElement => <div>Should be shown</div>}
        />
      </MockComponent>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Loading", () => {
    mockUseApi.mockImplementation(() => ({
      setUrl: jest.fn(),
      loading: true,
      error: null,
      data: null
    }));
    const domNode = (
      <MockComponent>
        <CustomRoute
          exact
          notAuthComponent={(): ReactElement => <div>Loading</div>}
          path="/"
        />
      </MockComponent>
    );
    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Error", () => {
    mockUseApi.mockImplementation(() => ({
      setUrl: jest.fn(),
      loading: false,
      error: {
        response: {
          data: { validToken: true },
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
      },
      data: { validToken: true }
    }));
    const domNode = (
      <MockComponent>
        <CustomRoute
          exact
          notAuthComponent={(): ReactElement => <div>Error</div>}
          path="/"
        />
      </MockComponent>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });
});

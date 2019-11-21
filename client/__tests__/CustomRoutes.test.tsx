import React, { ReactElement } from "react";
import renderer from "react-test-renderer";
import { Router } from "react-router-dom";

import CustomRoute from "../components/Routes/CustomRoute";
import history from "../helpers/history";

interface Props {
  children: ReactElement;
}

const MockComponent = ({ children }: Props): ReactElement => (
  <Router history={history}>{children}</Router>
);

describe("CustomRoute", () => {
  it("Is connected, private route : should show div", () => {
    const domNode = (
      <MockComponent>
        <CustomRoute
          requireAuth
          component={(): ReactElement => <div>Should be shown</div>}
          fixture={{ loading: false, error: null, data: { validToken: true } }}
        />
      </MockComponent>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Is connected, public route : should NOT show div", () => {
    const domNode = (
      <MockComponent>
        <CustomRoute
          requireAuth={false}
          component={(): ReactElement => <div>Should NOT be shown</div>}
          fixture={{ loading: false, error: null, data: { validToken: true } }}
        />
      </MockComponent>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Is not connected, private route : should NOT show div", () => {
    const domNode = (
      <MockComponent>
        <CustomRoute
          requireAuth
          component={(): ReactElement => <div>Should NOT be shown</div>}
          fixture={{ loading: false, error: null, data: { validToken: false } }}
        />
      </MockComponent>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Is not connected, public route : should show div", () => {
    const domNode = (
      <MockComponent>
        <CustomRoute
          requireAuth={false}
          component={(): ReactElement => <div>Should be shown</div>}
          fixture={{ loading: false, error: null, data: { validToken: false } }}
        />
      </MockComponent>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Loading", () => {
    const domNode = (
      <MockComponent>
        <CustomRoute
          exact
          component={(): ReactElement => <div>Loading</div>}
          requireAuth={false}
          path="/"
          fixture={{
            loading: true,
            error: null,
            data: { validToken: true }
          }}
        />
      </MockComponent>
    );
    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });

  it("Error", () => {
    const domNode = (
      <MockComponent>
        <CustomRoute
          exact
          component={(): ReactElement => <div>Error</div>}
          requireAuth={false}
          path="/"
          fixture={{
            loading: false,
            error: {
              error: true
            },
            data: { validToken: true }
          }}
        />
      </MockComponent>
    );

    const tree = renderer.create(domNode);
    tree.update(domNode);
    expect(tree).toMatchSnapshot();
  });
});

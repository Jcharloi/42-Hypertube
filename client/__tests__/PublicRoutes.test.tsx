import React, { ReactElement } from 'react';
import renderer from 'react-test-renderer';
import { Router } from 'react-router-dom';

import CustomRoute from '../components/Routes/CustomRoute';
import history from '../helpers/history';

interface Props {
  children: ReactElement;
}

const MockComponent = ({ children }: Props): ReactElement => (
  <Router history={history}>
    {children}
  </Router>
);

describe('CustomRoute', () => {
  it('Is connected, private route : show div', () => {
    const tree = renderer
      .create(
        <MockComponent>
          <CustomRoute
            exact
            component={(): ReactElement => <div>Is connected, private route : show div</div>}
            requireAuth
            path="/"
            fixture={{
              loading: false,
              error: null,
              data: { validToken: true },
            }}
          />
        </MockComponent>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Is connected, public route : hide div', () => {
    const tree = renderer
      .create(
        <MockComponent>
          <CustomRoute
            exact
            component={(): ReactElement => <div>Is connected, public route : hide div</div>}
            requireAuth={false}
            path="/"
            fixture={{
              loading: false,
              error: null,
              data: { validToken: true },
            }}
          />
        </MockComponent>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Is not connected, private route : hide div', () => {
    const tree = renderer
      .create(
        <MockComponent>
          <CustomRoute
            exact
            component={(): ReactElement => <div>Is not connected, private route : hide div</div>}
            requireAuth
            path="/"
            fixture={{
              loading: false,
              error: null,
              data: { validToken: false },
            }}
          />
        </MockComponent>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Is not connected, public route : show div', () => {
    const tree = renderer
      .create(
        <MockComponent>
          <CustomRoute
            exact
            component={(): ReactElement => <div>Is not connected, public route : show div</div>}
            requireAuth={false}
            path="/"
            fixture={{
              loading: false,
              error: null,
              data: { validToken: true },
            }}
          />
        </MockComponent>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Loading', () => {
    const tree = renderer
      .create(
        <MockComponent>
          <CustomRoute
            exact
            component={(): ReactElement => <div>Loading</div>}
            requireAuth={false}
            path="/"
            fixture={{
              loading: true,
              error: null,
              data: { validToken: true },
            }}
          />
        </MockComponent>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Error', () => {
    const tree = renderer
      .create(
        <MockComponent>
          <CustomRoute
            exact
            component={(): ReactElement => <div>Error</div>}
            requireAuth={false}
            path="/"
            fixture={{
              loading: false,
              error: {
                error: true,
              },
              data: { validToken: true },
            }}
          />
        </MockComponent>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import React from "react";
import Adapter from "enzyme-adapter-react-16";
import EnzymeToJson from "enzyme-to-json";
import { configure } from "enzyme";
import { History, Location, LocationState } from "history";

import Search from "../components/Search";
import Film from "../components/Search/Movie";
import Thumbnail from "../components/Search/Thumbnail";

import { mountWithIntl } from "./helpers/intl-enzyme-test-helper";

import * as ServiceSearch from "../components/Search/service";
import { UseApiReturn } from "../models/models";

configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: (): History<LocationState> => ({
    length: null,
    action: null,
    location: { pathname: "/", search: "", state: {}, hash: null },
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
    state: {},
    hash: null
  })
}));

// todo: change any to real type returned by our api
jest.mock("../hooks/useApi", () => (): UseApiReturn<any, any> => ({
  callApi: jest.fn(),
  loading: false,
  res: { data: [], status: 200, statusText: null, headers: null, config: null },
  resData: [],
  error: null,
  setUrl: jest.fn(),
  setMethod: jest.fn(),
  setHeaders: jest.fn(),
  setData: jest.fn(),
  cancelAllRequests: jest.fn()
}));

describe("Search", () => {
  const filmFixture = {
    title: "Film",
    // eslint-disable-next-line @typescript-eslint/camelcase
    avg_rating: 4.3,
    date: "1935-01-01T00:00:00Z",
    creator: "Film author",
    subject: ["tag1", "tag2"],
    description: "A film fixture",
    identifier: "film-fixture"
  };

  describe("search en", () => {
    it("renders correctly", () => {
      const domNode = mountWithIntl(<Search />, "en");
      expect(EnzymeToJson(domNode)).toMatchSnapshot();
    });
  });

  describe("film en", () => {
    it("renders correctly", () => {
      const domNode = mountWithIntl(<Film film={filmFixture} />, "en");
      expect(EnzymeToJson(domNode)).toMatchSnapshot();
    });
  });

  describe("search fr", () => {
    it("renders correctly", () => {
      const domNode = mountWithIntl(<Search />, "fr");
      expect(EnzymeToJson(domNode)).toMatchSnapshot();
    });
  });

  describe("film fr", () => {
    it("renders correctly", () => {
      const domNode = mountWithIntl(<Film film={filmFixture} />, "fr");
      expect(EnzymeToJson(domNode)).toMatchSnapshot();
    });
  });

  describe("thumbnail", () => {
    it("renders correctly", () => {
      const domNode = mountWithIntl(
        <Thumbnail film={filmFixture} onClick={jest.fn()} />,
        "en"
      );
      expect(EnzymeToJson(domNode)).toMatchSnapshot();
    });
  });

  describe("Service", () => {
    describe("clamp", () => {
      it("should not clamp", () => {
        const shortFilmName = "Short";

        const clamped = ServiceSearch.clamp(shortFilmName, 24);
        expect(clamped).toBe("Short");
      });

      it("should clamp", () => {
        const longFilmName = "Very long";

        const clamped = ServiceSearch.clamp(longFilmName, 1);
        expect(clamped).toBe("V...");
      });
    });

    describe("formatQueryUrl", () => {
      it("should get a full query", () => {
        const testQuery = ServiceSearch.formatQueryUrl(
          "?query=top&collections%5B0%5D=collec1&collections%5B1%5D=collec2",
          1
        );

        expect(testQuery).toBe(
          "/search?query=top&collections%5B0%5D=collec1&collections%5B1%5D=collec2&page=1"
        );
      });

      it("should get a empty query", () => {
        const testQuery = ServiceSearch.formatQueryUrl("", 1);
        expect(testQuery).toBe("/search?page=1");
      });
    });
  });
});

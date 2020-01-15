import React from "react";
import Adapter from "enzyme-adapter-react-16";
import EnzymeToJson from "enzyme-to-json";
import { configure } from "enzyme";

import Search from "../components/Search";

import { mountWithIntl } from "./helpers/intl-enzyme-test-helper";

import * as ServiceSearch from "../components/Search/service";

configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  useHistory: (): Record<string, unknown> => ({
    push: jest.fn(),
    location: { state: {} }
  }),
  useLocation: (): Record<string, unknown> => ({
    state: {},
    search: ""
  })
}));

jest.mock("../hooks/useApi", () => (): {
  data: unknown;
  loading: boolean;
  error: void;
  setUrl: () => void;
} => ({
  data: [],
  loading: false,
  error: null,
  setUrl: jest.fn()
}));

describe("Search", () => {
  describe("search en", () => {
    it("renders correctly", () => {
      const domNode = mountWithIntl(<Search />, "en");
      expect(EnzymeToJson(domNode)).toMatchSnapshot();
    });
  });

  describe("search fr", () => {
    it("renders correctly", () => {
      const domNode = mountWithIntl(<Search />, "fr");
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

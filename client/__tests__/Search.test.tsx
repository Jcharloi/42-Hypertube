import React from "react";
import Adapter from "enzyme-adapter-react-16";
import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";

import Search from "../components/Search";
import Film from "../components/Search/Movie";
import Thumbnail from "../components/Search/Thumbnail";

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
      const domNode = mount(
        <Thumbnail film={filmFixture} onClick={jest.fn()} />
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

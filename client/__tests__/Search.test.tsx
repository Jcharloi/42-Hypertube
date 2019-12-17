import React from "react";
import Adapter from "enzyme-adapter-react-16";
import EnzymeToJson from "enzyme-to-json";
import moment from "moment";
import { mount, configure } from "enzyme";

import Search from "../components/Search";
import Film from "../components/Search/Film";
import Thumbnail from "../components/Search/Thumbnail";

import { mountWithIntl } from "./helpers/intl-enzyme-test-helper";

import * as ServiceSearch from "../components/Search/service";

configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
  useHistory: (): Record<string, unknown> => ({
    push: jest.fn(),
    location: { state: {} }
  })
}));

jest.mock("react-intl", () => ({
  useIntl: (): Record<string, unknown> => ({
    formatMessage: ({ id }: { id: string }): string => id
  })
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

  describe("search", () => {
    it("renders correctly", () => {
      const domNode = mountWithIntl(<Search />, "en");
      expect(EnzymeToJson(domNode)).toMatchSnapshot();
    });
  });

  describe("film", () => {
    it("renders correctly", () => {
      const domNode = mountWithIntl(<Film film={filmFixture} />, "en");
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

    describe("formatUrl", () => {
      it("should get a full query", () => {
        const filters = {
          query: "top",
          collections: ["collec1", "collec2"],
          startYear: 1900,
          endYear: 2019,
          minRating: 0,
          maxRating: 5
        };

        const testQuery = ServiceSearch.formatUrl(filters, 1);
        expect(testQuery).toBe(
          "/search?query=top&collections%5B0%5D=collec1&collections%5B1%5D=collec2&page=1"
        );
      });

      it("should get a empty query", () => {
        const filters = {
          query: "",
          collections: Array(0),
          startYear: 1900,
          endYear: moment().year(),
          minRating: 0,
          maxRating: 5
        };

        const testQuery = ServiceSearch.formatUrl(filters, 1);
        expect(testQuery).toBe("/search?page=1");
      });
    });
  });
});

import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import EnzymeToJson from "enzyme-to-json";
import { mount, configure } from "enzyme";
import { mountWithIntl } from "./helpers/intl-enzyme-test-helper";

import Home from "../components/Home";
import HomeFeaturedMovie from "../components/Home/FeaturedMedia";
import HomeFeed from "../components/Home/Feed";
import HomeRecentVideos from "../components/Home/RecentMedias";

configure({ adapter: new Adapter() });

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

describe("Home", () => {
  it("renders index correctly EN", () => {
    const domNode = mountWithIntl(<Home />, "en");
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("renders index correctly FR", () => {
    const domNode = mountWithIntl(<Home />, "fr");
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("renders FeaturedMovie correctly EN", () => {
    const domNode = mountWithIntl(<HomeFeaturedMovie />, "en");
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("renders FeaturedMovie correctly FR", () => {
    const domNode = mountWithIntl(<HomeFeaturedMovie />, "fr");
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("renders Feed correctly EN", () => {
    const domNode = mountWithIntl(<HomeFeed />, "en");
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("renders Feed correctly FR", () => {
    const domNode = mountWithIntl(<HomeFeed />, "fr");
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("renders HomeRecentVideos correctly EN", () => {
    const domNode = mountWithIntl(<HomeRecentVideos />, "en");
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("renders HomeRecentVideos correctly FR", () => {
    const domNode = mountWithIntl(<HomeRecentVideos />, "fr");
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });
});

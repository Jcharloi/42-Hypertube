import React from "react";
import EnzymeToJson from "enzyme-to-json";

import { mountWithIntl } from "./helpers/intl-enzyme-test-helper";
import MovieComments from "../components/Movie/MovieComments";
import Movie from "../components/Movie/Movie";
import { Reviews } from "../models/models";
import checkInvalidCommentOrStars from "../components/Movie/MovieComments.service";

jest.mock("../helpers/socket", () => ({
  socket: { on: jest.fn(), emit: jest.fn() }
}));

jest.mock("../hooks/useApi", () => (): {
  data: unknown;
  loading: boolean;
  error: void;
  setUrl: () => void;
} => ({
  data: { infos: {}, reviews: {} },
  loading: false,
  error: null,
  setUrl: jest.fn()
}));

describe("Movie", () => {
  let reviews: Reviews;

  beforeAll(() => {
    reviews = {
      movieRating: 5,
      review: [
        {
          id: "0123456789",
          name: "TestMan",
          date: 1577118711809,
          stars: 4,
          body: "That was actually really awesome"
        }
      ]
    };
  });

  it("should renders <Movie> in english", () => {
    const domNode = mountWithIntl(<Movie />, "en");
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("should renders <Movie> in french", () => {
    const domNode = mountWithIntl(<Movie />, "fr");
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("should renders <MovieComments> in english", () => {
    const domNode = mountWithIntl(
      <MovieComments movieId="Dokku_obrash" reviews={reviews} />,
      "en"
    );
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("should renders <MovieComments> in french", () => {
    const domNode = mountWithIntl(
      <MovieComments movieId="Dokku_obrash" reviews={reviews} />,
      "fr"
    );
    expect(EnzymeToJson(domNode)).toMatchSnapshot();
  });

  it("shouldn't send data", () => {
    // Invalid stars
    expect(
      checkInvalidCommentOrStars(0, "That was actually really awesome")
    ).toEqual({ comment: false, stars: true });
    expect(
      checkInvalidCommentOrStars(6, "That was actually really awesome")
    ).toEqual({ comment: false, stars: true });
    // Invalid comment
    expect(checkInvalidCommentOrStars(5, "")).toEqual({
      comment: true,
      stars: false
    });
    expect(
      checkInvalidCommentOrStars(
        5,
        "e Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.e Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.e Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."
      )
    ).toEqual({ comment: true, stars: false });
  });

  it("should send data", () => {
    expect(
      checkInvalidCommentOrStars(4, "That was actually really awesome")
    ).toEqual({ comment: false, stars: false });
  });
});

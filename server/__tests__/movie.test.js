import mongoose from "../mongo";
import MovieCommentModel from "../Schemas/Movie";
import movieHelpers from "../Helpers/movie";

describe("Movie Comments", () => {
  let mockedMovieId;
  let mockedUserId;
  let mockedReview;
  let finalReview;

  beforeAll(() => {
    mockedMovieId = "B123rR";
    mockedUserId = String(new mongoose.Types.ObjectId());
    mockedReview = {
      _id: mockedUserId,
      movieId: mockedMovieId,
      movieName: "4242",
      name: "TestMan",
      date: 1577118711809,
      stars: 4,
      body: "That was actually really awesome"
    };
    finalReview = {
      ...mockedReview,
      __v: 0
    };
  });

  afterAll(async () => {
    await MovieCommentModel.deleteOne({ _id: mockedUserId });
  });

  it("shouldn't inserts user's review when less stars than allowed", async () => {
    const mockedMinimumStarsReview = {
      ...mockedReview,
      stars: 0
    };
    const errorMessage =
      "movieComments validation failed: stars: Path `stars` (0) is less than minimum allowed value (1).";
    const errSaveReview = await movieHelpers.saveReview(
      mockedMinimumStarsReview
    );
    expect(errSaveReview).toEqual(errorMessage);
  });

  it("shouldn't inserts user's review when bigger stars than allowed", async () => {
    const mockedMaximumStarsReview = {
      ...mockedReview,
      stars: 6
    };
    const errorMessage =
      "movieComments validation failed: stars: Path `stars` (6) is more than maximum allowed value (5).";
    const errSaveReview = await movieHelpers.saveReview(
      mockedMaximumStarsReview
    );
    expect(errSaveReview).toEqual(errorMessage);
  });

  it("should inserts user's review", async () => {
    await movieHelpers.saveReview(mockedReview);
    const reviewDb = await MovieCommentModel.findById(mockedUserId);
    expect(reviewDb.toJSON()).toEqual(finalReview);
  });

  it("should finds our review in the database", async () => {
    const ourReviews = await movieHelpers.findReviews(mockedMovieId);
    let isReviewHere;
    ourReviews.forEach(({ id }) => {
      if (id === mockedReview._id) {
        isReviewHere = true;
      }
    });
    expect(isReviewHere).toBeTruthy();
  });

  it("should sorts both reviews from API and Database", () => {
    const mockedApiReviews = [
      {
        ...mockedReview,
        _id: "0123456789"
      },
      {
        ...mockedReview,
        _id: "0123456789",
        date: 1575500400000
      }
    ];
    const mockedOurReviews = [
      { ...mockedReview, _id: "0123456789", date: 1576278000000 },
      { ...mockedReview, _id: "0123456789", date: 1575759600000 }
    ];
    const bothReviews = movieHelpers.sortReviews(
      mockedApiReviews,
      mockedOurReviews
    );
    expect(bothReviews).toEqual([
      {
        _id: "0123456789",
        movieId: "B123rR",
        movieName: "4242",
        name: "TestMan",
        date: "Dec, 05, 2019",
        stars: 4,
        body: "That was actually really awesome"
      },
      {
        _id: "0123456789",
        movieId: "B123rR",
        movieName: "4242",
        name: "TestMan",
        date: "Dec, 08, 2019",
        stars: 4,
        body: "That was actually really awesome"
      },
      {
        _id: "0123456789",
        movieId: "B123rR",
        movieName: "4242",
        name: "TestMan",
        date: "Dec, 14, 2019",
        stars: 4,
        body: "That was actually really awesome"
      },
      {
        _id: "0123456789",
        movieId: "B123rR",
        movieName: "4242",
        name: "TestMan",
        date: "Dec, 23, 2019",
        stars: 4,
        body: "That was actually really awesome"
      }
    ]);
  });
});

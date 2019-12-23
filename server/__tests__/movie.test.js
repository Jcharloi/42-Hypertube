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

  // it("should sort all reviews", () => {});
});

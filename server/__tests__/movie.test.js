import mongoose from "../mongo";
import MovieModel from "../Schemas/Movie";
import movieHelpers from "../Helpers/movie";

describe("Movie Comments", () => {
  let mockedMovieId;
  let mockedUserId;
  let mockedUserId2;
  let mockedUserId3;
  let mockedUserId4;
  let mockedReview;
  let finalReview;
  let mockedHistory;
  let finalHistory;

  beforeAll(() => {
    mockedMovieId = "4242";
    mockedUserId = String(new mongoose.Types.ObjectId());
    mockedUserId2 = String(new mongoose.Types.ObjectId());
    mockedUserId3 = String(new mongoose.Types.ObjectId());
    mockedUserId4 = String(new mongoose.Types.ObjectId());
    mockedReview = {
      _id: mockedUserId,
      movieId: mockedMovieId,
      movieName: "ExampleMovie",
      name: "TestMan",
      date: 1577118711809,
      stars: 4,
      body: "That was actually really awesome"
    };
    finalReview = {
      ...mockedReview,
      __v: 0
    };
    mockedHistory = {
      _id: mockedUserId,
      userId: "42",
      movieId: mockedMovieId,
      movieName: "ExampleMovie",
      date: 1577118711809
    };
    finalHistory = {
      ...mockedHistory,
      __v: 0
    };
  });

  afterAll(async () => {
    await MovieModel.MovieCommentModel.deleteOne({ _id: mockedUserId });
    await MovieModel.MovieCommentModel.deleteOne({ _id: mockedUserId2 });
    await MovieModel.MovieCommentModel.deleteOne({ _id: mockedUserId3 });
    await MovieModel.MovieCommentModel.deleteOne({ _id: mockedUserId4 });
    await MovieModel.UserHistoryModel.deleteOne({ _id: mockedUserId });
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
    const reviewDb = await MovieModel.MovieCommentModel.findById(mockedUserId);
    expect(reviewDb.toJSON()).toEqual(finalReview);
  });

  it("should finds user's review", async () => {
    const ourReviews = await movieHelpers.findReviews(mockedMovieId);
    let isReviewHere;
    ourReviews.review.forEach(({ id }) => {
      if (id === mockedUserId) {
        isReviewHere = true;
      }
    });
    expect(isReviewHere).toBeTruthy();
  });

  it("should sorts user's review", async () => {
    await movieHelpers.saveReview({
      ...mockedReview,
      _id: mockedUserId2,
      date: 1579259796560
    });
    await movieHelpers.saveReview({
      ...mockedReview,
      _id: mockedUserId3,
      date: 1577487600000
    });
    await movieHelpers.saveReview({
      ...mockedReview,
      _id: mockedUserId4,
      date: 1573426800000
    });
    const ourReviews = await movieHelpers.findReviews(mockedMovieId);
    expect(ourReviews).toEqual({
      movieRating: 4,
      review: [
        {
          id: mockedUserId4,
          name: "TestMan",
          date: "Nov, 11, 2019",
          stars: 4,
          body: "That was actually really awesome"
        },
        {
          id: mockedUserId,
          name: "TestMan",
          date: "Dec, 23, 2019",
          stars: 4,
          body: "That was actually really awesome"
        },
        {
          id: mockedUserId3,
          name: "TestMan",
          date: "Dec, 28, 2019",
          stars: 4,
          body: "That was actually really awesome"
        },
        {
          id: mockedUserId2,
          name: "TestMan",
          date: "Jan, 17, 2020",
          stars: 4,
          body: "That was actually really awesome"
        }
      ]
    });
  });

  it("should logs user's history", async () => {
    await movieHelpers.logHistory(mockedHistory);
    const userHistory = await MovieModel.UserHistoryModel.findById(
      mockedUserId
    );
    expect(userHistory.toJSON()).toEqual(finalHistory);
  });
});

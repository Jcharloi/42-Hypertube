import { searchMoviesOnYts, searchShowsOnPCT } from "../Helpers/search";

describe("Search", () => {
  describe("Helper/search movies", () => {
    it("Should get the data", async () => {
      const filters = {
        limit: 12,
        sort_by: "download_count",
        minRating: 0,
        page: 1,
        year: 2017,
        query: "",
        collections: "Action"
      };

      const res = await searchMoviesOnYts(filters);

      expect(res).toBeDefined();
      expect(res).toHaveProperty("nextPage");
      expect(res).toHaveProperty("medias");
      expect(res.medias).toBeInstanceOf(Array);
    });
  });
});

describe("Helper/search shows", () => {
  it("Should get the data", async () => {
    const filters = {
      collections: "Action",
      page: 1,
      query: "",
      sort: "trending"
    };

    const res = await searchShowsOnPCT(filters);

    expect(res).toBeDefined();
    expect(res).toHaveProperty("nextPage");
    expect(res).toHaveProperty("medias");
    expect(res.medias).toBeInstanceOf(Array);
  });
});

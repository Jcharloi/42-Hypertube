import searchHelper from "../Helpers/search";

describe("search", () => {
  describe("helper", () => {
    it.only("should get data", async () => {
      const filters = {
        query: "test",
        page: 1,
        minRating: 0,
        maxRating: 5,
        startYear: 1900,
        endYear: 2019
      };

      const res = await searchHelper(filters);
      expect(res).toBeDefined();
      expect(res).toHaveProperty("numFound");
      expect(res).toHaveProperty("start");
      expect(res).toHaveProperty("docs");
    });
  });
});

import searchHelper from "../Helpers/search";

describe("Search", () => {
  describe("Helper/search main function", () => {
    it("Should get the data", async () => {
      const filters = {
        query: "test",
        page: 1,
        minRating: 0,
        year: 2017
      };

      const res = await searchHelper(filters);

      expect(res).toBeDefined();
      // expect(res).toHaveProperty("numFound");
      // expect(res).toHaveProperty("start");
      // expect(res).toHaveProperty("docs");
    });
  });
});

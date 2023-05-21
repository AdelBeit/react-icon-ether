import { urlExists } from "../utils";

describe("urlExists", () => {
  test("should return true for a valid image URL", async () => {
    const imageUrl = "https://cdn.simpleicons.org/next.js/";
    const result = await urlExists(imageUrl);
    expect(result).toBe(true);
  });

  test("should return false for an invalid image URL", async () => {
    const invalidUrl = "https://cdn.simpleicons.org/next.js32/";
    const result = await urlExists(invalidUrl);
    expect(result).toBe(false);
  });
});

import { describe, it, expect } from "vitest";
import { isEven } from "./isEven";

describe("isEven", () => {
  it("vrne true za soda števila", () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(0)).toBe(true);
    expect(isEven(-4)).toBe(true);
  });

  it("vrne false za liha števila", () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(-3)).toBe(false);
  });
});

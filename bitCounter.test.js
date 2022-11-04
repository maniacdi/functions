// Complete this function
function countBids(input) {
  throw new Error("Not implemented");
}

describe("Count positive bits", function () {
  it("Should return a RangeError when a negative value is supplied", function () {
    expect(() => {
      countBids(-2);
    }).toThrow(RangeError);
  });

  it("Should return zero occurrences for input = 0", function () {
    let expected = [0];
    let actual = countBids(0);
    expect(expected).toEqual(actual);
  });

  it("Should return the expected count for input = 1", function () {
    let expected = [1, 0];
    let actual = countBids(1);
    expect(expected).toEqual(actual);
  });

  it("Should return the expected count for input = 137", function () {
    let expected = [3, 0, 3, 7];
    let actual = countBids(137);
    expect(expected).toEqual(actual);
  });
});

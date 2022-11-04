// Complete this function
function countBids(input) {
  // if (input < 0 || input >= Number.MAX_SAFE_INTEGER) {
  //   throw new RangeError('Must be a positive integer.');
  // } else {
  //   const resultArray = [];
  //   const binaryArray = input.toString(2).split('').reverse();
  //   const count1 = input.toString(2).replace(/0/g, '').length;
  //   resultArray.push(count1);
  //   for (let i = 0; i < binaryArray.length; i++) {
  //     if (binaryArray[i] === '1') {
  //       resultArray.push(i);
  //     }
  //   }
  //   return resultArray;
  // }
  if (input < 0 || input >= Number.MAX_SAFE_INTEGER) {
    throw new RangeError('Must be a positive integer.');
  } else {
    const resultArray = [];
    const binaryArray = input.toString(2).split('').reverse();
    let count = 0;
    for (let i = 0; i < binaryArray.length; i++) {
      if (binaryArray[i] === '1') {
        resultArray.push(i);
        count++;
      }
    }
    resultArray.splice(0, 0, count);
    return resultArray;
  }
}

describe('Count positive bits', function () {
  it('Should return a RangeError when a negative value is supplied', function () {
    expect(() => {
      countBids(-2);
    }).toThrow(RangeError);
  });

  it('Should return zero occurrences for input = 0', function () {
    let expected = [0];
    let actual = countBids(0);
    expect(expected).toEqual(actual);
  });

  it('Should return the expected count for input = 1', function () {
    let expected = [1, 0];
    let actual = countBids(1);
    expect(expected).toEqual(actual);
  });

  it('Should return the expected count for input = 137', function () {
    let expected = [3, 0, 3, 7];
    let actual = countBids(137);
    expect(expected).toEqual(actual);
  });
});

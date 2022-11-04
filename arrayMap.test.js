const mapFn = (person) => ({ ...person, age: person.age * 2 });

const conditionFn = (person) => person.age > 7;

// Complete this function yarn jest --no-color 2>output.txt
const customMap = (arr, fn) => {
  const resultArray = [];
  for (let i = 0; i < arr.length; i++) {
    resultArray.push(fn(arr[i], i));
  }
  return resultArray;
};

// Complete this function
const customFilter = (arr, fn) => {
  const resultArray = [];
  for (let i = 0; i < arr.length; i++) {
    //Check if falsy
    if (!!fn(arr[i], i, arr)) {
      resultArray.push(arr[i]);
    }
  }
  return resultArray;
};

describe('Array map test', function () {
  it('Should return the expected array for the people list given', function () {
    const people = [
      { name: 'Alex', age: 2 },
      { name: 'Luis', age: 12 },
      { name: 'Marco', age: 4 },
    ];

    const expected = people
      .map((item) => mapFn(item))
      .filter((item) => conditionFn(item));

    const actual = customFilter(customMap(people, mapFn), conditionFn);

    expect(expected.toString() == actual.toString());
  });
});

function cleanUpArray(arr) {
  let newArr = [];
  for (let [index, group] of arr.entries()) {
    const newGroup = [];
    for (let [innerIndex, elem] of group.entries()) {
      if (
        !group[0] &&
        elem &&
        (newArr[index - 1] && !newArr[index - 1][innerIndex])
      ) {
        if (!newArr[index - 1][0] && !newArr[index - 2][innerIndex]) {
          newArr[index - 2][innerIndex] = elem;
        } else {
          newArr[index - 1][innerIndex] = elem;
        }
        newGroup.push(0);
      } else {
        newGroup.push(elem);
      }
    }
    newArr.push(newGroup);
  }

  // cleanup empty values from array
  return newArr.filter(group => !group.every(elem => !elem));
}

const dataSet = [
  {
    provided: cleanUpArray([[1, 0, 0, 1], [0, 1, 1, 1]]),
    expected: [[1, 1, 1, 1], [0, 0, 0, 1]]
  },
  {
    provided: cleanUpArray([[1, 0, 0, 1], [0, 1, 0, 1]]),
    expected: [[1, 1, 0, 1], [0, 0, 0, 1]]
  },
  {
    provided: cleanUpArray([[1, 0, 0], [1, 0, 1], [0, 1, 0], [0, 0, 1]]),
    expected: [[1, 0, 0], [1, 1, 1], [0, 0, 1]]
  },
  {
    provided: cleanUpArray([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]),
    expected: [[1, 1, 1], [1, 1, 1]]
  },
  {
    provided: cleanUpArray([[1, 0, 0], [0, 1, 1], [1, 0, 1]]),
    expected: [[1, 1, 1], [1, 0, 1]]
  },
  {
    provided: cleanUpArray([[1, 0, 0], [0, 0, 1], [0, 1, 1]]),
    expected: [[1, 1, 1], [0, 0, 1]]
  },
  {
    provided: cleanUpArray([[1, 0, 0], [0, 0, 1], [0, 1, 1], [1, 0, 0]]),
    expected: [[1, 1, 1], [0, 0, 1], [1, 0, 0]]
  }
];

var assert = require("assert");
describe("Array", function() {
  describe("#indexOf()", function() {
    dataSet.forEach(elem => {
      it("should match", function() {
        assert.deepEqual(elem.provided, elem.expected);
      });
    });
  });
});

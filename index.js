function cleanUpArray(arr) {
    let newArr = [];
    for (let [index, group] of arr.entries()) {
        const prev = newArr[index - 1];
        const newGroup = [];

        for (let [innerIndex, elem] of group.entries()) {
            if (elem && prev && !prev[innerIndex] && !group[0]) {
                prev[innerIndex] = elem;
                newGroup.push(0)
            } else {
                newGroup.push(elem)
            }
        }

        if (!newGroup.every(elem => !elem)) {
            newArr.push(newGroup);
        }
    }

    // cleanup empty values from array
    return newArr
}

const dataSet = [
    { provided: cleanUpArray([[1, 0, 0, 1], [0, 1, 1, 1]]), expected: [[1, 1, 1, 1], [0, 0, 0, 1]] },
    { provided: cleanUpArray([[1, 0, 0, 1], [0, 1, 0, 1]]), expected: [[1, 1, 0, 1], [0, 0, 0, 1]] },
    { provided: cleanUpArray([[1, 0, 0], [1, 0, 1], [0, 1, 0], [0, 0, 1]]), expected: [[1, 0, 0], [1, 1, 1], [0, 0, 1]] },
    { provided: cleanUpArray([[1, 0, 0], [0, 1, 0], [0, 0, 1]]), expected: [[1, 1, 1]] },
    { provided: cleanUpArray([[1, 0, 0], [0, 1, 1], [1, 0, 1]]), expected: [[1, 1, 1], [1, 0, 1]] },
    { provided: cleanUpArray([[1, 0, 0], [0, 0, 1], [0, 1, 1]]), expected: [[1, 1, 1], [0, 0, 1]] },
    { provided: cleanUpArray([[1, 0, 0], [0, 0, 1], [0, 1, 1], [1, 0, 0]]), expected: [[1, 1, 1], [0, 0, 1], [1, 0, 0]] },
];

var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        dataSet.forEach(elem => {
            it('should match', function () {
                // assert.equal([1, 2, 3].indexOf(4), -1);
                assert.deepEqual(elem.provided, elem.expected)
            })
        });
    });
});

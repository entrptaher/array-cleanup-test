function cleanUpArray(arr) {
    let newArr = [];
    for (let [index, group] of arr.entries()) {
        const prev = newArr[index - 1];
        const newGroup = [];

        for (let [innerIndex, elem] of group.entries()) {
            if ((elem && !prev) || (elem && prev && prev[innerIndex])) {
                newGroup.push(elem)
            } else if (elem && prev && !prev[innerIndex]) {
                if (!group[0]) {
                    prev[innerIndex] = elem;
                    newGroup.push(0)
                } else {
                    newGroup.push(elem)
                }
            } else {
                newGroup.push(elem)
            }
        }
        newArr.push(newGroup);
    }

    // cleanup empty values from array
    return newArr.filter(group => !(group.every(elem => !elem)))
}

// console.log(cleanUpArray([[1, 0, 0, 1], [0, 1, 1, 1]])); // [[1,1,1,1],[0,0,0,1]]
// console.log(cleanUpArray([[1, 0, 0], [1, 0, 1], [0, 1, 0], [0, 0, 1]])); // [[1,0,0],[1,0,1],[0,1,1]]

const dataSet = [
    { provided: cleanUpArray([[1, 0, 0, 1], [0, 1, 1, 1]]), expected: [[1, 1, 1, 1], [0, 0, 0, 1]] },
    { provided: cleanUpArray([[1, 0, 0, 1], [0, 1, 0, 1]]), expected: [[1, 1, 0, 1], [0, 0, 0, 1]] },
    { provided: cleanUpArray([[1, 0, 0], [1, 0, 1], [0, 1, 0], [0, 0, 1]]), expected: [[1, 0, 0], [1, 1, 1], [0, 0, 1]] }
];

const assert = require('assert')
dataSet.forEach(elem => {
    assert.deepEqual(elem.provided, elem.expected, JSON.stringify({ expected: elem.expected, provided: elem.provided }))
})

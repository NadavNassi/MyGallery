function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}


// function drawNum(nums) {
// console.log('nums', nums)
// var idx = Math.floor(Math.random() * (nums.length + 1));
//     console.log('idx', idx)
//     var num = nums.splice(idx, 1);
//     return num[0];
// }

// function resetNums(length) {
//     var nums = [];
//     for (var i = 1; i <= length; i++) {
//         nums.push(i);
//     }
//     var num = drawNum(nums);
//     return num;
// }

function getRandIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

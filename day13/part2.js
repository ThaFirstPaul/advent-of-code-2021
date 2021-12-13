const fs = require("fs");

var folds = []
var size = [1400,1400]

var input_data = fs.readFileSync('./adventofcode/day13/input.txt').toString().split("\n").map((n) => n.length > 12 ? folds.push(n.trim()) : n.trim());

//clean up input data
input_data.splice(input_data.length - (folds.length + 1), folds.length + 1)

var a = Array(size[0]).fill().map(() => Array(size[1]).fill('.'))

// fill the array 'matrix' with the numbers
for (let indx = 0; indx < input_data.length; indx++) {
    const pos = input_data[indx].split(',');
    a[pos[1]][pos[0]] = '#'
}
console.log(a.map((n) => n.join('')).join('\n'))

// for each fold
folds.forEach(fold_string => {
    var fold = fold_string.split('=')
    fold[0] = fold[0][fold[0].length - 1]
    console.log(`\nFold ${fold[0]} : ${fold[1]}`)

    if (fold[0] === 'x') {
        var axis = 0
        size[1] = parseInt(fold[1])+1
        a = Array(size[0]).fill().map(() => Array(size[1]).fill('.'))
    } else if (fold[0] === 'y') {
        var axis = 1
        size[0] = parseInt(fold[1])+1
        a = Array(size[0]).fill().map(() => Array(size[1]).fill('.'))
    } else {
        console.log('Unknown axis')
    }

    // calculate new positions of each point
    for (let index = 0; index < input_data.length; index++) {
        var point = input_data[index].split(',').map((n) => +n);
        if (point[axis] > fold[1]) {
            point[axis] = fold[1] - (point[axis] - fold[1])
            input_data[index] = point.join(',')

        }

    }


    // fill the array 'matrix' with the numbers
    for (let indx = 0; indx < input_data.length; indx++) {
        const pos = input_data[indx].split(',');

        a[pos[1]][pos[0]] = '#'

    }

    // draw the line
    if (axis === 0) {
        a.map((m) => m[fold[1]] = '|')
    } else {
        a[fold[1]].fill('_')
    }

    console.log(a.map((n) => n.join('')).join('\n'))
    //console.log(input_data)
});

a = Array(size[0]).fill().map(() => Array(size[1]).fill('.'))

// fill the array 'matrix' with the numbers
for (let indx = 0; indx < input_data.length; indx++) {
    const pos = input_data[indx].split(',');

    a[pos[1]][pos[0]] = '\x1b[32m#\x1b[37m'

}
console.log('\nFinal output:')
console.log(a.map((n) => n.join('')).join('\n'))
var count = a.flat().filter((l) => l === '\x1b[32m#\x1b[37m').length
console.log(`Count: ${count}`)
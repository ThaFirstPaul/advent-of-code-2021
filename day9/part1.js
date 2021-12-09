const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day9/input.txt').toString().split("\n").map((n) => n.trim().split('').map((n) => +n));

var checked = [];
var sum = 0;

function get_neighbors(map, indexj, indexi) {
    var n,e,s,w = 9;

    if (indexi !== 0) {
        w = map[indexj][indexi - 1]
    }

    if (indexi !== map[0].length - 1) {
        e = map[indexj][indexi + 1]
    }

    if (indexj !== 0) {
        n = map[indexj - 1][indexi]
    }

    if (indexj !== map.length - 1) {
        s = map[indexj + 1][indexi]
    }

    return [n,e,s,w]
}

for (let i = 0; i < input_data[0].length; i++) {
    for (let j = 0; j < input_data.length; j++) {
        // console.log(`\ni:${i} j:${j} = ${input_data[j][i]}`)

        // ignore height of 9
        if (input_data[j][i] === 9) continue;

        // get neighbors
        var neighbors = get_neighbors(input_data, j, i)

        var lower_one = false;
        neighbors.forEach(direc => {
            if(direc <= input_data[j][i]){
                lower_one = true;
            }
        });
        if(lower_one) continue;

        sum += input_data[j][i] +1
    }
}

console.log(`map length = ${input_data[0].length * input_data.length} checked length: ${checked.length}`)
console.log(`sum of all lowpoints = ${sum}`)

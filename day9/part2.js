const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day9/input.txt').toString().split("\n").map((n) => n.trim().split('').map((n) => +n));

var map2 =  Array.from(input_data)

var basins = [];
var checked = [];

function get_neighbors(map, indexj, indexi) {
    var neighbors = []

    if (checked.includes([indexj, indexi].join(','))) {
        // console.log(`this has already been checked j:${indexj} i:${indexi}`)
        return []
    } else {
        checked.push([indexj, indexi].join(','))
    }

    if (indexi !== 0) {
        if (map[indexj][indexi - 1] !== 9) {
            neighbors.push([indexj, indexi - 1])
        }
    }

    if (indexi !== map[0].length - 1) {
        if (map[indexj][indexi + 1] !== 9) {
            neighbors.push([indexj, indexi + 1])
        }
    }

    if (indexj !== 0) {
        if (map[indexj - 1][indexi] !== 9) {
            neighbors.push([indexj - 1, indexi])
        }
    }

    if (indexj !== map.length - 1) {
        if (map[indexj + 1][indexi] !== 9) {
            neighbors.push([indexj + 1, indexi])
        }
    }

    return neighbors
}

function calculate_basin(map, locations) {
    var neighbors = locations;
    var basin = []

    while (neighbors.length > 0) {
        var new_neighbors = []

        neighbors.forEach(loc => {
            // console.log(`checking nighbors of ${loc[0]} ${loc[1]}`)
            var nei = get_neighbors(map, loc[0], loc[1]);

            checked.push(loc.join(','))

            nei.forEach(element => {
                new_neighbors.push(element)
                if(!basin.includes(element.join(','))) basin.push(element.join(','))
                
            });
        });

        neighbors = new_neighbors;
    }

    // console.log(`neighbors found: [${neighbors.join(' ; ')}]`)

    return basin;
}

for (let i = 0; i < input_data[0].length; i++) {
    for (let j = 0; j < input_data.length; j++) {
        // console.log(`\ni:${i} j:${j} = ${input_data[j][i]}`)

        // ignore height of 9
        if (input_data[j][i] === 9) continue;

        // ignore already checked values
        if (checked.includes([j, i].join(','))) continue;

        // console.log('not already checked/9, looking for basins:')
        var cb = calculate_basin(input_data, [[j, i]])

        // console.log(`calculated basin: [${cb}]`)
        basins.push(cb)


    }
}

basins = basins.filter((e) => e.length > 0).sort((a,b) => b.length - a.length)
var l = basins.map((e) => e.length)

var symbols = 'abcdefg'
var ii = 0;
basins.forEach(basin => {
    basin.forEach(element => {
        element = element.split(',')
        if(ii < 6){
            map2[element[0]][element[1]] = `\x1b[32m${symbols[ii]}\x1b[37m`
        } else {
            map2[element[0]][element[1]] = '\x1b[36m.\x1b[37m'
        }
    });
    ii++;
});

console.log(map2.map((n) => n.join('')).join('\n'))
console.log('\x1b[0m')

console.log(`basins found = ${basins.length}`)
console.log(`map length = ${input_data[0].length * input_data.length} checked length: ${checked.length}`)

var largest = basins.map((e) => e.length).sort((a, b) => b - a).slice(0,3);
console.log(`3 largest = ${largest}`)
console.log(`sum of 3 largest = ${largest.reduce((a,b) => a*b)}`)
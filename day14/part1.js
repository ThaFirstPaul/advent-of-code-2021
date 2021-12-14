const fs = require("fs");

var chain = 'SNPVPFCPPKSBNSPSPSOF'
var pair_insertions = {}
var counts = {}

fs.readFileSync('./adventofcode/day14/input.txt').toString()
    .split("\n").map((n) => pair_insertions[Object.keys(pair_insertions).length] = n.trim().split(' -> '));


// loop over each step 
for (let step = 1; step < 11; step++) {
    // for each key
    var pairs = Object.entries(pair_insertions)
    while (/[A-Z]{2,}/.test(chain)) {
        pairs.forEach(item => {
            chain = chain.replaceAll(item[1][0], item[1][0][0] + item[0] + item[1][0][1])
        });
    }

    for (let index = Object.keys(pair_insertions).length - 1; index >= 0; index--) {
        chain = chain.split(index.toString()).join(pair_insertions[index][1])
    }

}

// count each element
for (let i = 0; i < chain.length; i++) {
    const element = chain[i];
    if (counts.hasOwnProperty(element)) {
        counts[element] ++
    } else (
        counts[element] = 1
    )
    
}

console.log(`Counts: `)
console.log(counts)

var least_common = Object.entries(counts).sort((a, b) => a[1] - b[1])[0][1]
var most_common = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][1]

var answer = most_common - least_common

console.log(`Most common (${most_common}) - (${least_common}) = ${answer} `)

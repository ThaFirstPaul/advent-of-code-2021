const fs = require("fs");

const chain = 'SNPVPFCPPKSBNSPSPSOF'

var pair_insertions = {}
var pairs = {}
var counts = {}

fs.readFileSync('./adventofcode/day14/input.txt').toString()
    .split("\n").map((n) => pair_insertions[n.trim().split(' -> ')[0]] = n.trim().split(' -> ')[1]);

for (let i = 0; i < chain.length - 1; i++) {
    const element = `${chain[i]}${chain[i + 1]}`

    if (pairs.hasOwnProperty(element)) {
        pairs[element]++
    } else (
        pairs[element] = 1
    )

}

// loop over each step 
for (let step = 1; step < 41; step++) {
    var new_pairs = {}

    Object.entries(pairs).forEach(pair => {
        // AB -> AN, NB
        var to_insert = pair_insertions[pair[0]]

        var part1 = pair[0][0] + to_insert
        if (new_pairs.hasOwnProperty(part1)) {
            new_pairs[part1] += pair[1]
        } else (
            new_pairs[part1] = pair[1]
        )

        var part2 = to_insert + pair[0][1]
        if (new_pairs.hasOwnProperty(part2)) {
            new_pairs[part2] += pair[1]
        } else (
            new_pairs[part2] = pair[1]
        )

    });

    pairs = new_pairs

}

// count each element
Object.entries(pairs).forEach(pair => {

    var part1 = pair[0][0]
    if (counts.hasOwnProperty(part1)) {
        counts[part1] += pair[1]
    } else (
        counts[part1] = pair[1]
    )
})

counts[chain[chain.length-1]] ++

console.log(`Counts: `)
console.log(counts)

var least_common = Object.entries(counts).sort((a, b) => a[1] - b[1])[0][1]
var most_common = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][1]

var answer = most_common - least_common

console.log(`Most common (${most_common}) - (${least_common}) = ${answer} `)
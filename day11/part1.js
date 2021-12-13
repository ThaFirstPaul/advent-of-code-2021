const fs = require("fs")

let input_data = fs.readFileSync("C:/Users/Paulito/Desktop/advent-of-code-2021-main/day11/input.txt")
    .toString().split("\n").map((line) => line.trim().split("").map((n) => +n))

var octopuses_array = []
var flashes = 0

var map_ = Array(10).fill(0).map(x => Array(10))

function get_neighbors(position) {
    var neighbors = []
    octopuses_array.forEach(octopus => {
        if (octopus.neighbors.includes(position)) {
            neighbors.push(octopus);
        }
    });
    return neighbors
}

class Octopus {
    constructor(position, energy_level) {
        this.position = position.join(",")
        this.energy_level = energy_level
        this.has_flashed = false
        this.neighbors = [
            [position[0] + 1, position[1]],
            [position[0] - 1, position[1]],
            [position[0], position[1] + 1],
            [position[0], position[1] - 1],
            [position[0] + 1, position[1]+1],
            [position[0] - 1, position[1]-1],
            [position[0] + 1, position[1]-1],
            [position[0] - 1, position[1]+1]
        ].map((n) => n.join(","))
    }

    got_flashed() {
        // console.log(`Neighbor octopus ${this.position} got flashed while at ${this.energy_level} `)
        this.energy_level += 1
        // console.log(`Neighbor octopus ${this.position} now at: ${this.energy_level} `)

        if (this.energy_level > 9 && this.has_flashed === false) {
            this.flash()
        }
    }

    flash() {
        // console.log(`Octopus ${this.position} has flashed`)
        // set has_flashed to true
        this.has_flashed = true
        flashes += 1

        // tell neighboring octopuses to increase energy_level by 1
        get_neighbors(this.position).forEach(neighboring_octo => {
            neighboring_octo.got_flashed()
        });
    }
}

// fill the octopuses_array with octopuses
for (let i = 0; i < input_data.length; i++) {
    const row = input_data[i];

    for (let j = 0; j < row.length; j++) {
        const octo_energy = row[j];

        var curr_octopus = new Octopus([i, j], parseInt(octo_energy))
        octopuses_array.push(curr_octopus)
    }
}

// loop for 100 steps
var step;
for (step = 1; step < 101; step++) {

    // console.log(`\n == Step ${step} ==`)

    // During a single step, the following occurs:
    //  First, the energy level of each octopus increases by 1.
    //  Then, any octopus with an energy level greater than 9 flashes. This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent. If this causes an octopus to have an energy level greater than 9, it also flashes. This process continues as long as new octopuses keep having their energy level increased beyond 9. (An octopus can only flash at most once per step.)
    //  Finally, any octopus that flashed during this step has its energy level set to 0, as it used all of its energy to flash.

    // loop through each of the octopuses
    octopuses_array.forEach(octopus => {
        // increases energy_level by 1
        octopus.energy_level += 1
    });

    octopuses_array.forEach(octopus => {
        // check if the energy level is above 9
        if (octopus.energy_level > 9 && octopus.has_flashed === false) {
            octopus.flash()
        }
    });

    octopuses_array.forEach(octopus => {
        // sets energy_level to 0 if the octopus has flashed
        if (octopus.has_flashed === true) {
            octopus.energy_level = 0
            octopus.has_flashed = false
        }

        // map_[octopus.position.split(",")[0]][octopus.position.split(",")[1]] = octopus.energy_level
    });



    // console.log(`\nStep:${step} flashes:${flashes}`)
    // for (let i = 0; i < map_.length; i++) {
    //     console.log(map_[i].join(""))
    // }

}

console.log(`Final number of flashes after ${step} = ${flashes}`)
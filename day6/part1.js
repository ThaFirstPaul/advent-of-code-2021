const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day6/input.txt').toString().split(",").map((n) => +n);

// class lanternfish
class lanternfish {
    constructor(timer) {
        this.internal_timer = timer;
    }

    pass_day() {
        this.internal_timer--;

        if (this.internal_timer === 0) {
            this.internal_timer = 7;
            return true;
        }
        return false;
    }
}

var fishy_array = [];

// fill the array with fishes
for (let fish_index = 1; fish_index < input_data.length; fish_index++) {
    const fish_time = input_data[fish_index];
    fishy_array.push(new lanternfish(fish_time));
}

console.log(`Number of lanternfish on day 1: ${fishy_array.length}`)

// loop for 80 days
for (let day = 2; day < 81; day++) {
    fishy_array.forEach(fish => {
        if (fish.pass_day() === true) {
            fishy_array.push(new lanternfish(9));
        }
    });
    console.log(`Number of lanternfish on day ${day}: ${fishy_array.length}`)
}

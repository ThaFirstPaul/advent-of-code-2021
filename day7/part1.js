const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day7/input.txt').toString().split(",").map((n) => +n);

// Find the largest number in the data
var max = 0;
for (let position_chosen = 0; position_chosen < input_data.length; position_chosen++) {
    if (max < input_data[position_chosen]) {
        max = input_data[position_chosen]
    }
}

// create an array max+1 wide, each position is the # of crabs at that point
var horizontal_array = Array(max + 1).fill(0)

// calculate the max fuel_used possible
var cheapest_option = max*max;

// add all the crabs from input_data to the array
for (let i = 0; i < input_data.length; i++) {
    const crab_loc = input_data[i];

    horizontal_array[crab_loc]++;
}

// loop through each postion to check if it is the cheapest option
for (let test_pos = 0; test_pos < horizontal_array.length; test_pos++) {
    var fuel_used = 0;

    for (let crab_i = 0; crab_i < horizontal_array.length; crab_i++) {
        const no_of_crabs = horizontal_array[crab_i];
        const distance = Math.abs(crab_i - test_pos);

        fuel_used += distance * no_of_crabs;
    } 
    if (cheapest_option > fuel_used) {
        cheapest_option = fuel_used
    }
}


console.log(`Fuel used = ${cheapest_option}`)
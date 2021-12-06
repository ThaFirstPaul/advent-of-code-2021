const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day6/input.txt').toString().split(",").map((n) => +n);

// create a new array of length 9 - one for each state a fish can be in
var fishy_array = [0,0,0,0,0,0,0,0,0,0];

// calculate number of fishies per number:
for (let data_index = 0; data_index < input_data.length; data_index++) {
    const fish = input_data[data_index];
    fishy_array[fish] ++;
}

// loop for 256 days
for (let day = 1; day < 257; day++) {
    var temp = fishy_array[0]
    
    for (let i = 0; i < 8; i++) {
        fishy_array[i] = fishy_array[i+1]
    }

    fishy_array[6] += temp;
    fishy_array[8] = temp;

    console.log(`Number of lanternfish on day ${day}: ${fishy_array.reduce((a,b) => a + b)}`)

}


const fs = require("fs");
const process = require("process");


var input_data = fs.readFileSync('./day1/input.txt').toString().split("\n").map((n) => +n);

var alph_array = [];

for (let alph_index = 1; alph_index < input_data.length + 1; alph_index++) {
    var curr_num;
    var curr_num_plus_1;
    var curr_num_plus_2;
    try {
        curr_num = input_data[alph_index];
        curr_num_plus_1 = input_data[alph_index + 1];
        curr_num_plus_2 = input_data[alph_index + 2];
    } catch {
        break;
    }

    alph_array.push(curr_num + curr_num_plus_1 + curr_num_plus_2);
    console.log(`${alph_index}: ${curr_num + curr_num_plus_1 + curr_num_plus_2}`)
}

input_data = alph_array;

var increased_values = 0;
var decreased_values = 0;
var no_change_values = 0;
var num_of_operations = 0;


for (let index = 1; index < input_data.length + 1; index++) {
    num_of_operations++;
    if (input_data[index] > input_data[index - 1]) {
        increased_values++;
        console.log(`${input_data[index]} > ${input_data[index - 1]}`)
        continue;
    }
    if (input_data[index] < input_data[index - 1]) {
        decreased_values++;
        console.log(`${input_data[index]} < ${input_data[index - 1]}`)
        continue;
    }
    if (input_data[index] === input_data[index - 1]) {
        no_change_values++;
        console.log(`${input_data[index]} = ${input_data[index - 1]}`)
        continue;
    }
}

console.log(`Length of dataset: ${input_data.length}`);
console.log(`Num of operations: ${num_of_operations}`);
console.log(`Number of increases: ${increased_values}`);
console.log(`Number of stays: ${no_change_values}`);
console.log(`Number of decreases: ${decreased_values}`);

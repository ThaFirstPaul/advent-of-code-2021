const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day3/input.txt').toString().split("\n").map((n) => n);

var oxygen_bit_dict = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var CO2_bit_dict = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var oxygen_data = input_data;
var CO2_data = input_data;

var current_oxygen_count = 0;
var current_CO2_count = 0;

// run through for each of the 12 bits
for (let bit_index = 0; bit_index < oxygen_bit_dict.length; bit_index++) {

    current_oxygen_count = 0;
    current_CO2_count = 0;

    // add up all the positive bits for oxygen
    for (let index = 0; index < oxygen_data.length; index++) {
        const element = oxygen_data[index];
        const bits = element.toString()[0, bit_index + 1];

        if (bits === '1') {
            current_oxygen_count++;
        }
    }

    // add up all the positive bits for CO2
    for (let index = 0; index < CO2_data.length; index++) {
        const element = CO2_data[index];
        const bits = element.toString()[0, bit_index + 1];

        if (bits === '1') {
            current_CO2_count++;
        }
    }

    //find the most common value for this bit in each array
    oxygen_bit_dict[bit_index] = current_oxygen_count < oxygen_data.length / 2 ? '0' : '1';
    CO2_bit_dict[bit_index] = current_CO2_count < CO2_data.length / 2 ? '1' : '0';

    var data_temp = [];

    // calculate the new arrays with the most common bits for each array
    for (let index = 0; index < oxygen_data.length; index++) {
        const element = oxygen_data[index].toString();

        if (element[bit_index] === oxygen_bit_dict[bit_index]) {
            data_temp.push(element);
        }
    }

    oxygen_data = data_temp;

    data_temp = [];

    for (let index = 0; index < CO2_data.length; index++) {
        const element = CO2_data[index].toString();

        if (element[bit_index] === CO2_bit_dict[bit_index]) {
            data_temp.push(element);
        }
    }

    CO2_data = data_temp;

    console.log(`Oxy count at bit ${bit_index}: ${oxygen_data.length} and bit_dict: ${oxygen_bit_dict}`);
    console.log(`CO2 count at bit ${bit_index}: ${CO2_data.length} and bit_dict: ${CO2_bit_dict}`);
    console.log(`Oxygen: ${oxygen_data}`);
console.log(`CO2: ${CO2_data}`);
}

console.log(`Oxygen: ${oxygen_data}`);
console.log(`CO2: ${CO2_data}`);
const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day3/input.txt').toString().split("\n").map((n) => n);

var oxygen_bit_dict = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
var CO2_bit_dict = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

var oxygen_data = input_data;
var CO2_data = input_data;

for (let current_bit = 0; current_bit < oxygen_bit_dict.length; current_bit++) {

    if (oxygen_data.length > 1) {
        var current_oxygen_count = 0;

        for (let index = 0; index < oxygen_data.length; index++) {
            const element = oxygen_data[index];

            if (element.substr(current_bit, 1) === '1') {
                current_oxygen_count++;
            } else if (element.substr(current_bit, 1) === '0') {
                current_oxygen_count--;
            } else {
                console.log(`Weird oxy data: ${element} at index ${index}`)
            }
        }

        oxygen_bit_dict[current_bit] = current_oxygen_count < 0 ? '0' : '1';

        var temp_data = [];
        var temp_non_data = [];

        for (let index = 0; index < oxygen_data.length; index++) {
            const element = oxygen_data[index];

            if (element.substr(current_bit, 1) === oxygen_bit_dict[current_bit]) {
                temp_data.push(element);
            } else {
                temp_non_data.push(element);
            }
        }

        oxygen_data = temp_data;

        console.log(`current bit index: ${current_bit}`);
        console.log(`current oxygen count: ${current_oxygen_count}`);
        console.log(`current oxygen bit set to: ${oxygen_bit_dict[current_bit]}`);
        console.log(`current oxygen data length: ${oxygen_data.length}`);
        console.log(`current oxygen bit dict: ${oxygen_bit_dict}`);
        console.log(`current oxygen nondata count: ${temp_non_data.length}\n.`);

    }
    if (CO2_data.length > 1) {
        var current_CO2_count = 0;

        for (let index = 0; index < CO2_data.length; index++) {
            const element = CO2_data[index];

            if (element.substr(current_bit, 1) === '1') {
                current_CO2_count++;
            } else if (element.substr(current_bit, 1) === '0') {
                current_CO2_count--;
            } else {
                console.log(`Weird co2 data: ${element} at index ${index}`)
            }
        }

        
        CO2_bit_dict[current_bit] = current_CO2_count < 0 ? '1' : '0';

        temp_data = [];
        temp_non_data = [];

        for (let index = 0; index < CO2_data.length; index++) {
            const element = CO2_data[index];

            if (element.substr(current_bit, 1) === CO2_bit_dict[current_bit]) {
                temp_data.push(element);
            } else {
                temp_non_data.push(element);
            }
        }

        CO2_data = temp_data;

        console.log(`current bit index: ${current_bit}`);
        console.log(`current co2 count: ${current_CO2_count}`);
        console.log(`current co2 bit set to: ${CO2_bit_dict[current_bit]}`);
        console.log(`current co2 data length: ${CO2_data.length}`);
        console.log(`current co2 bit dict: ${CO2_bit_dict}`);
        console.log(`current co2 nondata count: ${temp_non_data.length}\n.\n.`);
    }

}

console.log(`Oxygen generator rating in binary: ${oxygen_data[0]}`);
console.log(`Oxygen generator rating in dec: ${parseInt(oxygen_data[0], 2)}`);
console.log(`CO2 scrubber rating in binary: ${CO2_data[0]}`);
console.log(`CO2 scrubber rating in dec: ${parseInt(CO2_data[0], 2)}`);

console.log(`Life support rating: ${parseInt(oxygen_data[0], 2) * parseInt(CO2_data[0], 2)}`);

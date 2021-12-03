const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day3/input.txt').toString().split("\n").map((n) => n);

var bit_dict = [0,0,0,0,0,0,0,0,0,0,0,0];
input_data.forEach(element => {
    bits = element.toString().split('');

    for (let index = 0; index < bits.length; index++) {
        if(bits[index] === '1'){
            bit_dict[index] ++;
            continue;
        }
        
    }

});

console.log(bit_dict);

var gamma_dict = Array.from(bit_dict, v => v>input_data.length/2 ? '1' : '0');
var epsilon_dict = Array.from(bit_dict, v => v>input_data.length/2 ? '0' : '1');

var gamma = parseInt(gamma_dict.join(''),2);
var epsilon = parseInt(epsilon_dict.join(''),2);

console.log(`Gamma rate: ${gamma}`);
console.log(`Epsilon rate: ${epsilon}`);
console.log(`Answer: ${epsilon * gamma}`);
const fs = require("fs");

var input_data = fs.readFileSync('./day2/input.txt').toString().split("\n").map((n) => {
    
    return [n.split(' ')[0], parseInt(n.split(' ')[1])];
});

var depth = 0;
var h_distance = 0;

for (let index = 0; index < input_data.length; index++) {
    
    const movement = input_data[index];

    switch (movement[0]) {
        case 'forward':
            h_distance += movement[1];
            break;

        case 'down':
            depth += movement[1];
            break;

        case 'up':
            depth -= movement[1];
            break;

        default:
            console.log('Unknown movement!')
            break;
    }

}


console.log(`Depth: ${depth}m`);
console.log(`Horizontal: ${h_distance}`);
console.log(`Answer: ${depth*h_distance}`);
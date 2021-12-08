const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day8/input.txt').toString().split("\n").map((n) => n.split('|')[1]);

var count = 0; // number of times a 1,4,7 or 8 is found


input_data.forEach(element => {
    const e = element.trim().split(' ');
    console.log(e)
    e.forEach(segement => {
        switch (segement.length) {
            case 2:
                // must be a 1
                count++;
                break;

            case 3:
                // must be a 7
                count++;
                break;

            case 4:
                // must be a 4
                count++;
                break;

            case 7:
                // must be a 8
                count++;
                break;

            default:
                break;
        }
    });

});


console.log(`Count of 1,4,7 and 8 = ${count}`)
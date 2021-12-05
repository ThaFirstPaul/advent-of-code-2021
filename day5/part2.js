const fs = require("fs");

// import the values as an array of arrays with [x1,y1,x2,y2]
var input_data = fs.readFileSync('./day5/input.txt')
    .toString().split("\n")
    .map((n) => n.replace(" -> ", ",").split(",").map((n) => +n));

// create array of locations where vents are
var vent_locations = [];

// loop through the input values array
for (let data_index = 0; data_index < input_data.length; data_index++) {
    const [x1, y1, x2, y2] = input_data[data_index];

    // check if x1 === x2 or y1 === y2, else skip this one
    if (x1 === x2) {
        for (let y_pos = Math.min(y1, y2); y_pos < Math.max(y1, y2) + 1; y_pos++) {
            vent_locations.push([x1, y_pos]);
        }

    }
    if (y1 === y2) {
        for (let x_pos = Math.min(x1, x2); x_pos < Math.max(x1, x2) + 1; x_pos++) {
            vent_locations.push([x_pos, y1]);
        }
    }

    if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
        var add_x, add_y, x_start, y_start;
        // if x and y increase/decrease together
        if (x2 - x1 === y2 - y1) {
            x_start = Math.min(x1, x2);
            y_start = Math.min(y1, y2);
            add_x = 1;
            add_y = 1;
        } else {
            // if x is increasing
            if (x2 - x1 > 0) {
                x_start = Math.min(x1, x2);
                y_start = Math.max(y1, y2);
                add_x = 1;
                add_y = -1;
            } else {
                x_start = Math.max(x1, x2);
                y_start = Math.min(y1, y2);
                add_x = -1;
                add_y = 1;
            }
        }

        for (let moved = 0; moved < Math.abs(x1 - x2)+1; moved++) {
            const x_pos = x_start + moved * add_x;
            const y_pos = y_start + moved * add_y;

            vent_locations.push([x_pos, y_pos]);
        }
    }
}

// array of found duplicates
var found_duplicates = []

// loop through vent locations to find all duplicates
for (let i = 0; i < vent_locations.length; i++) {
    const loc_1 = vent_locations[i];

    // loop through all following locations 
    for (let j = i + 1; j < vent_locations.length; j++) {
        const loc_2 = vent_locations[j];

        if (loc_1[0] === loc_2[0] &&
            loc_1[1] === loc_2[1] &&
            !found_duplicates.includes(loc_1.join(","))) {
            found_duplicates.push(loc_1.join(","))

        }
    }
}
console.log(`Found duplicates: ${found_duplicates.length}`);
const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day8/input2.txt').toString().split("\n").map((n) => n.split('|'));

var count = 0; // number of times a 1,4,7 or 8 is found

Array.prototype.removeElement = function (array) {
    array = array.filter((x, i) => i === array.indexOf(x))
}

function calc_wire_segment_conn(connections) {
    var mappings = [
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'], //0 top
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'], //1 left top
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'], //2 right top
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'], //3 middle
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'], //4 left bottom
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'], //5 right bottom
        ['a', 'b', 'c', 'd', 'e', 'f', 'g']  //6 bottom
    ]

    connections.forEach(segment => {
        segment = segment.split('');
        console.log(segment)
        switch (segment.length) {
            case 2:
                // must be a 1 -> so segments TR, BR must be one of the 2 segments
                for (let i = 0; i < mappings.length; i++) {
                    if (i === 2 || i === 5) {
                        mappings[i] = mappings[i].filter(value=>segment.includes(value));
                        continue
                    }

                    for (let index = 0; index < segment.length; index++) {
                        const element = segment[index];

                        const letter_index = mappings[i].indexOf(segment[index]);
                        if (letter_index > -1) {
                            mappings[i].splice(letter_index, 1);
                        }
                    }
                }
                break;

            case 3:
                // must be a 7
                for (let i = 0; i < mappings.length; i++) {
                    if (i === 1 || i === 2 || i === 5) {
                        mappings[i] = mappings[i].filter(value=>segment.includes(value));
                        continue
                    }

                    for (let index = 0; index < segment.length; index++) {
                        const element = segment[index];

                        const letter_index = mappings[i].indexOf(segment[index]);
                        if (letter_index > -1) {
                            mappings[i].splice(letter_index, 1);
                        }
                    }
                }
                break;

            case 4:
                // must be a 4
                for (let i = 0; i < mappings.length; i++) {
                    if (i === 1 || i === 2 || i === 3 || i === 5) {
                        mappings[i] = mappings[i] = mappings[i].filter(value=>segment.includes(value));
                        continue;
                    }

                    for (let index = 0; index < segment.length; index++) {
                        const element = segment[index];

                        const letter_index = mappings[i].indexOf(segment[index]);
                        if (letter_index > -1) {
                            mappings[i].splice(letter_index, 1);
                        }
                    }

                }
                break;

            case 5:
                // must be 2,3,5 (includes all segments)
                for (let i = 0; i < mappings.length; i++) {
                    mappings[i] = mappings[i].filter(value=>segment.includes(value));
                    continue
                }
                break;

            case 6:
                // must be 0,6,9 (includes all segments)
                for (let i = 0; i < mappings.length; i++) {
                    mappings[i].filter(value=>segment.includes(value));
                    continue
                }
                break;

            case 7:
                // must be a 8
                break;

            default:
                console('Number not found')
                break;
        }

        console.log(mappings.join(' - '))
    });

    return mappings

}


// input_data.forEach(element => {
//     const e = element.split(' ');
//     console.log(e)



// });



var s =calc_wire_segment_conn('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab'.split(' '))
s.forEach(element => {
    console.log(element)
});
// console.log(`Count of 1,4,7 and 8 = ${}`)
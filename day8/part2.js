const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day8/input.txt').toString().split("\n").map((n) => n.split(' | '));

function calc_wire_segment_conn(connections) {
    var mappings = [
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'], //0 top
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'], //1 top left
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'], //2 top right
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'], //3 middle
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'], //4 bottom left
        ['a', 'b', 'c', 'd', 'e', 'f', 'g'], //5 bottom right
        ['a', 'b', 'c', 'd', 'e', 'f', 'g']  //6 bottom
    ]
    var higher_connections = []

    connections.forEach(segment => {
        segment = segment.split('');

        switch (segment.length) {
            case 2:
                // must be a 1 -> so segments must be one of TR, BR
                for (let i = 0; i < mappings.length; i++) {
                    if (i === 2 || i === 5) {
                        mappings[i] = mappings[i].filter(value => segment.includes(value));
                        continue
                    }

                    for (let index = 0; index < segment.length; index++) {

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
                    if (i === 0 || i === 2 || i === 5) {
                        mappings[i] = mappings[i].filter(value => segment.includes(value));
                        continue
                    }

                    for (let index = 0; index < segment.length; index++) {

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
                        mappings[i] = mappings[i].filter(value => segment.includes(value));
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
            case 6:
            case 7:
                higher_connections.push(segment)
                break;

        }

        // console.log(`segment:${segment}\n${mappings.join('\n')}\n`)


    })

    for (let conn = 0; conn < higher_connections.length; conn++) {
        const connection = higher_connections[conn];

        switch (connection.length) {
            case 5:
                // must be 2,3,5 (includes all segments)
                break;

            case 6:
                // must be 0,6,9 (includes all segments)

                // console.log(mappings[2])
                // console.log(mappings[2].filter(value => connection.includes(value)))
                // console.log(connection.filter(value => mappings[2].includes(value)))

                // if it not includes M it must be a 0:
                if (mappings[3].filter(value => connection.includes(value)).length === mappings[3].length - 1) {
                    // filter out all (M)iddle segments
                    mappings[3] = mappings[3].filter(value => !connection.includes(value));
                    // console.log(`after middle Mappings: [${mappings[3]}] connection: ${connection}\n`)
                }

                // if it not includes TR it must be a 6:
                if (mappings[2].filter(value => connection.includes(value)).length === mappings[2].length - 1) {
                    mappings[2] = mappings[2].filter(value => !connection.includes(value));
                }

                // if it not includes BL it must be a 9:
                if (mappings[4].filter(value => connection.includes(value)).length === mappings[4].length - 1) {
                    mappings[4] = mappings[4].filter(value => !connection.includes(value));
                }

                break;

            case 7:
                // must be an 8 (includes all segments)
                break;

        }

    }

    // now calculate TL, BR and B using M, TR and BL respectively
    // TL from M
    mappings[1] = mappings[1].filter(value => !mappings[3].includes(value));

    // BR from TR
    mappings[5] = mappings[5].filter(value => !mappings[2].includes(value));

    // B from BL
    mappings[6] = mappings[6].filter(value => !mappings[4].includes(value));



    return mappings.map((m) => (m.length === 1) ? m[0] : 'failed')

}

function calculate_number(input, mapping) {
    var a = mapping.map((s) => input.includes(s) ? 1 : 0).join('')

    switch (a) {
        case '0010010':
            return 1;

        case '1011101':
            return 2;

        case '1011011':
            return 3;

        case '0111010':
            return 4;

        case '1101011':
            return 5;

        case '1101111':
            return 6;

        case '1010010':
            return 7;

        case '1111111':
            return 8;

        case '1111011':
            return 9;

        case '1110111':
            return 0;

        default:
            break;
    }

    console.log(`invalid number: ${a}`)
}


var sum = 0;

for (let ind = 0; ind < input_data.length; ind++) {
    let a = calc_wire_segment_conn(input_data[ind][0].split(' '))

    var temp_sum = '';

    input_data[ind][1].split(' ').forEach(uncoded_num => {
        var calculated = calculate_number(uncoded_num, a);
        temp_sum = `${temp_sum}${calculated}`
        // console.log(`uncodednum: (${uncoded_num}) and calculated: ${calculated}`)
    });

    sum+= parseInt(temp_sum)

}

console.log(`Total is: ${sum}`)
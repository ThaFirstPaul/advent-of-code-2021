const fs = require("fs");

var input_data = fs.readFileSync('./day4/input.txt').toString().split("\n").map((n) => n);

var bingo_numbers = input_data[0].split(",").map((n) => +n);

// convert the input bingo into an array of matrices of numbers
var bingo_fields = [];
for (let index = 2; index < input_data.length; index += 6) {
    const element = input_data.slice(index, index + 5);
    var bingo_field = [];

    for (let field_index = 0; field_index < element.length; field_index++) {
        bingo_field.push(element[field_index].split(" ").filter(Boolean).map(Number));
    }

    bingo_fields.push(bingo_field);
}

// calculate if a field has a bingo
const check_bingo = function (bingo_field, bingo_field_index) {

    // loop 5 times (once for each row/column)
    for (let index = 0; index < bingo_field.length; index++) {
        
        // check if the row has any bingo (no numbers) 
        const row = bingo_field[index];
        if (row.filter(num => typeof (num) === "number").length === 0) {
            console.log(`Row found: ${row} in bingo field #${bingo_field_index}`)
            return true;
        }

        const column = [
            bingo_field[0][index],
            bingo_field[1][index],
            bingo_field[2][index],
            bingo_field[3][index],
            bingo_field[4][index]
        ]

        if (column.filter(num => typeof (num) === "number").length === 0) {
            console.log(`Column found: ${column} in bingo field #${bingo_field_index}`)
            return true;
        }
    }
    return false;
}

// checks if one of the fields changed has gotten a bingo
const check_win_condition = function (fields_changed) {
    for (let index = 0; index < fields_changed.length; index++) {
        const changed_field_index = fields_changed[index];
        const changed_field = bingo_fields[changed_field_index];

        if (check_bingo(changed_field, changed_field_index)) {
            return changed_field_index;
        }
    }
    return false;
}

// return an array of all indexes of boards where the number was found, and changed
const find_number = function(number){
    // loop through all boards
    var fields_changed = [];
    for (let bingo_field_index = 0; bingo_field_index < bingo_fields.length; bingo_field_index++) {
        const bingo_field = bingo_fields[bingo_field_index];
        
        // loop throug the rows
        for (let row_index = 0; row_index < bingo_field.length; row_index++) {
            const row = bingo_field[row_index];

            // loop through the numbers
            for (let col_index = 0; col_index < row.length; col_index++) {
                const num = row[col_index];
                // if number is found, change it to "found"
                // console.log(`number:${typeof(number)} num:${typeof(num)}`)
                if(number === num){
                    bingo_fields[bingo_field_index][row_index][col_index] = "found";
                    if(!fields_changed.includes(bingo_field_index)){
                        fields_changed.push(bingo_field_index);
                    }
                }
            }
        }
    }

    return fields_changed;
}

// loop through bingo numbers until a win occurs
for (let bingo_number_index = 0; bingo_number_index < bingo_numbers.length; bingo_number_index++) {
    const bingo_number = bingo_numbers[bingo_number_index];
    
    var fields_changed = find_number(bingo_number);
    var win_condition = check_win_condition(fields_changed);
    if(win_condition !== false){
        // calculate sum of the rest of the numbers
        var sum = 0;
        // for each row
        for (let index = 0; index < bingo_fields[win_condition].length; index++) {
            const row = bingo_fields[win_condition][index];
            
            //for each number
            for (let num_index = 0; num_index < row.length; num_index++) {
                const  num = row[num_index];
                if(typeof(num) === "number"){
                    sum += num;
                }
            }
        }

        console.log(`Win condition reached!`);
        console.log(`Bingo num: ${bingo_number}`);
        console.log(`Uncalled numbers sum: ${sum}`);
        console.log(`Answer: ${bingo_number*sum}`);

        
        break;
    } else {
        console.log(`No win.`)
        console.log(`Bingo num: ${bingo_number}\n`);
    }

}

fs.writeFileSync('./day4/output.json', JSON.stringify(bingo_fields).split("]],[[").join("]],\n.\n[[").split("],[").join("],\n["))
// bingo_fields[bingo_fields.length - 1] = 
// [[true, 321, 321, 412312, 214],
// [true, true, true, true, 21312],
// [true, 321, 321, 412312, 214],
// [true, 321, 321, 412, 214],
// [true, 321, 321, 412, 214]]

// console.log(find_number(27));

// console.log(bingo_fields[bingo_fields.length - 1][0]);
// console.log(bingo_fields.length);

// console.log(typeof (bingo_fields[bingo_fields.length - 1][0][0]))
// console.log(check_bingo(bingo_fields[bingo_fields.length - 1],bingo_fields.length - 1))
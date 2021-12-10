const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day10/input.txt').toString().split("\n").map((n) => n.trim());

var error_score = 0;

for (let i = 0; i < input_data.length; i++) {
    const line = input_data[i];
    var char_stack = []

    for (let char_index = 0; char_index < line.length; char_index++) {
        const char = line[char_index];
        var valid = true;
        var last_opened = char_stack.pop()

        switch (char) {
            case '(':
            case '[':
            case '{':
            case '<':
                char_stack.push(last_opened)
                char_stack.push(char)
                break;

            case ')':
                if (last_opened === '(') {
                    break;
                } else {
                    valid = false;
                    error_score += 3
                    break;
                }
            case ']':
                if (last_opened === '[') {
                    break;
                } else {
                    valid = false;
                    error_score += 57
                    break;
                }
                break;
            case '}':
                if (last_opened === '{') {
                    break;
                } else {
                    valid = false;
                    error_score += 1197
                    break;
                }
                break;
            case '>':
                if (last_opened === '<') {
                    break;
                } else {
                    valid = false;
                    error_score += 25137
                    break;
                }
                break;

            default:
                break;
        }

        if (valid === false) { break }

    }
}

console.log(`Final error score = ${error_score}`)

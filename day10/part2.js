const fs = require("fs");

var input_data = fs.readFileSync('./adventofcode/day10/input.txt').toString().split("\n").map((n) => n.trim());

var autocomplete_scores = [];

function get_inverse(char) {
    switch (char) {
        case '(':
            return ')'
        case '[':
            return ']'
        case '{':
            return '}'
        case '<':
            return '>'
    }
}

for (let i = 0; i < input_data.length; i++) {
    const line = input_data[i];
    var valid = true;
    var char_stack = []
    var autocomplete_score = 0;

    for (let char_index = 0; char_index < line.length; char_index++) {
        const char = line[char_index];
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
                    // console.log(`Expected  ${get_inverse(last_opened)}, but found ${char} instead.`)
                    valid = false;
                    error_score += 3
                    // console.log(`Adding: 3`)
                    break;
                }
            case ']':
                if (last_opened === '[') {
                    break;
                } else {
                    // console.log(`Expected  ${get_inverse(last_opened)}, but found ${char} instead.`)
                    valid = false;
                    error_score += 57
                    // console.log(`Adding: 57`)
                    break;
                }
            case '}':
                if (last_opened === '{') {
                    break;
                } else {
                    // console.log(`Expected  ${get_inverse(last_opened)}, but found ${char} instead.`)
                    valid = false;
                    error_score += 1197
                    // console.log(`Adding: 1197`)
                    break;
                }
            case '>':
                if (last_opened === '<') {
                    break;
                } else {
                    // console.log(`Expected  ${get_inverse(last_opened)}, but found ${char} instead.`)
                    valid = false;
                    error_score += 25137
                    // console.log(`Adding: 25137`)
                    break;
                }

            default:
                // console.log(`Could not read char '${char}'`)
                break;

        }

        if (valid === false) { break }
    }

    if (valid === false) { continue }

    var completion = '';

    while(char_stack.length > 1) {
        const top_of_stack = char_stack.pop()
        autocomplete_score *= 5

        switch (top_of_stack) {
            case '(':
                autocomplete_score += 1
                break
            case '[':
                autocomplete_score += 2
                break
            case '{':
                autocomplete_score += 3
                break
            case '<':
                autocomplete_score += 4
                break

        }

        completion = completion + get_inverse(top_of_stack)

    }

    autocomplete_scores.push(autocomplete_score)

}

console.log(`Middle score: ${autocomplete_scores.sort((a,b) => a-b)[(autocomplete_scores.length-1)/2]}`)
const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;
// generates a random holes integer between 10 and 14
const numHoles = Math.floor(Math.random() * 5) + 10;

//Initialise
let field = [];
let playerRow = 0;
let playerCol = 0;

// Creating an empty two-dimensional array and adding the hat and holes to it randomly. 
// It also sets the player's starting position to the top-left corner.;
function generateField() {
    // Create an empty field
    for (let i = 0; i < row; i++) {
        field.push([]);
        for (let j = 0; j < col; j++) {
            field[i].push(fieldCharacter);
        }
    }

    // Add the hat and holes randomly
    field[Math.floor(Math.random() * row)][Math.floor(Math.random() * col)] = hat;
    for (let i = 0; i < numHoles; i++) {
        let holeRow, holeCol;
        do {
            holeRow = Math.floor(Math.random() * row);
            holeCol = Math.floor(Math.random() * col);
        } while (field[holeRow][holeCol] !== fieldCharacter);
        // Keep track of all location of holes
        field[holeRow][holeCol] = hole;
    }

    // Set the player's starting position
    field[playerRow][playerCol] = pathCharacter;
}
// Prints the current state of the game field to the console
function printField() {
    clear();
    console.log(field.map(row => row.join('')).join('\n'));
}
// It prompts the user for input and validates it to ensure it is a valid move. 
// If the move is valid and within the boundaries of the game field, it updates the player's position on the field and continues the game. 
// If the move results in the player falling down a hole, the game ends.
// If the move results in the player finding the hat, the game ends;
function movePlayer() {
    const move = prompt('Which way to ^(Hat)? (u=Up, d=Down, l=Left, r=Right): ').toLowerCase();
    let newRow = playerRow, newCol = playerCol;
    switch (move) {
        case 'u':
            newRow--;
            break;
        case 'd':
            newRow++;
            break;
        case 'l':
            newCol--;
            break;
        case 'r':
            newCol++;
            break;
        default:
            console.log('Enter only letter u or d or l or r)');
            movePlayer();
            return;
    }
    if (newRow < 0 || newRow >= row || newCol < 0 || newCol >= col) {
        console.log('Out of bounds - Game End!');
        return;
    }
    if (field[newRow][newCol] === hole) {
        console.log('Sorry, you fell down a hole!');
        return;
    }
    if (field[newRow][newCol] === hat) {
        console.log('Congrats, you found your hat!');
        return;
    }
    // Replace player old position with ░
    field[playerRow][playerCol] = fieldCharacter;
    // Player new position with *
    field[newRow][newCol] = pathCharacter;
    playerRow = newRow;
    playerCol = newCol;
    playGame();
}

function playGame() {
    printField();
    movePlayer();
}

generateField();
playGame();

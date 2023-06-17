// This is a slot-machine based betting game which allows the user to deposit money, bet on a number of lines,
// spin the slot machine, and win money based on the symbols that appear on the reels. The user can continue 
// to play until they run out of money or choose to quit.


// Code workflow:
// 1. Deposit some money into the machine
// 2. Determine the number of lines to bet on
// 3. Collect the bet amount from the user
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings.
// 7. Play again.

// The game uses the following symbols and their corresponding values:
// A: 5
// B: 4
// C: 3
// D: 2

const prompt = require('prompt-sync')({sigint: true});

const ROWS=3;
const COLS=3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};



// 1. Deposit some money into the machine

const deposit = () => {
    while(true){
        const depositAmount = Number(prompt('How much would you like to deposit? '));
        const numberDepositAmount= parseFloat(depositAmount); 

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log('You have either entered an invalid amount or an amount less than or equal to 0. Please try again.');
        }

        else{
            console.log(`You have deposited $${numberDepositAmount} into the machine.`);
            return numberDepositAmount;
        }
    }
};


// 2. Determine the number of lines to bet on

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines you want to bet on (1-3):  ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || (numberOfLines <= 0) || (numberOfLines > 3)) {
            console.log("Invalid number of lines. Try again.");
        }

        else {
            console.log("You are betting on " + numberOfLines + " lines.");
            return numberOfLines;
        }
    }

};



// 3. Collect the bet amount from the user

const getBet= (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line :  ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || (numberBet <= 0) || (numberBet > (balance/lines))) {
            console.log("Invalid bet. Try again.");
        }

        else {
            console.log("You are betting $" + numberBet + ".");
            return numberBet;
        }
    }
};

// 4. Spin the slot machine

const spin = () => {
    const symbols = [];
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels= [];

    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols= [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};


// 5. Check if the user won

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of rows.entries()) {
            rowString += symbol + " ";
            if(i !== rows.length - 1) {
                rowString += "| ";
            }
        }
        console.log(rowString);
    }
};


// 6. Give the user their winnings.

const getWinnings = (rows, bet, lines) => {
    let winnings=0;

    for (let row=0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols) {
            if (symbol !== symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};


// 7. Repeat Until the user runs out of money or chooses to quit

const gameLoop = () => {
    let balance = deposit();

    while (true) {
        console.log("Your balance is $" + balance.toString() + ".");
        const numberOfLines = getNumberOfLines();
        const bet= getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log ("You won $" + winnings.toString() + "!");

        if (balance <= 0) {
            console.log("You are out of money. Game over!");
            break;
        }

        const playAgain = prompt("Do you want to play again? (y/n) ");
        if (playAgain !== "y") {
            break;
        }
    }
};


gameLoop();





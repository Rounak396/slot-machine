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

const getLines = () => {
    while(true){
        const lines = Number(prompt('How many lines would you like to bet on? Please enter a number between 1 and 8. '));
        const numberLines= parseInt(lines); 

        if (isNaN(numberLines) || numberLines <= 0 || numberLines > 8){
            console.log('You have either entered an invalid number of lines or a number of lines less than or equal to 0. Please try again.');
        }

        else{
            console.log(`You have bet on ${numberLines} lines.`);
            return numberLines;
        }
    }
};


// 3. Collect the bet amount from the user

const getBet = (depositAmount) => {
    while(true){
        const betAmount = Number(prompt('How much would you like to bet? '));
        const numberBetAmount= parseFloat(betAmount); 

        if (isNaN(numberBetAmount) || numberBetAmount <= 0 || numberBetAmount > depositAmount){
            console.log('You have either entered an invalid bet amount or a bet amount less than or equal to 0 or greater than your deposit amount. Please try again.');
        }

        else{
            console.log(`You have bet $${numberBetAmount}.`);
            return numberBetAmount;
        }
    }
};
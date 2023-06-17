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

let randomLoc = Math.floor(Math.random() * 5); // random int range 0-4
let location1 = randomLoc;
let location2 = randomLoc + 1;
let location3 = randomLoc + 2;

let guess;
let guesses = 0;

let hits = 0;

let isSunk = false;

while (!isSunk){
    guess = prompt("Ready, aim, fire! (enter a number from 0-6)");

    if (!(guess >= 0 && guess <= 6 ) || guess === undefined) {
        alert("please enter a valid cell number!");
    } else {
        guesses = guesses + 1;
        if (guess == location1 || guess == location2 || guess == location3){
            alert("HIT!");
            hits = hits + 1;
            if (hits === 3) {
                isSunk = true;
                alert("You sank my battleship!");
            }
        }
        else {
            alert("MISS!");
        }
    }
}

let stats = "You took " + guesses + " guesses to sink the battleship, " +
    "which means your shooting accuracy was " + (3/guesses);
alert(stats);
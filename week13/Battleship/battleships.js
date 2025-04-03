let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [
        {locations: [0, 0, 0], hits:["","",""]},
        {locations: [0, 0, 0], hits:["","",""]},
        {locations: [0, 0, 0], hits:["","",""]}
    ],
    fire: function(guess){
        for (let i = 0; i < this.numShips; i++){
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if (ship.hits[index] === "hit"){
                view.displayMessage("Location already been hit");
                return true;
            } else if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");

                if (this.isSunk(ship)){
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
    },
    isSunk: function(ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if(ship.hits[i] !== "hit") {
                return false;
            }
        }
    },
    generateShipLocations: function(){
        let locations;
        for (let i = 0; i < this.numShips; i++){
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
        }
    },
    generateShip: function(){
        let direction = Math.floor(Math.random() * 2);
        let row, col;

        if (direction === 1){ // horizontal
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else { // vertical
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }

        let newShipLocations = [];
        for (let i = 0; i < this.shipLength; i++){
            if (direction === 1){
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },
    collision: function(locations){
        for (let i = 0; i < this.numShips; i++){
            let ship = this.ships[i];
            for (let j = 0; j < locations.length; j++){
                if (ship.locations.indexOf(locations[j]) >=0){
                    return true;
                }
            }
        }
    }
};

let view = {
    displayMessage: function(msg) {
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;

    },

    displayHit: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");

    },

    displayMiss: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

let controller = {
    guesses: 0,
    processGuess: function(guess) {
        let location = parseGuess(guess);
        if (location){
            this.guesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips){
                view.displayMessage("All battleships sunken with " + this.guesses + " guesses");
            }
        }
    }
}

function parseGuess(){
    let alphabet = ["A","B","C","D","E","F","G"];
    if (guess === null || guess.length !== 2){
        alert("Re-enter a letter and a digit on the board");
    } else {
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let col = guess.charAt(1);
        if (isNaN(row) || isNaN(col)){
            alert("Input is not found on the board");
        } else if (row < 0 || row >= model.boardSize || col < 0 || col >= model.boardSize){
            alert("Off limit")
        } else {
            return row + col;
        }
    }
}

// helper function
function handleFireButton() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value.toUpperCase();

    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeypress(e) {
    let fireButton = document.getElementById("fireButton");

    if (e.key === 'Enter') {
        fireButton.click();
        return false;
    }
}

window.onload = init;

function init() {
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton();

    // handle "return" key press
    let guessInput = document.getElementById("guessInput");
    guessInput.onkeydown = handleKeypress();
}
const playerScoreBoxes = document.querySelectorAll(".playerScoreBox")
const playerDisplayScores = document.querySelectorAll(".pointDisplay label");
const playerButtonCollections = document.querySelectorAll(".buttonsDiv");

const startingScores = {
    "base": 50,
    "alignment": 64,
    "alliance": 68,
    "coalition": 62,
    "pact": 66,
    "union": 60,
    "unity": 70,
    "lostFleet": 72
}

const commanderList = ["base", "alignment", "alliance", "coalition", "pact", "union", "unity", "lostFleet"];

let playerCommanders = ["base", "base"];
let playerScores = [0, 0];

function resetScores() {
    for (let i = 0; i < playerScores.length; i++) {
        playerScores[i] = startingScores[playerCommanders[i]];
        playerDisplayScores[i].innerText = playerScores[i];
    }
}

// Reset scores on page load.
resetScores();

// Add reset button functionality
const resetButton = document.querySelector("#resetButton");

resetButton.addEventListener("click", function (e) {
    resetScores();
});

// Add event listeners to the increase and decrease buttons
for (let i = 0; i < playerButtonCollections.length; i++) {
    for (let child of playerButtonCollections[i].children) {
        if (child.classList.contains("inc")) {
            child.addEventListener("click", function (e) {
                playerScores[i] += 1;
                playerDisplayScores[i].innerText = playerScores[i];
            })
        } else {
            child.addEventListener("click", function (e) {
                playerScores[i] -= 1;
                playerDisplayScores[i].innerText = playerScores[i];
            });

        }
    }
}

// Allow for manual score input by clicking on score
const playerScoreInputs = document.querySelectorAll(".playerScoreInput")

for (let i = 0; i < playerScoreInputs.length; i++) {
    playerScoreInputs[i].addEventListener("input", function (e) {
        if (e.target.value.length < 1) {
            playerDisplayScores[i].textContent = playerScores[i];
            playerDisplayScores[i].select()

        } else {
            playerDisplayScores[i].textContent = e.target.value;
            playerScores[i] = parseInt(playerDisplayScores[i].innerText);
        }
    })
}



// Toggle textbox focus when clicking on player names
const playerNamePlates = document.querySelectorAll("label h2")
const playerNameInputs = document.querySelectorAll(".playerNameInput");

let defaultPlayerNames = ["Player 1", "Player 2"];

for (let i = 0; i < playerNameInputs.length; i++) {
    playerNameInputs[i].addEventListener("input", function (e) {
        if (e.target.value.length < 1) {
            playerNamePlates[i].textContent = defaultPlayerNames[i];
            playerNamePlates[i].select()
        } else {
            playerNamePlates[i].textContent = e.target.value;
        }
    })
}

// Add visual indication of focus
document.body.addEventListener("click", function () {
    for (let i = 0; i < playerNamePlates.length; i++) {
        if (document.activeElement === playerNameInputs[i]) {
            playerNamePlates[i].classList.add("selectedText")
        } else if (document.activeElement === playerScoreInputs[i]) {
            playerDisplayScores[i].classList.add("selectedText");
        } else {
            playerNamePlates[i].classList.remove("selectedText")
            playerDisplayScores[i].classList.remove("selectedText");

        }
    }
})


function updateProfiles() {
    for (let i = 0; i < playerCommanders.length; i++) {
        classList = playerScoreBoxes[i].children[1].classList;
        for (let j = 1; j < classList.length; j++) {
            playerScoreBoxes[i].children[1].classList.remove(classList[j]);
        }
        playerScoreBoxes[i].children[1].classList.add(`${playerCommanders[i]}`);
    }
}

// Add functionality to change commanders buttons
const changeCommanders = document.querySelector("#charSelectButton");
const characterBoxContainers = document.querySelectorAll(".characterSelectBox");

changeCommanders.addEventListener("click", function () {
    for (let i = 0; i < characterBoxContainers.length; i++) {
        characterBoxContainers[i].classList.toggle("hidden");
        playerScoreBoxes[i].classList.toggle("hidden");

        updateProfiles();

    }
})


// Allow for commander selection
for (let i = 0; i < characterBoxContainers.length; i++) {
    for (let j = 0; j < characterBoxContainers[i].children.length; j++) {
        characterBoxContainers[i].children[j].addEventListener("click", function (e) {
            resetActiveCharacterBox(i);
            this.classList.toggle("activeCharBox");
            for (let char in startingScores) {
                if (this.classList.contains(char)) {
                    playerCommanders[i] = char;
                    resetScores();
                }
            }
        })
}
}


function resetActiveCharacterBox (player) {
    for (let i = 0; i < characterBoxContainers[player].children.length; i++) {
        characterBoxContainers[player].children[i].classList.remove("activeCharBox")
    }
}
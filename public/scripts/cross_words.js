const rawSolution = document.querySelector("#rawPuzzle");
rawSolution.remove()
const rawBank = document.querySelector("#rawBank");
rawBank.remove()
const BANK = rawBank.innerText.split(",");
const SOLUTION = rawSolution.innerText.split(",");
const HEIGHT = SOLUTION.length;
const WIDTH = SOLUTION[0].length;
const GRID = document.createElement("div")
const gridDisplay = document.querySelector("#grid");

let rows = [];
let WORKING_GRID = Array(HEIGHT);

function buildGrid() {
    for (let i = 0; i < HEIGHT; i++) {
        row = [];
        for (let j = 0; j < WIDTH; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("ondrop", "drop_handler(event)")
            cell.setAttribute("ondragover", "dragover_handler(event)")
            if (j === 0) {
                cell.classList.add("rowStart")
            }
            row.push(cell);
            GRID.append(cell)
        }
        rows.push(row)
    }
    GRID.setAttribute("id", "puzzleGrid");
    gridDisplay.append(GRID)
}

buildGrid()

// Maintain a working list of words in in the grid.
function updateWorking() {
    for (let i = 0; i < HEIGHT; i++) {
        let workingRow = []
        for (cell of rows[i]) {
            workingRow.push(cell.innerText);
        }
        WORKING_GRID[i] = workingRow.join("");
    }
}

// Create visual element for word bank
const wordBank = [];
const wordBankDisplay = document.querySelector("#wordBank");

for (let i = 0; i < BANK.length; i++) {
    selectableWord = document.createElement("span")
    selectableWord.innerText = BANK[i].toUpperCase()
    selectableWord.classList.add("selectableWord")
    selectableWord.setAttribute("draggable", "true")
    selectableWord.addEventListener("dragstart", dragstart_handler);
    wordBankDisplay.append(selectableWord)
}

wordBankDisplay.append(wordBank)

// Update word bank such that used words are grey and unused words are yellow.
function updateBank() {
    for (let word of wordBankDisplay.children) {
        if (WORKING_GRID.includes(word.innerText)) {
            word.style.color = "grey";
        } else {
            word.style.color = "";
        }
    }
}

// Drag and Drop Interface
function dragstart_handler(e) {
    e.dataTransfer.setData("text/plain", e.target.innerText);
    e.dataTransfer.dropEffect = "move"
}

function dragover_handler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

function drop_handler(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain")
    e.target.innerText = data
    placeWord(data, e.target)

}


// Place word
function placeWord(word, target) {

    if (WORKING_GRID.includes(word)) {
        for (r of rows) {
            row_word = Array(WIDTH);
            for (cell in r) {
                row_word[cell] = r[cell].innerText
            }
            if (row_word.join("") === word) {
                for (cell of r) {
                    cell.innerText = ""
                }
            }
        }

    }
    updateWorking();


    const row = []

    function getRow(tar) {
        if (row.length === word.length) {
            return
        } else if (row.length === 0) {
            if (tar.classList.contains("rowStart")) {
                row.push(tar)
                getRow(tar.nextElementSibling)
            } else {
                getRow(tar.previousElementSibling)
            }
        } else {
            row.push(tar)
            getRow(tar.nextElementSibling)
        }
    }
    getRow(target)

    for (let i = 0; i < word.length; i++) {
        row[i].innerText = word[i];
        row[i].setAttribute("draggable", true);
        row[i].addEventListener("dragstart", function(e) {
            e.dataTransfer.setData("text/plain", word);
            e.dataTransfer.dropEffect = "move"
        })
        row[i].setAttribute("ondrop", "drop_handler(event)")
        row[i].setAttribute("ondragover", "dragover_handler(event)");
    }
    updateWorking();
    updateBank();
    checkSolution();
}



// Flash if user has submited the right combination
function victoryAnimation() {
    for (cell of GRID.children) {
        cell.classList.add("victory")
    }
    setTimeout(() => {
        for (cell of GRID.children) {
            cell.classList.remove("victory")
        }
    }, 300)
}

// Compare WORKING_GRID array with SOLUTION array
function checkSolution() {
    updateWorking();

    if (JSON.stringify(WORKING_GRID) === JSON.stringify(SOLUTION)) {
        victoryAnimation()
    }

}

function showSolution() {
    for (let i = 0; i < SOLUTION.length; i++) {
        placeWord(SOLUTION[i], GRID.children[i * 6])
    }
}

// Event listeners for menus
const resetButton = document.querySelector("#reset");

function clearBoard() {
    for (let cell of puzzleGrid.children) {
        cell.innerText = ""
    }
}

resetButton.addEventListener("click", function () {
    clearBoard();
    updateWorking();
    updateBank();
})

const hintButton = document.querySelector("#hint");

hintButton.addEventListener("click", function () {
    if (wordBankDisplay.children.length > HEIGHT) {
        let randomWord = wordBankDisplay.children[Math.floor(Math.random() * wordBankDisplay.children.length)];

        while (SOLUTION.includes(randomWord.innerText)) {
            randomWord = wordBankDisplay.children[Math.floor(Math.random() * wordBankDisplay.children.length)];
        }
        randomWord.remove();
    } else {
        let randomIndex = Math.floor(Math.random() * SOLUTION.length);

        while (SOLUTION[randomIndex] === WORKING_GRID[randomIndex]) {
            randomIndex = Math.floor(Math.random() * SOLUTION.length)
        }
        WORKING_GRID[randomIndex] = SOLUTION[randomIndex];
        updateBank();
        placeWord(SOLUTION[randomIndex], GRID.children[randomIndex * 6]);
    }
});

const solveButton = document.querySelector("#solve");

solveButton.addEventListener("click", function () {
    showSolution();
    updateWorking();
    checkSolution();
})

let randomIndex = Math.floor(Math.random() * SOLUTION.length);

while (SOLUTION[randomIndex] === WORKING_GRID[randomIndex]) {
    randomIndex = Math.floor(Math.random() * SOLUTION.length)
}

WORKING_GRID[randomIndex] = SOLUTION[randomIndex];
updateBank();
placeWord(SOLUTION[randomIndex], GRID.children[randomIndex * 6]);
BOARD = document.querySelector("#board");
GRID_SIZE = 5;
SOLUTION = Array()
ALL_CELLS = Array()
moves = 0;
const movesDisplay = document.querySelector("#movesDisplay");

function getCellColumn(cell) {
    for (let i = 0; i < cell.parentElement.children.length; i++) {
        if (cell.parentElement.children[i] === cell) {
            return i
        }
    }
    return null
}

function flipCell(cell) {
    cell.classList.remove("solutionVisible")
    if (cell.classList.contains("active")) {
        cell.classList.remove("active")
    } else {
        cell.classList.add("active")
    }
}


function getCellGroup(cell) {
    let group = []
    group.push(cell)

    if (cell.parentElement.previousElementSibling != null) {
        group.push(cell.parentElement.previousElementSibling.children[getCellColumn(cell)])
    }
    if (cell.parentElement.nextElementSibling != null) {
        group.push(cell.parentElement.nextElementSibling.children[getCellColumn(cell)])
    }
    if (cell.nextElementSibling != null) {
        group.push(cell.nextElementSibling)
    }
    if (cell.previousElementSibling != null) {
        group.push(cell.previousElementSibling)
    }
    return group
}

function flipCellGroup(cell) {
    cellGroup = getCellGroup(cell);
    for (let c of cellGroup) {
        flipCell(c)
    }
}

function clearPuzzle() {
    for (let cell of ALL_CELLS) {
        cell.classList.remove("active");
    }
}
function generateGrid(size) {
    for (let i = 0; i < size; i++) {
        let row = document.createElement("DIV");
        row.classList.add("row")
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("DIV");
            cell.classList.add("cell")
            ALL_CELLS.push(cell)
            row.append(cell)
        }
        BOARD.append(row)
    }
}

function generatePuzzle(size) {
    SOLUTION = []
    for (let i = 0; i < Math.pow(size, 2); i++) {
        SOLUTION.push(Math.round(Math.random()))
    }
}

function loadPuzzle() {
    if (ALL_CELLS.length != SOLUTION.length) {
        console.error("Bad puzzle length")
        console.log(ALL_CELLS)
        console.log(SOLUTION)

    } else {
        for (let i = 0; i < SOLUTION.length; i++) {
            if (SOLUTION[i] === 1) {
                flipCellGroup(ALL_CELLS[i])
            }
        }
    }



}

function showSolution() {
    for (let i = 0; i < SOLUTION.length; i++) {
        if (SOLUTION[i] === 1) {
            ALL_CELLS[i].classList.add("solutionVisible")
        }
    }
}

function hideSolution() {
    for (let cell of ALL_CELLS) {
        cell.classList.remove("solutionVisible")
    }
}

function addEventListenersToCells() {
    for (let cell of ALL_CELLS) {
        cell.addEventListener("click", function (e) {
            flipCellGroup(e.target);
            moves += 1;
            movesDisplay.innerText = moves;
        })
    }
}
generateGrid(GRID_SIZE)
generatePuzzle(GRID_SIZE)
loadPuzzle()
addEventListenersToCells()

const resetButton = document.querySelector("#reset");

resetButton.addEventListener("click", function () {
    clearPuzzle()
    loadPuzzle();
    moves = 0;
    movesDisplay.innerText = moves;
})

const toggleSolution = document.querySelector("#toggleSolution");

toggleSolution.addEventListener("click", function () {
    if (toggleSolution.innerText === "Show Solution") {
        toggleSolution.innerText = "Hide Solution";
        showSolution();
    } else {
        toggleSolution.innerText = "Show Solution";
        hideSolution();
    }
})

const newPuzzleButton = document.querySelector("#newPuzzle");
newPuzzleButton.addEventListener("click", function () {
    ALL_CELLS = []
    BOARD.innerText = ""
    generateGrid(GRID_SIZE);
    generatePuzzle(GRID_SIZE);
    loadPuzzle();
    moves = 0;
    movesDisplay.innerText = moves;
})
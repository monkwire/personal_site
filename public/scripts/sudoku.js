const BOARD = document.querySelector("#board")
const GRID_SIZE = 9
let allCells = Array();
let rows = Array(GRID_SIZE);
let activeCell = null;
const resetButton = document.querySelector("#resetButton")

const rawGrid = document.querySelector("#rawPuzzle");
rawGrid.remove()
const puzzle = rawGrid.innerText.split(",");

// Build grid
for (let i = 0; i < GRID_SIZE; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    rows[i] = row;
    for (let j = 0; j < GRID_SIZE; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell")
        row.append(cell)
        allCells.push(cell)
    }
    BOARD.append(row);
}

// Configure Reset Button

// Clear selection
function clearSelection() {
    activeCell = null
    clearHighlights()
    for (let cell of allCells) {
        cell.classList.remove("selected")
    }
}

// Set selection function
function selectCell(cell) {
    clearSelection()
    highlightMatching(cell)
    activeCell = cell;
    activeCell.classList.add("selected");
}


// Get cell column
function getColumn(cell) {
    let row = cell.parentElement.children;
    for (let i = 0; i < row.length; i++) {
        if (row[i] === cell) {
            return i
        }
    }
    return false
}

// Input number function
function inputNumber(cell, number) {
    if (cell.classList.contains("locked")) {
        return false
    } else {
        cell.innerText = number;
        return true
    }
}

function highlightMatching(cell) {
    for (let c of allCells) {
        if (cell.innerText === c.innerText) {
            c.classList.add("matching")
        }
    }
}

function clearHighlights() {
    for (let cell of allCells) {
        cell.classList.remove("matching")
    }
}

// Mark incorrect
function markIncorrect(c) {
    if (!c.classList.contains("locked")) {
        if (c.childElementCount === 0) {
            c.classList.add("incorrect")
        }
    }
}

function clearIncorrectMarkings() {
    for (let cell of allCells) {
        cell.classList.remove("incorrect")
    }
}

// Cell checking
function checkRow(cell) {
    let seen = []
    let problemNumbers = []
    for (let c of cell.parentElement.children) {
        if (seen.includes(c.innerText)) {
            problemNumbers.push(c.innerText)
        } else {
            if (c.innerText.length >= 1) {
                seen.push(c.innerText)
            }
        }
    }
    for (let problem of problemNumbers) {
        for (let c of cell.parentElement.children) {
            if (c.innerText === problem) {
                markIncorrect(c)
            }
        }
    }
}


function checkColumn(cell) {
    let colIndex = getColumn(cell);
    let seen = [];
    let problemNumbers = [];

    for (row of rows) {
        if (seen.includes(row.children[colIndex].innerText)) {
            problemNumbers.push(row.children[colIndex].innerText)
        } else {
            if (row.children[colIndex].innerText.length >= 1)
                seen.push(row.children[colIndex].innerText)
        }
    }
    for (let problem of problemNumbers) {
        for (let row of rows) {
            if (problemNumbers.includes(row.children[colIndex].innerText)) {
                markIncorrect(row.children[colIndex])
            }
        }
    }
}

function getBlock(cell) {
    let cellIndex = null

    for (let i = 0; i < allCells.length; i++) {
        if (cell === allCells[i]) {
            cellIndex = i
        }
    }

    let row = Math.floor(cellIndex / 9);
    let col = getColumn(allCells[cellIndex]);
    block = ((row - (row % 3) + Math.floor(col / 3)))
    return block
}


function checkBlock(cell) {
    let block = []
    let blockID = getBlock(cell);

    for (let cell of allCells) {
        if (getBlock(cell) === blockID) {
            block.push(cell)
        }
    }

    let seen = []
    let problemNumbers = []
    for (let cell of block) {
        if (seen.includes(cell.innerText)) {
            problemNumbers.push(cell.innerText)
        } else {
            if (cell.innerText.length >= 1) {
                seen.push(cell.innerText)
            }
        }
    }
    for (let problem of problemNumbers) {
        for (let cell of block) {
            if (cell.innerText === problem) {
                markIncorrect(cell)
            }
        }
    }
}

function victoryAnimation() {
    for (let cell of allCells) {
        cell.classList.add("victory")
    }
    setTimeout(() => {
        for (let cell of allCells) {
            cell.classList.remove("victory")
        }
    }, 400);
}

function checkAll() {
    clearIncorrectMarkings()


    for (let i = 0; i < GRID_SIZE; i++) {
        checkRow(rows[i].children[0])
        checkColumn(allCells[i])
    }
    const blocksToCheck = [0, 3, 6, 27, 30, 33, 54, 57, 60]
    for (let i of blocksToCheck) {
        checkBlock(allCells[i])
    }
    let mistakesFound = false;
    let emptysquares = false;
    for (let cell of allCells) {
        if (cell.classList.contains("incorrect")) {
            mistakesFound = true
            break
        }
        else if (cell.innerText.length === 0) {
            emptysquares = true
            break
        }
    }
    if (mistakesFound === false && emptysquares === false) {
        victoryAnimation()
    }
}

function getNextEmptyCell(cell) {
    cellIndex = 0;
    for (let i = 0; i < allCells.length; i++) {
        if (allCells[i] === cell) {
            cellIndex = i;
            break
        }
    }
    for (let i = cellIndex + 1; i < allCells.length; i++) {
        if (allCells[i].innerText.length === 0) {
            selectCell(allCells[i])
            return
        }
    }
}

function addPencilMarkings(cell) {
    let pencilContainer = document.createElement("DIV");
    pencilContainer.classList.add("pencilContainer")
    for (let i = 0; i < GRID_SIZE; i++) {
        let pencilCell = document.createElement("DIV")
        pencilCell.classList.add("pencilCell")
        pencilCell.innerText = ""
        pencilContainer.append(pencilCell)
    }
    cell.append(pencilContainer)
}

function markPencil(cell, val) {
    if (cell.childElementCount === 0 && cell.innerText != "") {
        return
    } else if (cell.childElementCount === 1) {
        if (cell.childElementCount === 1) {
            for (let i = 0; i < cell.firstChild.children.length; i++) {
                if (i + 1 === val) {
                    cell.firstChild.children[i].innerText = i + 1
                }
            }
        } else {
            addPencilMarkings(cell)
            markPencil(cell, val)
        }
    } else if (cell.innerText === "") {
        addPencilMarkings(cell)
        markPencil(cell, val)
    }
}

function hidePencilMarkings(cell) {
    if (cell.children.length === 1) {
        cell.firstChild.classList.add("hidden")
    }

}

function resetPuzzle() {
    for (let cell of allCells) {
        if (!cell.classList.contains("locked")) {
            cell.innerText = ""
        }
    }
    clearHighlights()
    clearIncorrectMarkings()
    clearSelection()
}

// Add event listeners to the body
document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("cell")) {
        selectCell(e.target)
    } else if (e.target.classList.contains("numButton")) {
        selectCell(activeCell)
    } else if (e.target.classList.contains("pencilCell")) {
        selectCell(e.target.parentElement.parentElement)
    } else if (e.originalTarget.id === "pencilToggle") {
        if (activeCell != null) {
            selectCell(activeCell)
        }
    } else {
        console.log("else")
        clearSelection()
        clearHighlights()
    }
})

document.body.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "d") {
        if (activeCell.nextElementSibling != null) {
            selectCell(activeCell.nextElementSibling)
        }
    } else if (e.key === "ArrowLeft" || e.key === "a") {
        if (activeCell.previousElementSibling != null) {
            selectCell(activeCell.previousElementSibling)
        }
    } else if (e.key === "ArrowUp" || e.key == "w") {
        if (activeCell.parentElement.previousElementSibling != null)
            selectCell(activeCell.parentElement.previousElementSibling.children[getColumn(activeCell)])
    } else if (e.key === "ArrowDown" || e.key === "s") {
        if (activeCell.parentElement.nextElementSibling != null)
            selectCell(activeCell.parentElement.nextElementSibling.children[getColumn(activeCell)])
    } else if (Number.isInteger(parseInt(e.key))) {
        if (activeCell != null) {
            inputNumber(activeCell, parseInt(e.key))
            checkAll()
            highlightMatching(activeCell)
        }
    } else if (e.key === "Backspace" || e.key === "Delete") {
        if (activeCell != null) {
            if (!activeCell.classList.contains("locked")) {
                activeCell.innerText = "";
                checkAll()
            }
        }
    } else if (e.key === "Tab") {
        getNextEmptyCell(activeCell);
    } else if (e.shiftKey) {
        const numMaps = {
            "!": 1,
            "@": 2,
            "#": 3,
            "$": 4,
            "%": 5,
            "^": 6,
            "&": 7,
            "*": 8,
            "(": 9
        };
        markPencil(activeCell, numMaps[e.key])
    }
})

resetButton.addEventListener("click", function () {
    resetPuzzle();
})

function enumerateCells() {
    for (let i = 0; i < allCells.length; i++) {
        let row = Math.floor(i / 9);
        let col = getColumn(allCells[i]);
        allCells[i].innerText = ((row - (row % 3) + Math.floor(col / 3)))
    }
}



function loadPuzzle(puzzle) {
    if (puzzle.length != allCells.length) {
        console.log("Error: puzzle wrong length")
    } else {
        for (let i = 0; i < puzzle.length; i++) {
            if (puzzle[i] != 0) {
                allCells[i].innerText = puzzle[i]
                allCells[i].classList.add("locked")
            }
        }
    }
}
loadPuzzle(puzzle)

// Configure mobile inputs
pencilInput = false;

const pencilToggle = document.querySelector("#pencilToggle");

pencilToggle.addEventListener("click", function () {
    if (pencilInput === false) {
        pencilToggle.innerText = "Use Pen";
        pencilToggle.classList.add("pencilToggleTrue");
        pencilInput = true;
    } else {
        pencilToggle.innerText = "Use Pencil";
        pencilToggle.classList.remove("pencilToggleTrue");
        pencilInput = false;
    }
})

const numberButtons = document.querySelector("#numberButtons");
function loadNumberPad() {
    for (let i = 1; i < 10; i++) {
        let numButton = document.createElement("DIV");
        numButton.classList.add("numButton");
        numButton.innerText = i

        numButton.addEventListener("click", function () {
            if (activeCell != null) {
                if (pencilInput === false) {
                    inputNumber(activeCell, i)
                } else {
                    markPencil(activeCell, i)
                }
                checkAll()
                highlightMatching()
            }
        })
        numberButtons.append(numButton)
    }
    let deleteButton = document.createElement("DIV");
    deleteButton.classList.add("numButton");
    deleteButton.innerText = "⌫"
    deleteButton.addEventListener("click", function () {
        if (activeCell != null) {
            if (!activeCell.classList.contains("locked")) {
                activeCell.innerText = "";
                checkAll()
            }
        }
    })
    numberButtons.append(deleteButton)
}


loadNumberPad()
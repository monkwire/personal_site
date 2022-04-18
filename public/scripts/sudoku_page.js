/* Features to add: 
    - timer -> start/pause button
    - add functionality to new puzzle button
    - solution checker -> victory animation
    - puzzle generator
    - pencil markers
*/

// Get starting puzzle data from embedded JS in HTML page.
const rawGrid = document.querySelector("#rawPuzzle");
rawGrid.remove()
const start_grid = rawGrid.innerText.split(",");

// Build board
const board = document.querySelector("#board");
class Cell {
    constructor(val, row, col, block, locked) {
        this.val = val
        this.row = row;
        this.col = col;
        this.block = block;
        this.locked = locked;
    }
}
let cells = Array();
let displayCells = Array();
let selectedCell = Array();
let rows = Array();
let cols = Array();
let blocks = Array();
let subCells = Array();
for (let i = 0; i < 81; i++) {
    subCells.push(new Array);
    for (let j = 0; j < 9; j++) {
        subCells[i].push(false);
    }
}

for (let i = 0; i < 9; i++) {
    rows.push(new Array())
    cols.push(new Array())
    blocks.push(new Array())
}

function checkCell(cell) {
    for (let i = 0; i < 9; i++) {
        if (cell.val === rows[cell.row][i].val && i != cell.col) {
            selectedCell[1].classList.add("incorrectEntry")
            displayCells[cells.indexOf(rows[cell.row][i])].classList.add("incorrectSection");
        }
        if (cell.val === cols[cell.col][i].val && cell.row != i) {
            selectedCell[1].classList.add("incorrectEntry")
            displayCells[cells.indexOf(cols[cell.col][i])].classList.add("incorrectSection");
        }
        if (cell.val === blocks[cell.block][i].val && blocks[cell.block][i] != cell) {
            selectedCell[1].classList.add("incorrectEntry")
            displayCells[cells.indexOf(blocks[cell.block][i])].classList.add("incorrectSection");

        } else {
            selectedCell[1].classList.remove("incorrectEntry")
            continue
        }
        return
    }
}
function getDisplayCell(cell) {
    const displayCell = displayCells[cells.indexOf(cell)]
    return displayCell
}

function inputNum(input) {
    selectedCell[1].innerText = input;
    selectedCell[0].val = input;
    checkCell(selectedCell[0]);
}
function deleteSelectedCell() {
    let lastVal = selectedCell[0].val;
    if (selectedCell[1].classList.contains("incorrectEntry")) {
        selectedCell[1].classList.remove("incorrectEntry");
        for (let i = 0; i < 9; i++) {
            if (rows[selectedCell[0].row][i].val === lastVal) {
                displayCells[cells.indexOf(rows[selectedCell[0].row][i])].classList.remove("incorrectSection");
            }
            if (cols[selectedCell[0].col][i].val === lastVal) {
                displayCells[cells.indexOf(cols[selectedCell[0].col][i])].classList.remove("incorrectSection");
            }
            if (blocks[selectedCell[0].block][i].val === lastVal) {
                displayCells[cells.indexOf(blocks[selectedCell[0].block][i])].classList.remove("incorrectSection");
            }
        }
    }
    selectedCell[1].innerText = " ";
    selectedCell[0].val = null;

}

function inputToCell(input, isShift) {
    console.log("isShift: ", isShift)
    if (selectedCell[0].locked === false) {
        if (isShift) {
            console.log(input)
        }
        if (isFinite(input)) {
            deleteSelectedCell()
            inputNum(input);
        } else if (input === "Backspace") {
            deleteSelectedCell()
        }
    }
}
function clearSelectionHighlights() {
    for (let i = 0; i < displayCells.length; i++) {
        displayCells[i].classList.remove("selected");
        displayCells[i].classList.remove("selectedCrossHair");
        displayCells[i].classList.remove("selectedVal");
    }
}

function clearAllHighlights() {
    for (let i = 0; i < displayCells.length; i++) {
        displayCells[i].classList.remove("selected");
        displayCells[i].classList.remove("selectedCrossHair");
        displayCells[i].classList.remove("incorrectEntry");
        displayCells[i].classList.remove("incorrectSection");
        displayCells[i].classList.remove("selectedVal");
    }
}

function getBlock(row, col) {
    function getThird(linear) {
        if (new Array(0, 1, 2).includes(linear)) {
            return 1
        } else if (new Array(3, 4, 5).includes(linear)) {
            return 2
        } else if (new Array(6, 7, 8).includes(linear)) {
            return 3
        }
    }
    block_coord = String([getThird(row), getThird(col)]);

    blocs = {
        "1,1": 0,
        "2,1": 1,
        "3,1": 2,
        "1,2": 3,
        "2,2": 4,
        "3,2": 5,
        "1,3": 6,
        "2,3": 7,
        "3,3": 8
    }
    let block = blocs[block_coord]
    return block

}

function generateGrid(puzzleTemplate) {
    let templateIndex = 0;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            displayCell = document.createElement("div");
            if (puzzleTemplate[templateIndex] > 0) {
                newCell = new Cell(val = puzzleTemplate[templateIndex], r, c, getBlock(r, c)), true;
            } else {
                newCell = new Cell(val = null, r, c, getBlock(r, c), false);
                displayCell.classList.add("unlocked")
            }
            cells.push(newCell);
            rows[r].push(newCell)
            cols[c].push(newCell)
            blocks[newCell.block].push(newCell)
            displayCell.classList.add("cell");
            displayCell.setAttribute("grid-row", r);
            displayCell.setAttribute("grid-column", c);
            displayCell.style.boxSizing = "border-box"
            displayCell.innerText = newCell.val;

            displayCell.addEventListener("click", function (e) {
                clearSelectionHighlights();
                selectedCell = [];
                selectedCell.push(rows[this.getAttribute("grid-row")][this.getAttribute("grid-column")]);
                selectedCell.push(this);
                selectedCell.push(subCells[cells.indexOf(selectedCell[0])]);

                for (let i = 0; i < cells.length; i++) {
                    if (cells[i].row === selectedCell[0].row || cells[i].col === selectedCell[0].col) {
                        getDisplayCell(cells[i]).classList.toggle("selectedCrossHair");
                    }
                    if (cells[i].val === selectedCell[0].val) {
                        displayCells[i].classList.add("selectedVal");
                    }
                }
                this.classList.remove("selectedCrossHair")
                this.classList.toggle("selected");
            })

            if (c === 0) {
                displayCell.style.borderLeft = "2px solid black"
            } else if (c == 8) {
                displayCell.style.borderRight = "2px solid black"
            } else if (new Array(3, 6).includes(c)) {
                displayCell.style.borderLeft = "1.5px solid black";
            } else if (new Array(2, 5).includes(c)) {
                displayCell.style.borderRight = "1.5px solid black";
            }
            if (r === 0) {
                displayCell.style.borderTop = "2px solid black"
            } else if (r === 8) {
                displayCell.style.borderBottom = "2px solid black"
            } else if (new Array(3, 6).includes(r)) {
                displayCell.style.borderTop = "1.5px solid black"
            } else if (new Array(2, 5).includes(r)) {
                displayCell.style.borderBottom = "1.5px solid black";
            }
            displayCells.push(displayCell);
            board.append(displayCell);

            if (displayCell.classList.contains("unlocked")) {
                displayCell.classList.add("pencilVisible")
                for (let i = 0; i < 9; i++) {
                    let subCell = document.createElement("div");
                    subCell.innerText = i;
                    subCell.classList.add("subCell")
                    subCell.innerText = `${i + 1}`;
                    subCell.classList.add("hidden");
                    displayCell.append(subCell);
                }
            }
            templateIndex++
        }
    }
}

document.body.addEventListener("keydown", function (e) {
    if (selectedCell.length > 0) {
        inputToCell(e.key, e.shiftKey);
    }
})
document.body.addEventListener("click", function (e) {
    if (e.explicitOriginalTarget.classList.contains("cell") === false) {
        selectedCell = []
        clearSelectionHighlights()
    }
})

generateGrid(start_grid);

const resetBtn = document.querySelector("#resetButton");

resetBtn.addEventListener("click", function () {
    for (let i = 0; i < cells.length; i++) {
        clearAllHighlights()
        if (cells[i].locked === false) {
            cells[i].val = null;
            displayCells[i].innerText = " ";

        }
    }
})
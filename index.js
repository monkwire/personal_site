const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { allowedNodeEnvironmentFlags } = require("process");
const fs = require('fs')
const { chownSync } = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs");



app.get("/", (req, res) => {
    console.log(req)
    const title = "Home"
    res.render("home", { title });
})

app.get("/projects", (req, res) => {
    const title = "Projects"
    res.render("projects", { title })
})

app.get("/resume", (req, res) => {
    const title = "Resume"
    res.render("resume", { title })
})

app.get("/music", (req, res) => {
    const title = "Music";
    res.render("music", { title })
})

app.get("/writing", (req, res) => {
    const title = "Writing";
    res.render("writing", { title })
})

app.get("/authority_tracker", (req, res) => {
    const title = "Authority Tracker"
    res.render("authority_tracker")
})

app.get("/sudoku", (req, res) => {
    const title = "Sudoku";
    const sudoku = require("./sudoku_puzzles");
    const get_random_sudoku = sudoku.get_random_puzzle;
    const puzzle = get_random_sudoku();
    res.render("sudoku", { title, puzzle })
})

app.get("/wordle_solver", (req, res) => {
    const title = "Wordle Solver"
    res.render("wordle_solver", { title })
})

app.get("/cross_words", (req, res) => {
    console.log(__dirname)
    const cross_words = require("./cross_words")
    const get_puzzle = cross_words.get_random_puzzle;
    const puzzle_data = get_puzzle();
    const puzzle = puzzle_data[0];
    const bank = puzzle_data[1];
    const title = "Cross-words";
    res.render("cross_words", { title, puzzle, bank });
})

const port = 3000;
app.listen(port, () => {
    console.log(`listening on port ${port} `)
})

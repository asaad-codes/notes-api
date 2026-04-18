const express = require("express");
const app = express();

app.use(express.json());

let notes = []; // Isse 'let' rakhein taake agar array filter karni ho toh asani ho

app.post("/notes", (req, res) => {
    notes.push(req.body);
    res.status(201).json({
        message: "Note created successfully",
    });
});

app.get("/notes", (req, res) => {
    res.status(200).json({
        message: "Notes retrieved successfully",
        notes: notes,
    });
});

// DELETE METHOD : 

app.delete("/notes/:index", (req, res) => { 
    const index = req.params.index;

    // Sahi Tareeka: Array se item remove karne ka
    if (index >= 0 && index < notes.length) {
        notes.splice(index, 1); 
        res.status(200).json({
            message: "Note deleted successfully",
        });
    } else {
        res.status(404).json({
            message: "Note not found!",
        });
    }
});

// UPDATE METHOD : PATCH METHOD

app.patch("/notes/:index", (req, res) => {
    const index = req.params.index;
    const updatedContent = req.body; // Jo naya data Postman se aayega

    if (index >= 0 && index < notes.length) {
        // Purana note nikalo (1 item) aur naya 'updatedContent' ghusa do
        notes.splice(index, 1, updatedContent); 

        res.status(200).json({
            message: "Note updated successfully",
            updatedNote: notes[index]
        });
    } else {
        res.status(404).json({    
            message: "Note not found!" });
    }
});

module.exports = app;  
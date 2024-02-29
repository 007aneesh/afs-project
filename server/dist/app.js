"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const functions = require("./server");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/getAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield functions.getAllTodos();
        return todos;
    }
    catch (error) {
        return Error("Error getting all Todos");
    }
}));
app.post("/addTodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield functions.createTodo(req.body);
    }
    catch (error) {
        console.log(error);
        return Error("Error adding new todo");
    }
}));
app.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = req.body;
    try {
        const updatedTodo = yield functions.updateTodo(data);
        if (!updatedTodo)
            return Error('No Todo with this id');
        return JSON.stringify({ message: 'Updated Successfully', content: updatedTodo });
    }
    catch (e) {
        return Error('Server error');
    }
}));
app.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.url;
    try {
        yield functions.deleteTodo(Number(id.split("/")[2]));
    }
    catch (error) {
        console.log(error);
        return Error("Error deleting the selected Todo");
    }
}));
const server = app.listen(5000, () => console.log("Server ready"));

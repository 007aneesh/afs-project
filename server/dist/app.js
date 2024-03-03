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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const server_1 = require("./server");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield (0, server_1.getAllTodos)();
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ error: "Error getting all Todos" });
    }
}));
app.post("/addTodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, server_1.createTodo)(req.body);
        console.log("created");
    }
    catch (error) {
        console.log(error);
        return Error("Error adding new todo");
    }
}));
app.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = Number(req.url.split("/")[2]);
    let data = req.body;
    try {
        const updatedTodo = yield (0, server_1.updateTodo)(id, data);
        if (!updatedTodo)
            return Error("No Todo with this id");
        console.log("Updated Todo!!\n");
        return res.status;
    }
    catch (e) {
        console.log("ERROR UPDATING TODO:\n", e);
        return Error("Server error");
    }
}));
app.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.url;
    try {
        yield (0, server_1.deleteTodo)(Number(id.split("/")[2]));
        console.log("deleted");
    }
    catch (error) {
        console.log(error);
        return Error("Error deleting the selected Todo");
    }
}));
app.listen(5000, () => console.log("Server ready"));

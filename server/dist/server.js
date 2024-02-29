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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTodo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.todo.create({
        data: {
            status: data.status,
            content: data.content
        }
    });
});
const getAllTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield prisma.todo.findMany();
    console.log(todos);
    return todos;
});
const updateTodo = (id, content) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTodo = yield prisma.todo.update({
        where: {
            id: id
        },
        data: {
            content: content
        }
    });
    return updatedTodo;
});
const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.todo.delete({
        where: {
            id: id,
        },
    });
});
module.exports = {
    createTodo,
    getAllTodos,
    updateTodo,
    deleteTodo,
};

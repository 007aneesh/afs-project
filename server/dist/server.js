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
exports.deleteTodo = exports.updateTodo = exports.getAllTodos = exports.createTodo = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// interface User{
//   firstName: string,
//   lastName: string,
//   email: string
// }
const createTodo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.todo.create({
        data: {
            status: data.status,
            content: data.content,
            // userId: data.userId
        },
    });
});
exports.createTodo = createTodo;
const getAllTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield prisma.todo.findMany({});
        return todos;
    }
    catch (err) {
        console.log(err, "error receiving todos");
    }
});
exports.getAllTodos = getAllTodos;
const updateTodo = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTodo = yield prisma.todo.update({
        where: {
            id: id,
        },
        data: {
            status: data.status,
            content: data.content,
            // updatedAt: Date()
        },
    });
    return updatedTodo;
});
exports.updateTodo = updateTodo;
const deleteTodo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.todo.delete({
        where: {
            id: id,
        },
    });
});
exports.deleteTodo = deleteTodo;
// const createUser = async  (userData: User) => {
//   const user = await prisma.user.create({
//     data:{
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       email: userData.email
//     }
//   });
//   return user;
// };
// module.exports = {
//   createTodo,
//   getAllTodos,
//   updateTodo,
//   deleteTodo,
// };

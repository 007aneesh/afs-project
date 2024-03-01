import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Todo {
  status: string;
  content: string;
}

// interface User{
//   firstName: string,
//   lastName: string,
//   email: string
// }

const createTodo = async (data: Todo) => {
  await prisma.todo.create({
    data: {
      status: "Pending",
      content: data.content,
      // userId: data.userId
    },
  });
};

const getAllTodos = async () => {
  const todos = await prisma.todo.findMany();
  return todos;
};

const updateTodo = async (id: number, data: Todo) => {
  const updatedTodo = await prisma.todo.update({
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
};

const deleteTodo = async (id: number) => {
  await prisma.todo.delete({
    where: {
      id: id,
    },
  });
};

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

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  // createUser
};

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Todo {
  id: number;
  status: string;
  content: string;
  createdAt: Date;
}

// interface User{
//   firstName: string,
//   lastName: string,
//   email: string
// }

export const createTodo = async (data: Todo) => {
  await prisma.todo.create({
    data: {
      status: data.status,
      content: data.content,
      // userId: data.userId
    },
  });
};

export const getAllTodos = async () => {
  try{
    const todos = await prisma.todo.findMany({});
    return todos;
  }
  catch(err){
    console.log(err, "error receiving todos");
  }
};

export const updateTodo = async (id: number, data: Todo) => {
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

export const deleteTodo = async (id: number) => {
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

// module.exports = {
//   createTodo,
//   getAllTodos,
//   updateTodo,
//   deleteTodo,
// };

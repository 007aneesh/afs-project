import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Todo {
  status: string;
  content: string;
}

const createTodo = async (data: Todo) => {
  await prisma.todo.create({
    data: {
        status: data.status,
        content: data.content
    }
  })
};

const getAllTodos = async () =>{
    const todos = await prisma.todo.findMany();
    console.log(todos);
    return todos;
}

const updateTodo = async (id: number, content: string) =>{
    const updatedTodo = await prisma.todo.update({
        where:{
            id: id
        },
        data: {
            content: content
        }
    });
    return updatedTodo;
}

const deleteTodo = async (id:number) =>{
    await prisma.todo.delete({
      where: {
        id: id,
      },
    })
}

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};
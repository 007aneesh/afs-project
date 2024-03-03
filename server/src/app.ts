const express = require("express");
import { Request,Response } from 'express';

const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
import {createTodo,getAllTodos,updateTodo,deleteTodo} from "./server";
import { Todo } from '@prisma/client';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/get", async (req: Request, res: Response) => {
  try {
    const todos = await getAllTodos();

    res.json(todos);
  } catch (error) {
    res.status(500).json({error: "Error getting all Todos"});
  }
});

app.post("/addTodo", async (req: Request, res: Response) => {
  try {
    await createTodo(req.body);
    console.log("created");
  } catch (error) {
    console.log(error);
    return Error("Error adding new todo");
  }
});

app.put("/update/:id", async (req: Request, res: Response) => {
  let id: number = Number(req.url.split("/")[2]);
  let data = req.body;
  try {
    const updatedTodo = await updateTodo(id, data);
    if (!updatedTodo) return Error("No Todo with this id");
    console.log("Updated Todo!!\n");
    return res.status;
  } catch (e) {
    console.log("ERROR UPDATING TODO:\n", e);
    return Error("Server error");
  }
});

app.delete("/delete/:id", async (req: Request, res: Response) => {
  let id = req.url;
  try {
    await deleteTodo(Number(id.split("/")[2]));
    console.log("deleted");
  } catch (error) {
    console.log(error);
    return Error("Error deleting the selected Todo");
  }
});

app.listen(5000, () => console.log("Server ready"));

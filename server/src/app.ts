const express = require("express");

const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const functions = require("./server");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/get", async (req: Request, res: Response) => {
  try {
    const todos = await functions.getAllTodos();
    console.log("todos", todos);

    Response.json(todos);
  } catch (error) {
    return Error("Error getting all Todos");
  }
});

app.post("/addTodo", async (req: Request, res: Response) => {
  try {
    await functions.createTodo(req.body);
    console.log("created");
  } catch (error) {
    console.log(error);
    return Error("Error adding new todo");
  }
});

app.put("/update/:id", async (req: Request, res: Response) => {
  let id: number = Number(req.url.split("/")[2]);
  let data = req.body;
  console.log("data:", data);
  try {
    const updatedTodo = await functions.updateTodo(id, data);
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
    await functions.deleteTodo(Number(id.split("/")[2]));
    console.log("deleted");
  } catch (error) {
    console.log(error);
    return Error("Error deleting the selected Todo");
  }
});

const server = app.listen(5000, () => console.log("Server ready"));

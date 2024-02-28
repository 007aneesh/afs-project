const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors  = require('cors');
const functions = require("./server");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/todos", async (req: Request, res: Response) => {
  try {
    await functions.createTodo(req.body);
  } catch (error) {
    console.log(error);
  }
});





const server = app.listen(5000, () =>
  console.log("Server ready"));
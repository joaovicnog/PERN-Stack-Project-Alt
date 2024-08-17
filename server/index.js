import express from "express";
import cors from "cors";
import db from "./db.js";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

//Database

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await db.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING * ",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await db.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const chosenTodo = await db.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(chosenTodo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    const updateTodo = await db.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (error) {
    console.error(error.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await db.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json("Todo was deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server has started on Port ${port}`);
});

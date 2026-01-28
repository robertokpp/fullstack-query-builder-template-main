import express, { Request, Response } from "express";
import { knex } from "./database/knex";

const app = express();
app.use(express.json());

app.post("/courses", async (request: Request, response: Response) => {
  const { name } = request.body;

  await knex("courses").insert({ name });

  response.status(201).json();
});

app.get("/courses", async (request: Request, response: Response) => {
  const courses = await knex("courses").select().orderBy("created_at")
  response.json(courses);
});

app.listen(3333, () => console.log(`Server is running on port 3333`));

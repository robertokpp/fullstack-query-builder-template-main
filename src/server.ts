import express, { Request, Response } from "express";
import { knex } from "./database/knex";
import { request } from "http";

const app = express();
app.use(express.json());

app.post("/courses", async (request: Request, response: Response) => {
  const { name } = request.body;

  await knex("courses").insert({ name });

  return response.status(201).json();
});

app.get("/courses", async (request: Request, response: Response) => {
  const courses = await knex("courses").select().orderBy("created_at");
  return response.json(courses);
});

app.put("/courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  const { name } = request.body;
  await knex("courses").update({ name }).where({ id });
  return response.json();
});

app.delete("/courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params;
  await knex("courses").delete().where({ id });
  return response.json();
});

app.post("/module", async (request: Request, response: Response) => {
  const { name, course_id } = request.body;
  await knex("course_module").insert({ name, course_id });

  return response.status(201).json();
});

app.get("/module", async (request: Request, response: Response) => {
  const module = await knex("course_module").select();

  return response.json(module);
});

app.get(
  "/courses/:id/modules",
  async (request: Request, response: Response) => {
    const courses = await knex("courses")
      .select(
        "course_module.id",
        "course_module.name as module",
        "courses.name as course",
      )
      .join("course_module", "courses.id", "course_module.course_id");

    return response.json(courses);
  },
);

app.listen(3333, () => console.log(`Server is running on port 3333`));

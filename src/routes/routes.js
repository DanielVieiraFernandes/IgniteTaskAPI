import { Database } from "../database/database.js";
import { randomUUID } from "node:crypto";
import { routePath } from "../utils/route-path.js";
const database = new Database();

export const routes = [
  {
    method: "GET",
    path: routePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks");
      console.log(tasks);

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: routePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: routePath("/tasks/:id"),
    handler: async (req, res) => {
      const { id } = req.params;

      const del = database.delete("tasks", id);

      res.writeHead(201).end(del);
    },
  },
  {
    method: "PUT",
    path: routePath("/tasks/:id"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const { id } = req.params;

      const update = database.update("tasks", id, {
        title: title || null,
        description: description || null,
        updated_at: new Date().toISOString(),
      });

      res.writeHead(201).end(update);
    },
  },
  {
    method: "PATCH",
    path: routePath("/tasks/:id"),
    handler: async (req, res) => {
      const { id } = req.params;

      database.markAsCompleted("tasks", id);

      return res.writeHead(200).end();
    },
  },
];

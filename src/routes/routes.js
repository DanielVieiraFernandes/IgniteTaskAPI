import { Database } from "../database/database.js";
import { randomUUID } from "node:crypto";
const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      const tasks = database.select("tasks");
      console.log(tasks);

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: "/tasks",
    handler: async (req, res) => {
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
    path: "/tasks",
    handler: async (req, res) => {},
  },
  {
    method: "PUT",
    path: "/tasks",
    handler: async (req, res) => {},
  },
  {
    method: "PATCH",
    path: "/tasks",
    handler: async (req, res) => {

      database.markAsCompleted("tasks", "3428c384-46cf-4b8e-80e0-77db4212180c");

      return res.writeHead(200).end();
    },
  },
];

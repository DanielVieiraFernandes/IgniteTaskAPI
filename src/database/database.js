import fs from "node:fs/promises";

const databasePath = new URL("tasksDatabase.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch((err) => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table) {
    const data = this.#database[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
    return data;
  }

  markAsCompleted(table, id) {
    const taskIndex = this.#database[table].findIndex((task) => task.id === id);

    if (taskIndex > -1) {
      const task = this.#database[table][taskIndex];
      this.#database[table][taskIndex] = {
        ...task,
        completed_at: new Date().toISOString(),
      };
      return this.#persist();
    }

    return "Task not found";
  }
}

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

  delete(table, id) {
    const taskIndex = this.#database[table].findIndex((task) => task.id === id);

    if (taskIndex > -1) {
      this.#database[table].splice(taskIndex, 1);
      this.#persist();

      return "Task deleted successfully";
    }

    return "Not found";
  }

  update(table, id, data) {
    const taskIndex = this.#database[table].findIndex((task) => task.id === id);

    if (taskIndex > -1) {
      this.#database[table] = this.#database[table].map((task) =>
        task.id === id ? { ...task, ...data } : task
      );
      this.#persist();
      return "Task updated successfully";
    }

    return "Task not found";
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

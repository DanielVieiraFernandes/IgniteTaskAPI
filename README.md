# IgniteTaskAPI

A IgniteTaskAPI é uma API simples desenvolvida como parte do desafio da Rocketseat no módulo "Fundamentos de Node.js". O objetivo dessa API é gerenciar tarefas (tasks) com funcionalidades básicas de CRUD e algumas funcionalidades adicionais, como a marcação de tarefas como concluídas e a importação de tarefas em massa a partir de um arquivo CSV.

## Funcionalidades

- **Criação de tarefas**: Crie novas tarefas com título e descrição.
- **Listagem de tarefas**: Liste todas as tarefas salvas no banco de dados.
- **Atualização de tarefas**: Atualize uma tarefa existente através de seu `id`.
- **Remoção de tarefas**: Remova uma tarefa existente utilizando seu `id`.
- **Marcação de tarefa como concluída**: Marque uma tarefa como concluída ou reverter essa ação.
- **Importação em massa de tarefas**: Importe tarefas em massa por meio de um arquivo CSV.

## Estrutura de uma Task

Cada tarefa possui as seguintes propriedades:

- `id`: Identificador único da tarefa.
- `title`: Título da tarefa.
- `description`: Descrição detalhada da tarefa.
- `completed_at`: Data de quando a tarefa foi concluída. O valor inicial é `null`.
- `created_at`: Data de criação da tarefa.
- `updated_at`: Data da última atualização da tarefa.

## Rotas

### `POST - /tasks`
Crie uma nova tarefa.

**Requisição (Body)**:
```json
{
  "title": "Título da tarefa",
  "description": "Descrição detalhada da tarefa"
}

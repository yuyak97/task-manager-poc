# Task manager coding challenge

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Task manager coding challenge](#task-manager-coding-challenge)
  - [Requirement](#requirement)
  - [What I implemented](#what-i-implemented)
  - [How to start](#how-to-start)
  - [ERD](#erd)
  - [API document](#api-document)
  - [Further information](#further-information)

<!-- /code_chunk_output -->

## Requirement

Build a simple task management application using NestJS (TypeORM) for the backend and NextJS for the frontend. The application should allow users to perform CRUD operations on tasks. A task has the following fields:

```
ID
Title
Status ("To do", "In Progress", "Done")
Due date
Created at
Updated at
```

## What I implemented

Following the requirement, I implemented a simple CRUD system with a single table and 2 screens.

Here's a quick look at the use flow in action:

![use flow](./assets/use-flow.gif)

<details>
<summary>Task list screen</summary>

- On this screen, the list of task cards is shown.
- If the due date is before today, the color of the due date is <span style='color: red;'>red</span>.
- Each card is a link to the task detail screen.
- From the button above the list, users can create a new task. When creating a task, the default status is 'todo'

![task list](./assets/task-list-screen.png)

</details>

<details>
<summary>Task detail screen</summary>

- On this screen, users can update the title, the due date, and the status.
- Users can delete the task using the delete button at the bottom.

![task list](./assets/task-detail-screen.png)

</details>

## How to start

Please set env variable for both directory. Simply you can run this command

```bash
$ cp ./api/.env.local.example ./api/.env && cp ./app/.env.local.example ./app/.env.local
```

- For the **api** directory: Duplicate the `.env.local.example` file and rename the copy to `.env`, ensuring it remains in the same directory.
- For the **app** directory: Duplicate the `.env.local.example` file and rename the copy to `.env.local`, making sure it's also in the same directory.

Run commands below

```bash
# start api
$ make start-api
# start app
$ make start-app
# insert test data
$ make init-data
```

- API runs on localhost:8000
- APP runs on localhost:3000

## ERD

<img src="./api/er-diagram.png" />

## API document

The api documentation can be found here.
[API document](./api/openapi.yaml)

## Further information

For more information, please check README in api and app directory.

- [API README](./api/README.md)
- [APP README](./app/README.md)

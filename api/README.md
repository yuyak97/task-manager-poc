# API

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ docker compose up
```

## DB

```bash
# open postgres console
$ docker exec -it task-db psql -U postgres task

# generate migration file
# Please replace ${NAME}
$ docker exec -it task-api npm run migration:generate src/database/migrations/${NAME}

# migrate migration files
$ docker exec -it task-api npm run migrate:run

# generate ERD command
$ npx typeorm-uml --download=er-diagram.png
```

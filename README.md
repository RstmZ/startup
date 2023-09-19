## How to setup project

1. `git clone` this repository
2. Get correct local `.env` file
3. Setup local postgres database (set correct values for connection in `.env`)
4. You may ask for database dump or do it manually
5. Run `npm install`
6. Run `npm run start:dev`

## How to setup db manually

1. Run `npm run migration:run`
2. Use queries to create entities you need

## How to contribute

1. Create new branch for working on your feature
2. Create migration using command `npm run migration:create src/migrations/Your-Migration-Name`
3. In `src/migrations` you may find guide for writing migrations, read it please
4. To run migrations to your database use command `npm run migration:run`
5. Dublicate your changes to database to TypeORM entities
6. Write impressive commit messages
7. Create Pull Request and ask someone for review

## Other commands

- `migration:generate` - compares your changes in entities and your database and generates migration with SQL-code. This command is not preferrable to use, but is okay for big migrations or just to check what changes were done and not in database yet.
- `migration:create` - creates empty migration
- `migration:run` - runs all migrations that were not done yet
- `migration:revert` - reverts the last migration
- `db:drop` - clears everything. DON'T EVER RUN THIS ON PRODUCTION

## Other commands

Swagger docs availible on `http://localhost:3000/doc`
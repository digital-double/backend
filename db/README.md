# Getting Started

## Install

Don't forget to run `npm install` add new npm packages to your package-lock.json file.

Install postgres, by running `brew install postgres` on Mac and `sudo apt install postgresql` Ubuntu

Afterwards you'll have access to `psql`, which will log you into the PostgreSQL prompt, and from there you are free to interact with the database management system right away.

## Working in the PostgreSQL prompt

[Docs](https://www.postgresql.org/docs/9.5/app-psql.html)

1. Set up a local Database by running `CREATE DATABASE name`

2. Set the following env variables
   `DB_USERNAME DB_PASSWORD DB_HOST DB_DATABASE`

## Migrate and Seed

Run `npx sequelize db:migrate && npx sequelize db:seed:all`

## Working with serielizer

[Docs](https://github.com/sequelize/cli#documentation)

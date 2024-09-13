# backend
this is the backend environment for project Jeepfake

This repository contains:

- the backend server code, written with JS

## Prerequisites

You need to install the following things to be able to run this project on your own hardware:

1. [nodeJS](https://nodejs.org/en/download/) (LTS v16.13.0)
2. At least two [PostgreSQL](https://www.postgresql.org/download/) v10 (or higher) instances for development & testing (we recommend v13 or higher)

## Getting Started

### Setup database

#### PostgreSQL

1. (On windows if using cmd please us `windows powershell cmd`) navigate to the `bin` folder in the postgresql folder.
2. create a new user `psql -U userName` and enter a `password` when prompted.
3. Set up a local Database by running `CREATE DATABASE name`.
   e.g., (CREATE DATABASE myDatabase)
4. (optional) you may have to give your account database privileges using the `GRANT ALL PRIVILEGES` command.
   e.g., (GRANT ALL PRIVILEGES ON myDB . \* TO 'user'@'localhost';)

### Install and setup the repository

1. Clone this repository
2. Install dependencies

   ```zsh
   npm install
   ```

3. Duplicate `.env.example` file and rename it to `.env`
4. Add environment variables to `.env`

   1. Enter a random `string` variable for the `FOO_COOKIE_SECRET` in order to have session cookie generated
   2. `DB_HOST`=localhost
      `DB_DATABASE` => the name of the database created for this project

      `DB_USERNAME` => the username that has access to the development database

      `DB_PASSWORD` => your database user password (note if the password contains numbers, you may have to use single quotes e.g., 'password123')

      `DB_PORT` => usually is '5432'

   3. Variables for testing

      `DB_HOST_TEST`=your testing host name

      `DB_DATABASE_TEST` => your testing database name

      `DB_USERNAME_TEST` => your username for testing database

      `DB_PASSWORD_TEST` => your database user password (note if the password contains numbers, you may have to use single quotes e.g., 'password123')

      `DB_PORT_TEST` => your testing database port

5. Setup testing and development database

   1. Run the following to drop & create a new database and automatically migrate and seed:

      ```zsh
      npm run setup:db
      ```

   2. Run the following to setup the testing database:

      ```zsh
      npm run setup:testing
      ```

### Commands

1. Run `npm run dev` to start the development server (default port: 3000)
2. Run `npm run test:dev` to run development tests only (make sure you set up testing environment variables)
3. Run `npm run lint` for linting with ESLint
4. Run `npm run format` for formatting with Prettier

authors
Omar Badawy
Ignazio Balistreri

# backend
this is the backend environment for project covelant

This repository contains:

- the backend server code, written with JS

## Prerequisites

You need to install the following to be able to run this project on your own hardware:

1. [nodeJS](https://nodejs.org/en/download/) (LTS v16.13.0)
2. [PostgreSQL](https://www.postgresql.org/download/) v13 (or higher) instances for development 

## Getting Started

### 1 - Setup database

#### PostgreSQL

1. Navigate to the `bin` folder in the postgresql folder. (On windows if using cmd please us `windows powershell cmd`)
2. create a new user `psql -U userName` and enter a `password` when prompted.
3. Set up a local Database by running `CREATE DATABASE name`.
   e.g., (CREATE DATABASE myDatabase)
4. (optional) you may have to give your account database privileges using the `GRANT ALL PRIVILEGES` command.
   e.g., (GRANT ALL PRIVILEGES ON myDB . \* TO 'user'@'localhost';)

### 2 - Install and setup the repository

1. Clone this repository to your local machine
2. Install dependencies

   ```zsh
   npm install
   ```

3. Duplicate `.env.example` file and rename it to `.env`
4. Add environment variables to `.env`

   a) Enter a random `string` variable for the `FOO_COOKIE_SECRET` in order to have session cookie generated
   b) Enter the database connection information you will need to input the minimum following information:
      
      `DB_HOST`=localhost
   
      `DB_DATABASE` => the name of the database created for this project

      `DB_USERNAME` => the username that has access to the development database

      `DB_PASSWORD` => your database user password (note if the password contains numbers, you may have to use single quotes e.g., 'password123')

      `DB_PORT` => usually is '5432'
   c) Enter the node enviroment variable state which should be set to development
      
      `NODE_ENV`=development
   
   d) Enter stripID evironmentvariable for payment integration (please ask request to the following link in order to obtain one if you do not have a stripe account https://drive.google.com/drive/folders/1-n6LHel9t0Z6LF3QfMOa9Pa-VZLAa2S_?usp=sharing)

   `STRIPE_SECRET_KEY`= stripeID

   e) Enter base url enviromental variable for referal link integration as follows.

   `BASE_URL`=http://localhost:3000


5. Setup seeders and migrate the development database

   Run the following to drop & create a new database and automatically migrate and seed:

      ```zsh
      npm run setup:db
      ```

### Commands

1. Run `npm run dev` to start the development server (default port: 3000)
2. Run `npm run test` to run development tests only (make sure you set up testing environment variables)
3. Run `npm run lint` for linting with ESLint
4. Run `npm run format` for formatting with Prettier


### How to login using seeded data on postman
In order to access the routes you must first login in order to generate a session token that will pass security checks. There are two ways of logging in either as a `user` or `companyAdmin`. Each type is restricted to access certain routes and in some cases may get different responses. Make sure to seed the data before following the steps that are to come.

### login
1. Run `npm run start` 
2. From either the `users` or `companyAdmins` table copy either the `userName` or `email` of a chosen Users data entry from the seeders file
3. On postman create `userCredential` key, paste the userName or email as an attribute
4. Copy  the `password` of the chosen Users data entry from the seeders file
5. On postman create a `password` key and then paste the copied password as an 
6. Login using `POST` at http://localhost:3000/users/login

### signup
If you cannot seed the data simply go to following link and sign up using the following steps.

### users
1. create a `POST` request at http://localhost:3000/users/signup 
2. Enter the following keys `userName`, `email`, `password` and fill it with suitable values
3. Go to the login and follow the steps there with the data you just entered

### companies
1. Create a `POST` request at http://localhost:3000/companies/signup
2. Enter the following keys `companyName`, `userName`, `email`, `password` and fill it with suitable values
3. Go to the login and follow the steps there with the data you just entered

## Continuous Integration/Delivery
This repository includes a CI/CD pipeline (Github actions) to check pull requests and merge to the main branch. These GitHub actions automatically deploy the latest main branch using docker on render. render utilises its docker daemon process manager to keep our application online. The overview is as follows:
![Screenshot 2025-01-10 164839](https://github.com/user-attachments/assets/c09c1464-ca10-4c73-9b77-ddc0ed2b3fae)

authors
Omar Badawy


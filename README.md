CRUD API
=

### How to install
Clone the repository and install packages `npm i`  
Create `.env` file using `.env.example` file

### How to run
Run the application in development mode `npm run start:dev`  
Run the application in development mode `npm run start:prod`  
Run the application in cluster mode `npm run start:multi`  
Run tests `npm run test`

### API
`GET api/users` returns all users  
`GET api/users/{userId}` returns a specific user by passed id  
`POST api/users` creates new user record  
`PUT api/users/{userId}` uodates existing user record  
`DELETE api/users/{userId}` deletes existing user


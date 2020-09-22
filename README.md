# foodfactory
foodfactory crud and other basic api's

To access swagger :

1. Run node js server (node app.js)
2. localhost:8000/api-docs

Database :

1. MongoDB Atlas is used by default
2. To use localhost mongodb change the connection in config/db.js


Modules :

user module ,
ingredients module,
food module,
orders module

User Module:

Admin role - have access to other user operations and all API
             * Can deactivate user
             * CRUD operations for ingredients
             * CRUD operations for food
             * Manage user orders and update status

User role - have limited access 
            * To create orders of an food item
            * View, Update and Cancel orders of their own

Example Registeration :

{
  "name" : "admin",
  "email" : "admin@gmail.com",
  "role" : "admin"/"user",
  "password" : "any"
}

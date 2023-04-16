# Marks Uploading MERN App(backend)

This is a MERN CRUD app that uses authentication and authorization using `jsonwebtoken`, password hashing using `bcrypt`. It includes a total of 5 routes, 3 of which are protected. **There is no front-end for this app.**

## Routes

 1. `/register`: This route takes "name", "email", "role" and "password" as arguements and registers a user in the database.
 2. `/login`: This route finds the user by email, compares the hashed password and generates a `JWT Token` and stores it in the header and logs the user in.

The following 3 routes are protected and can only be accessed if you have a valid auth-token, and the role `teacher` except for the `/` route which is a `GET` request and can be accessed with a valid token.

 3. `/upload`: (POST REQUEST) Users with the role of `teacher` can upload marks by providing the following parameters: name, marks of five subjects(maths, data_structures, dbms, web_based_programming)
 4. `/delete/:id`: (DELETE REQUEST) Users with the "teacher" role can pass in an `ID` in the URL, and that particular record will be deleted.
 5. `/`: (GET REQUEST) Users with both "teacher" and "student"
 role can access this route, WITH a valid auth-token and see all the marks.

The login and register routes are prefixed by `/api/users` and the marks route are prefixed by `/api/marks`.

## Middlewares
The app uses 2 custom middlewares, `verifyToken` and `checkRole`.

 1. `verifyToken`: This middleware focuses on verifying the JWT token which is present in the header of the request body. If the token is valid, it calls the `next()` function, else, it'll throw an error.
 2. `checkRole`: As I mentioned earlier, there are two roles here "Student" and "Teacher", and some routes are only accessible by "Teachers", so this middleware refers to the User model, and checks the `user.role` property, if that's "Teacher", it will allow access to those certain routes, else it will return a message that says "Unauthorized".

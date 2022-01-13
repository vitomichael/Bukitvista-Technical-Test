# NodeJS Back End Programming Test - Bukitvista

## Description

This RestAPI was created to fulfill user requests with the following story:

- I want to create private API server that will return image url of movie poster, use third party service OMDB to get that URL.
- I need to be able to fetch all poster of all my favorite movies

There are several endpoints, namely:

- GET
  - /movies
    - Forbidden
  - /movies/{movie title}
    - Return poster url of that movie
  - /movies/favorites/
    - Return all poster url of that user's favorite movies
- POST

  - /
    - Login
  - /movies/favorites
    - Insert into user's favorite movies

- DELETE
  - /logout

## How to set up the projects

`Nodemon index.js`

Requirements :

- axios : ^0.24.0 ,
- body-parser : ^1.19.1 ,
- cookie-session : ^2.0.0 ,
- cors : ^2.8.5 ,
- dotenv : ^11.0.0 ,
- express : ^4.17.2 ,
- express-pino-logger : ^7.0.0 ,
- express-rest-response : ^1.2.0 ,
- jsonwebtoken : ^8.5.1 ,
- md5 : ^2.3.0 ,
- mysql2 : ^2.3.3 ,
- sequelize : ^6.13.0

### Documentation

[Documentation](https://documenter.getpostman.com/view/14990560/UVXhrd4K)

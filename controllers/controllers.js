const db = require("../models");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const res = require("express/lib/response");

const genToken = async (id) => {
  const token = jwt.sign({ id }, process.env.TOKEN_SECRET);
  await db.Token.create({ token });
  return token;
};

const listMovies = (req, res, next) => {
  return res.rest.forbidden("Forbidden access");
};

const specificMovies = (req, res, next) => {
  let { title } = req.params;
  try {
    specificMoviesUrl(
      `https://www.omdbapi.com/?t=${title}&apikey=2c967f47`
    ).then((result) => {
      return res.rest.success({ poster: result.data.Poster });
    });
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {
  let { name, password } = req.body;
  console.log(name, password);
  db.User.findOne({
    where: {
      name: name,
      password: md5(password),
    },
  })
    .then(async (result) => {
      if (result) {
        req.session.session_id = { id: result.id };
        res.rest.success({
          token: await genToken(result.id),
        });
      } else {
        res.rest.badRequest("Invalid");
      }
    })
    .catch((error) => {
      next(error);
    });
};

const specificMoviesUrl = (url) => {
  return axios.get(url);
};

const favoriteMovies = async (req, res, next) => {
  try {
    var response = [];
    const data = await db.Favorite_movies.findAll({
      where: { user_id: req.user.id },
    });

    if (!data)
      return res.rest.badRequest(
        `Can't find favorite movies of user with ID ${req.params.id}.`
      );

    for (let index = 0; index < data.length; index++) {
      const movie = data[index];
      let result = await specificMoviesUrl(
        `https://www.omdbapi.com/?t=${movie.title}&apikey=2c967f47`
      );
      response.push({
        title: movie.title,
        poster: result.data.Poster,
      });
    }
    res.header("Access-Control-Expose-Headers", "field");
    res.rest.success({ data: response });
  } catch (error) {
    next(error);
  }
};

const insertFavoriteMovies = async (req, res, next) => {
  try {
    let { title, user_id } = req.body;
    const user = await db.User.findOne({
      where: { id: user_id },
    });
    if (!user)
      return res.rest.badRequest(`Can't find user with ID ${user_id}.`);

    console.log(title, user_id);
    let data = await db.Favorite_movies.findOne({
      where: {
        title: title,
        user_id: user_id,
      },
    });
    console.log(data);

    if (data)
      return res.rest.badRequest("This movie is already in your favorite.");

    db.Favorite_movies.create(req.body).then((result) => {
      res.rest.success("Movie have been added to your favorite");
    });
  } catch (error) {
    res.rest.badRequest(error);
  }
};

const logout = async (req, res, next) => {
  try {
    let token = await db.Token.findOne({
      where: {
        id: req.user.tokenId,
      },
    });
    if (!token) return res.rest.badRequest("Logout Failed");
    await token.destroy();
    return res.rest.success("Logout Success");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  listMovies,
  specificMovies,
  favoriteMovies,
  insertFavoriteMovies,
  logout,
};

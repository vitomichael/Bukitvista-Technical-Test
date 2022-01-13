const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();
const {
  login,
  specificMovies,
  favoriteMovies,
  listMovies,
  insertFavoriteMovies,
  logout,
} = require("../controllers/controllers");

router.post("/", login);
router.get("/movies", authenticateToken, listMovies);
router.get("/movies/favorite", authenticateToken, favoriteMovies);
router.get("/movies/:title", authenticateToken, specificMovies);
router.post("/movies/favorite", authenticateToken, insertFavoriteMovies);
router.delete("/logout", authenticateToken, logout);

module.exports = router;

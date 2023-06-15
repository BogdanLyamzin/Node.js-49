const express = require("express");

const moviesController = require("../../controllers/movies-controller");

const {validateBody} = require("../../decorators");

const {isBodyEmpty, isValidId, authenticate} = require("../../middlewares/");

const movieSchemas = require("../../schemas/movie-schemas");

const moviesRouter = express.Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", moviesController.getAll)

moviesRouter.get("/:id", isValidId, moviesController.getById)

moviesRouter.post("/", isBodyEmpty, validateBody(movieSchemas.movieAddSchema), moviesController.add)

moviesRouter.put("/:id", isValidId, isBodyEmpty, validateBody(movieSchemas.movieAddSchema), moviesController.updateById)

moviesRouter.patch("/:id/favorite", isValidId, isBodyEmpty, validateBody(movieSchemas.movieUpdateFavoriteSchema), moviesController.updateFavorite)

moviesRouter.delete("/:id", isValidId, moviesController.deleteById)

module.exports = moviesRouter;
const express = require("express");

const moviesController = require("../../controllers/movies-controller");

const {validateBody} = require("../../decorators");

const schemas = require("../../schemas/movies");

const moviesRouter = express.Router();

moviesRouter.get("/", moviesController.getAll)

moviesRouter.get("/:id", moviesController.getById)

moviesRouter.post("/", validateBody(schemas.movieAddSchema), moviesController.add)

moviesRouter.put("/:id", validateBody(schemas.movieAddSchema), moviesController.updateById)

moviesRouter.delete("/:id", moviesController.deleteById)

module.exports = moviesRouter;
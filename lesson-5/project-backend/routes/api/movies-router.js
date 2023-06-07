const express = require("express");

const moviesController = require("../../controllers/movies-controller");

const {validateBody} = require("../../decorators");

const {isBodyEmpty} = require("../../middlewares/");

const schemas = require("../../schemas/movies");

const moviesRouter = express.Router();

moviesRouter.get("/", moviesController.getAll)

// moviesRouter.get("/:id", moviesController.getById)

// moviesRouter.post("/", isBodyEmpty, validateBody(schemas.movieAddSchema), moviesController.add)

// moviesRouter.put("/:id", isBodyEmpty, validateBody(schemas.movieAddSchema), moviesController.updateById)

// moviesRouter.delete("/:id", moviesController.deleteById)

module.exports = moviesRouter;
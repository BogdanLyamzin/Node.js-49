const Joi = require("joi");

const {genreList, releaseDateRegexp} = require("../constants/movies");

const movieAddSchema = Joi.object({
    title: Joi.string().required(),
    director: Joi.string().required().messages({
        "any.required": `"director" must be exist`
    }),
    favorite: Joi.boolean(),
    genre: Joi.string().valid(...genreList).required(),
    releaseDate: Joi.string().pattern(releaseDateRegexp).required(),
})

const movieUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

module.exports = {
    movieAddSchema,
    movieUpdateFavoriteSchema,
}
const fs = require("fs/promises");
const path = require("path");

const Movie = require("../models/movie");

const { ctrlWrapper } = require("../decorators");

const { HttpError } = require("../helpers");

const postersDir = path.resolve("public", "posters");

const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const result = await Movie.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
    res.json(result);
}

const getById = async (req, res) => {
    const { id } = req.params;
    // const result = await Movie.findOne({_id: id});
    const result = await Movie.findById(id);
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`)
    }
    res.json(result);
}

const add = async (req, res) => {
    const {path: oldPath, filename} = req.file;
    const newPath = path.join(postersDir, filename);
    await fs.rename(oldPath, newPath)
    const poster = path.join("posters", filename);
    const {_id: owner} = req.user;
    const result = await Movie.create({...req.body, poster, owner});
    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`)
    }
    res.json(result);
}

const updateFavorite = async (req, res) => {
    const { id } = req.params;
    const result = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`)
    }
    res.json(result);
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await Movie.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`)
    }

    res.json({
        message: "Delete success"
    })
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteById: ctrlWrapper(deleteById),
}
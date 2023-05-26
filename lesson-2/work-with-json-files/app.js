const movieService = require("./movies");

const invokeAction = async({action, id, title, director}) => {
    switch(action) {
        case "list":
            const allMovies = await movieService.getAllMovies();
            console.log(allMovies);
            break;
        case "getById":
            const oneMovie = await movieService.getMovieById(id);
            console.log(oneMovie);
            break;
        case "add":
            const newMovie = await movieService.addMovie({title, director});
            console.log(newMovie);
            break;
        case "updateById":
            const updateMovie = await movieService.updateMovieById(id, {title, director});
            console.log(updateMovie);
            break;
        case "delete":
            const deleteMovie = await movieService.deleteMovieById(id);
            console.log(deleteMovie);
            break;
        default:
            console.log("Unknown action");
    }
}

// invokeAction({action: "list"})
// invokeAction({action: "getById", id: "u9kgwNWGi3uUUwh0b8V48"})
// invokeAction({action: "add", title: "Avatar: way of water", director: "James Cameron"})
// invokeAction({action: "updateById", id: "n8-PRqXl2GZMYGwBFY0TX", title: "Avatar: Way of water", director: "James Cameron"})
// invokeAction({action: "delete", id: "n8-PRqXl2GZMYGwBFY0TX"})
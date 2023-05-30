const express = require("express");
const cors = require("cors");

const moviesRouter = require("./routes/api/movies-routes");

const app = express();

app.use(cors());

app.use("/api/movies", moviesRouter);

app.use((req, res)=> {
    res.status(404).json({
        message: "Not Found"
    })
})

app.listen(3000);
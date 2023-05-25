const fs = require("fs/promises");
// const fs = require("fs").promises;

const filepath = "./files/file.txt";

const func = async()=> {
    // const buffer = await fs.readFile(filepath);
    // const text = buffer.toString();
    // console.log(text);
    const text = await fs.readFile(filepath, "utf-8");
    // console.log(text);
    // await fs.appendFile(filepath, "\nКодекс Ванталы");
    // await fs.writeFile(filepath, "Кодекс Ванталы");
    // await fs.appendFile("./files/file2.txt", "\nКодекс Ванталы");
    // await fs.writeFile("./files/file3.txt", "Кодекс Ванталы");
    // await fs.unlink("./files/file3.txt");
}

func();

// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message))

// fs.readFile("./files/file.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// })
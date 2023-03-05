

const express = require("express");
const cors = require("cors");
// const nameGenerator = require("name-generate");
const Chance = require("chance");
// Instantiate Chance so it can be used
var chance = new Chance();
const path = require("path")

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

// nationalities for chane are:
// 'en', 'it', 'nl', 'uk', 'de', 'jp', 'es', 'fr'

const corsOption = {
    origin: [
        "http://localhost:3000/"
    ],
    // credentials: true,
    optionSuccessStatus: 200
}
app.options("*", cors())

app.use(cors(corsOption))
app.use(cors({methods: ["GET", "POST"]}))

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get("/api", (req, res) => {
    const arr = []
    const options = { 
        middle: true,
        // prefix: true,
        nationality: 'en',
        gender: "female"
    }
    for(let i = 0; i < 20; i++) {
        arr[i] = chance.name(options)
        // console.log(chance.name(options));
        
        // console.log(nameGenerator.first() + " " + nameGenerator.last());
    }
    console.log("/api path: " + chance.name(options));
    res.json({message: chance.name(options)})
})
app.post("/api/submit", (req, res) => {
    const nArr = ['en', 'it', 'nl', 'uk', 'de', 'jp', 'es', 'fr', "au"];
    const gArr = ["male", "female"]
    const mArr = [true, false]
    console.log("Hello from backend");
    const { nationality, gender, middleName } = req.body;
    const options = { 
        middle: mArr[middleName],
        nationality: nArr[nationality],
        gender: gArr[gender]
    }
    console.log("/api/submit path" + req.body);
    res.status(200).json({name: chance.name(options)})
})

// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });


app.listen(process.env.PORT || 5000, () => {
    console.log("Server listening on port 5000....")
})
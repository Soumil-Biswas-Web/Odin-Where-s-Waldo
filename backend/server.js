import express from 'express';
import dotenv from 'dotenv';
import { getEntries } from './databases/database';

dotenv.config();

const app = express();

const entires = await getEntries();
console.log(entires);

app.get("/", (req, res) => {
    res.send("Server is ready.");
})

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000")
})
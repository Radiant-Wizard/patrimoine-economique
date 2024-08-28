import { dir } from 'console';
import express from 'express';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { createPossession } from './CreatePossession.js';
const fileName = fileURLToPath(import.meta.url);
const directoryName = dirname(fileName);

const app = express();3
const PORT = 3000;
app.use(express.json())
app.get('/possession', (request, response) =>{
    response.set({
        "content-type" : "application/json",
        "dateFin" : "null"
    })
    response.sendFile(path.join(directoryName, "../data/data.json"))
})


app.get("/", (req, res) =>{
    res.send("ok")
})

app.post('/possession', (req, res) =>{
    res.set({
        "content-type": "application/json"
    })

    createPossession(req.body);

    const response = {
        message: "added a new  possession",
        requestBody: req.body
    };
    res.status(201).send(response);
})

app.listen(PORT, () => {
    console.log(`run on ${PORT}`);
    
})
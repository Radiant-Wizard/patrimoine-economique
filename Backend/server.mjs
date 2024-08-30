import { dir } from 'console';
import express, { response } from 'express';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { createPossession } from './CreatePossession.js';
import { updatePossession } from './updatePossession.js';
import { closeDate } from './closeDate.js';
import cors from 'cors';
import getRange from './getRange.js';
import getValeurPatrimoine from './getValeurPatrimoine.js';

const fileName = fileURLToPath(import.meta.url);
const directoryName = dirname(fileName);


const app = express();
const PORT = 5000;
app.use(express.json())
app.use(cors())

app.get('/possession', (request, response) =>{
    response.set({
        "content-type" : "application/json",
        "dateFin" : "null"
    })
    response.sendFile(path.join(directoryName, "../data/data.json"))
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

app.put("/possession/:libelle", (request, response) => {
    const libelle = request.params.libelle; // Assuming 'id' is the unique identifier
    
    try{
        updatePossession(libelle, request.body);
        response.status(204).send({ message: "it worked"})
    } catch (error){
        response.status(400).send({ error: error})
    }
});

app.put("/possession/:libelle/close", (request, response) => {
    const libelle = request.params.libelle; // Assuming 'id' is the unique identifier
    
    try{
        closeDate(libelle, request.body);
        response.status(204).send({ message: "it worked"})
    } catch (error){
        response.status(400).send({ error: error})
    }
});

app.post("/patrimoine/range", (req, res) => {
    res.set({
      "Content-Type": "application/json",
    });
    getRange(req.body)
      .then((result) => res.status(200).send({ result: result }))
      .catch((err) => res.status(400).send({ status: "failed", error: err }));
  });

  app.get("/patrimoine/:date", (req, res) => {
    const jour = req.params.date;
    res.set({
      "Content-Type": "application/json",
    });
    getValeurPatrimoine(new Date(jour))
      .then((result) => {
        // console.log("i was here");
        res.status(200).send({ valeurPatrimoine: result.patrimoine });
      })
      .catch((err) => res.status(400).send({ status: "failed", error: err }));
  });
  

app.listen(PORT, () => {
    console.log(`run on ${PORT}`);
    
})
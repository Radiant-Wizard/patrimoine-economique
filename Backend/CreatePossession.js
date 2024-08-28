import { readFile, writeFile } from "../data/index.js";
import  Possession  from "../models/possessions/Possession.js";

export async function createPossession(requestBody){
    try {
        const owner = requestBody.possesseur;
        const label = requestBody.libelle;
        const price = requestBody.valeur;
        const dateDebut = requestBody.dateDebut;
        const taux = requestBody.taux;

        const nouveauPossession = new Possession(
            owner,
            label,
            price,
            dateDebut,
            null,
            taux,
        );

        const response = await readFile("../data/data.json");
        const jsonContent = await response.data;
        
        jsonContent[1].data.possessions.push(nouveauPossession);

        const WriteFilestatus = await writeFile("../data/data.json", response.data);
        return {
            createPossessionstatus : WriteFilestatus.status
        };
        
    }catch (err){
        console.log(requestBody);
        throw new Error(err);
    }
} 
import { readFile, writeFile } from "../data/index.js";

export async function updatePossession(cible, Newvalue) {
  try {
   const response = await readFile("../data/data.json");
   const data = response.data;
   const possessions = data[1].data.possessions;
        for (const possession of possessions){
            if (possession.libelle == cible){
                if (Newvalue.libelle != null){
                    possession.libelle = Newvalue.libelle;
                }
                possession.dateFin = new Date(Newvalue.dateFin);
            }
        }
        const status = await writeFile("../data/data.json", data);
        return status;

  } catch (error) {
    console.error("Error updating possession:", error);
    throw error; // Re-throw for proper error handling
  }
}
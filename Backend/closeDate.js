import { readFile, writeFile } from "../data/index.js";

export async function closeDate(cible) {
  try {
   const response = await readFile("../data/data.json");
   const data = response.data;
   const possessions = data[1].data.possessions;
        for (const possession of possessions){
            if (possession.libelle == cible){
                possession.dateFin = new Date();
            }
        }
        const status = await writeFile("../data/data.json", data);
        return status;

  } catch (error) {
    console.error("Error updating possession:", error);
    throw error; // Re-throw for proper error handling
  }
}
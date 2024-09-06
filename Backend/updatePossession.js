import { readFile, writeFile } from "../data/index.js";

export async function updatePossession(cible, Newvalue) {
  try {
    const response = await readFile("../data/data.json");
    const data = response.data;
    const possessions = data[1].data.possessions;

    let found = false;

    for (const possession of possessions) {
      if (possession.libelle === cible) {
        found = true;

        if (Newvalue.libelle !== undefined) {
          possession.libelle = Newvalue.libelle;
        }

        if (Newvalue.dateFin !== undefined) {
          possession.dateFin = new Date(Newvalue.dateFin);
        }

        break;
      }
    }

    if (!found) {
      throw new Error(`Possession with libelle '${cible}' not found`);
    }

    await writeFile("../data/data.json", data);

    return { message: "Possession updated successfully" };
  } catch (error) {
    console.error("Error updating possession:", error);
    throw error;
  }
}
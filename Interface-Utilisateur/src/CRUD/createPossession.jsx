import React, { useState } from "react";

const CreatePossessionForm = () => {
  const [formData, setFormData] = useState({
    possesseur: "John Doe",
    libelle: "",
    valeur: "",
    dateDebut: "",
    taux: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      const response = await fetch('/possession', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);

      if (response.ok) {
        alert("Possession created successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to create possession: ${errorData.error}`);
      }
    } catch (error) {
      console.error("There was an error creating the possession!", error);
    }
    

  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Libelle:
        <input type="text" name="libelle" value={formData.libelle} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Valeur:
        <input type="number" name="valeur" value={formData.valeur} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Date Début:
        <input type="date" name="dateDebut" value={formData.dateDebut} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Taux:
        <input type="number" step="0.01" name="taux" value={formData.taux} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Create Possession</button>
    </form>
  );
};

export default CreatePossessionForm;

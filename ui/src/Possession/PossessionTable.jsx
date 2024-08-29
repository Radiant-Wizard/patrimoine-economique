import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import '../myCSS.css';

const PossessionTable = () => {
  const [possessions, setPossessions] = useState([]);

  useEffect(() => {
    fetch('/possession')
      .then(response => response.json())
      .then(data => {
        setPossessions(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const formatData = (data) => {
    const formattedData = [];

    data.forEach(item => {
      if (item.model === 'Patrimoine') {
        item.data.possessions.forEach(possession => {
          formattedData.push({
            possesseur: possession.possesseur.nom || possession.possesseur,
            libelle: possession.libelle,
            valeur: possession.valeur,
            dateDebut: new Date(possession.dateDebut).toLocaleDateString(),
            dateFin: possession.dateFin ? new Date(possession.dateFin).toLocaleDateString() : 'N/A',
            tauxAmortissement: possession.tauxAmortissement || 'N/A'
          });
        });
      }
    });

    return formattedData;
  };

  const formattedPossessions = formatData(possessions);

  return (
    <div className="container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Possesseur</th>
            <th>Libellé</th>
            <th>Valeur</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux Amortissement</th>
          </tr>
        </thead>
        <tbody>
          {formattedPossessions.map((item, index) => (
            <tr key={index}>
              <td>{item.possesseur}</td>
              <td>{item.libelle}</td>
              <td>{item.valeur}</td>
              <td>{item.dateDebut}</td>
              <td>{item.dateFin}</td>
              <td>{item.tauxAmortissement}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PossessionTable;
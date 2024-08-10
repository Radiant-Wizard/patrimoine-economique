import React, { useState, useEffect } from 'react';
import Possession from './Possession';
import 'bootstrap/dist/css/bootstrap.min.css';
import './myCSS.css'


const PossessionTable = () => {
  const [possessions, setPossessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [patrimoineValue, setPatrimoineValue] = useState(0);

  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        const possessionsData = data.map(item => new Possession(
          item.possesseur.nom,
          item.libelle,
          item.valeur,
          new Date(item.dateDebut),
          item.dateFin ? new Date(item.dateFin) : null,
          item.tauxAmortissement,
          item.jour,
          item.valeurConstante
        ));
        setPossessions(possessionsData);
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }, [possessions]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const calculateCurrentValue = () => {
    const selectedDateObj = new Date(selectedDate);
    if (isNaN(selectedDateObj.getTime())) {
      alert('Please select a valid date');
      return;
    }
    const totalValue = possessions.reduce((acc, possession) => acc + possession.getValeur(selectedDateObj), 0);
    setPatrimoineValue(totalValue);
  };

  return (
    <div className="container">
      <h2 id='Title'>Possessions</h2>
      <table className="table table-striped bordered" id='table'>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur Initiale</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Amortissement (%)</th>
            <th>Valeur Actuelle</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur}</td>
              <td>{possession.dateDebut.toDateString()}</td>
              <td>{possession.dateFin ? possession.dateFin.toDateString() : 'N/A'}</td>
              <td>{possession.tauxAmortissement || 'N/A'}</td>
              <td>{possession.getValeur(new Date()).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Calculate Patrimoine Value</h3>
      <div className="footer">
        <label htmlFor="datePicker">Select Date:</label>
        <input
          type="date"
          className="form-control"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
        />
      <button onClick={calculateCurrentValue} className="btn btn-primary">Valider</button>
      <h4 >Valeur du Patrimoine: {patrimoineValue.toFixed(2)}</h4>
      </div>

    </div>
  );
};

export default PossessionTable;

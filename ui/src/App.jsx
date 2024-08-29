import React from 'react';
import PossessionTable from './Possession/PossessionTable.jsx'; // Ensure this path is correct
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS globally if not done elsewhere
import './myCSS.css';

const App = () => {
  return (
    <div className="App">
      <h1>Welcome to the Possession Tracker</h1>
      <PossessionTable />
    </div>
  );
};

export default App;
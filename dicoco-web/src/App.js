import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React from "react";
import DataTable from 'react-data-table-component';


const baseURL = "http://127.0.0.1:5000/";

const columns = [
    {
        name: 'Ortographe',
        selector: row => row.ortho,
        sortable: true,
    },
    {
        name: 'Phonétique',
        selector: row => row.phon,
        sortable: true,
    }
];

function App() {
  const [dico, setDico] = React.useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      console.log(JSON.parse(response.data.dict))
      setDico(JSON.parse(response.data.dict));
    });
  }, []);


  if (!dico) return null;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          Coucou Corentin c'est Milan.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <DataTable title="YourBlogCoach" columns={columns} data={dico}>
        </DataTable>
    </div>
  
  );
}

export default App;

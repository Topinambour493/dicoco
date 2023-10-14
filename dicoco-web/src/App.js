import './App.css';
import axios from "axios";
import React from "react";
import DataTable from 'react-data-table-component';


const baseURL = "http://127.0.0.1:5000/";

const columns = [
    {
        name: 'Nom',
        selector: row => row.ortho,
        cell:  row => <h3>{row.ortho}</h3>,
        sortable: true,
        center : true,
        style : {
            justifyContent: 'center' 
        }
    },
    {
        name: 'Genre',
        selector: row => row.genre,
        sortable: true,
        center : true,
        style : {
            justifyContent: 'center'
        }
    },
    {
        name: 'Nombre',
        selector: row => row.nombre,
        sortable: true,
        center : true,
        style : {
            justifyContent: 'center' 
        }
    },
    {
        name: 'Catégorie grammaticale',
        selector: row => row.cgram,
        sortable: true,
        center : true,
        style : {
            justifyContent: 'center' 
        }
    },
    {
        name: 'Lemme',
        selector: row => row.lemme,
        sortable: true,
        center : true,
        style : {
            justifyContent: 'center' 
        }
    },
    {
        name: 'Nombre de lettres',
        selector: row => row.nblettres,
        sortable: true,
        center : true,
        style : {
            justifyContent: 'center' 
        }
    },
    {
        name: 'Nombre de syllabes',
        selector: row => row.nbsyll,
        sortable: true,
        center : true,
        style : {
            justifyContent: 'center' 
        }
    },
    {
        name: 'Forme orthographique syllabée',
        selector: row => row.orthosyll,
        sortable: true,
        center : true,
        style : {
            justifyContent: 'center' 
        }
    },
    {
        name: 'Phonétique',
        selector: row => row.phon,
        sortable: true,
        center : true,
        style : {
          justifyContent: 'center' 
        }
    },
    {
        name: 'Unicité orthographique',
        selector: row => row.puorth,
        sortable: true,
        center : true,
        style : {
          justifyContent: 'center' 
        }
    },
    {
        name: "Nombre d'homophones",
        selector: row => row.nbhomoph,
        sortable: true,
        center : true,
        style : {
          justifyContent: 'center' 
        }
    },
    {
        name: "Inverse",
        selector: row => row.orthrenv,
        sortable: true,
        center : true,
        style : {
          justifyContent: 'center' 
        }
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
        <DataTable
            title="dicoco"
            columns={columns}
            data={dico}
            pagination
            striped
            highlightOnHover
        >
        </DataTable>
    </div>
  
  );
}

export default App;

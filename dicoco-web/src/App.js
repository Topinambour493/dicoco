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
            minWidth: 'auto'
        }
    },
    {
        name: 'Genre',
        selector: row => row.genre,
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Nombre',
        selector: row => row.nombre,
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Catégorie grammaticale',
        selector: row => row.cgram,
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Lemme',
        selector: row => row.lemme,
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Nombre de lettres',
        selector: row =>  parseInt(row.nblettres),
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Nombre de syllabes',
        selector: row => parseInt(row.nbsyll),
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Forme orthographique syllabée',
        selector: row => row.orthosyll,
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Phonétique',
        selector: row => row.phon,
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Unicité orthographique',
        selector: row => parseInt(row.puorth),
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: "Nombre d'homophones",
        selector: row => parseInt(row.nbhomoph),
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: "Inverse",
        selector: row => row.orthrenv,
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    }
];

function App() {
  const [dico, setDico] = React.useState([]);
  React.useEffect(() => {

    axios.get(baseURL).then((response) => {
      setDico(JSON.parse(response.data.dict));

    });
  }, []);


    const customSort = (rows, selector, direction) => {
        if (typeof (selector(rows[0])) === "string") {
            return rows.sort((rowA, rowB) => {
                // use the selector function to resolve your field names by passing the sort comparitors
                const aField = selector(rowA)
                const bField = selector(rowB)

                let comparison = new Intl.Collator("fr").compare(aField, bField)

                return direction === 'desc' ? comparison * -1 : comparison;
            });
        } else {
            return rows.sort((rowA, rowB) => {
                // use the selector function to resolve your field names by passing the sort comparitors
                const aField = selector(rowA)
                const bField = selector(rowB)

                let comparison = 0;

                if (aField > bField) {
                    comparison = 1;
                } else if (aField < bField) {
                    comparison = -1;
                }

                return direction === 'desc' ? comparison * -1 : comparison;
            });
        }
    };



  return (
    <div className="App">
        <DataTable
            title="dicoco"
            columns={columns}
            data={dico}
            pagination
            striped
            highlightOnHover
            sortFunction={customSort}
            noDataComponent={<img src="loader.gif"></img>}
        >
        </DataTable>
    </div>
  
  );
}

export default App;

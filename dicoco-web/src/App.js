import './App.css';
import "./test.css";
import axios from "axios";
import React from "react";
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';

const baseURL = "http://127.0.0.1:5000/";

const columns = [
    {
        name: 'Nom',
        id: "Nom",
        selector: row => row.ortho.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        cell:  row => <h3>{row.ortho}</h3>,
        sortable: true,
        center : true,
        style : {
            wordWrap: 'break-word',
            minWidth: 'auto'
        }
    },
    {
        name: 'Genre',
        selector: row => row.genre.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        cell:  row => get_genre(row.genre),
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Nombre',
        selector: row => row.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Catégorie grammaticale',
        selector: row => row.cgram.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Lemme',
        selector: row => row.lemme.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        cell:  row => <div>{row.lemme}</div>,
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Nombre de lettres',
        selector: row =>  parseInt(row.nblettres),
        cell:  row => <div>{row.nblettres}</div>,
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
        selector: row => row.orthosyll.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        cell:  row => <div>{row.orthosyll}</div>,
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    },
    {
        name: 'Phonétique',
        selector: row => row.phon.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        cell:  row => <div>{row.phon}</div>,
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
        selector: row => row.orthrenv.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        cell:  row => <div>{row.orthrenv}</div>,
        sortable: true,
        center : true,
        style : {
            minWidth: 'auto'
        }
    }
];

function  get_genre(genre){
    if (genre === "m")
        return "Masculin"
    else if (genre === "f")
        return "Féminin"
    else
        return "Neutre"
}

function addRedButton() {
    const button = document.createElement('button')
    button.innerText = 'Salut'
    button.classList.add('red-button')
    button.onclick = function (e){
        e.target.remove()
    }
    const app = document.getElementsByClassName("App")[0];
    app.insertBefore(button, app.firstChild);
  }

function printText(){
    alert("test")
}

function App() {
    const [pending, setPending] = React.useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const [dico, setDico] = React.useState([]);
    React.useEffect(() => {

    axios.get(baseURL).then((response) => {
        setDico(JSON.parse(response.data.dict));
        setPending(false);

    });
    }, []);

    function filterHead(data){
        console.log(data)
        axios.get(baseURL, {params : data}).then((response) => {
            setDico(JSON.parse(response.data.dict));

        });
    }

  return (
    <div className="App">
        
        <button onClick={()=>addRedButton()} id="green-button">Default</button>
        <form onSubmit={handleSubmit((data) => filterHead(data))}>
            <div>
                <label>Commence par :</label>
                <input {...register('startsWith')} />
            </div>
            <div>
                <label>Finit par :</label>
                <input {...register('endedWith')} />
            </div>
            <input type="submit" />
        </form>
        <form>    
            <label htmlFor="test1"> test: </label>
            <input type="text" id="test1" name="test1"/>
            <button type="submit" onClick={()=>printText()}>Envoyer le message</button>
        </form>
        <DataTable
            title="dicoco"
            columns={columns}
            data={dico}
            pagination
            striped
            highlightOnHover
            progressPending={pending}
            progressComponent={<img src="loader.gif"></img>}
            noDataComponent={<div>Pas de données</div>}
        >
        </DataTable>
    </div>
  
  );
}

export default App;

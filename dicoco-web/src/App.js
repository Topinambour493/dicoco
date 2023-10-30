import "./test.css";
import axios from "axios";
import React from "react";
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

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

const schema = yup.object({
    startsWith: yup.string(),
    startsWithPhoetically: yup.string(),
    endedWith:  yup.string(),
    endedWithPhoetically: yup.string(),
    contains: yup.string(),
    containsFollowing: yup.string(),
    anagram: yup.string(),
    minimumNumberSyllables: yup.number().positive().integer(),
    maximumNumberSyllables: yup.number().positive().integer(),
});
function App() {

    const [pending, setPending] = React.useState(true);
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
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
            <div className={"form-container"}>
                <div className={"form-child"}>
                    <label>Commence par :</label>
                    <input {...register('startsWith')} />
                    <p className={"message-error"}>{errors.startsWith?.message}</p>
                </div>
                <div className={"form-child"}>
                    <label>Commence phonétiquement par :</label>
                    <input {...register('startsWithPhoetically')} />
                    <p className={"message-error"}>{errors.startsWithPhoetically?.message}</p>
                </div>
                <div className={"form-child"}>
                    <label>Finit par :</label>
                    <input {...register('endedWith')} />
                    <p className={"message-error"}>{errors.endedWith?.message}</p>
                </div>
                <div className={"form-child"}>
                    <label>Finit phonétiquement par :</label>
                    <input {...register('endedWithPhoetically')} />
                    <p className={"message-error"}>{errors.endedWithPhoetically?.message}</p>
                </div>
                <div className={"form-child"}>
                    <label>Contient :</label>
                    <input {...register('contains')} />
                    <p className={"message-error"}>{errors.contains?.message}</p>
                </div>
                <div className={"form-child"}>
                    <label>Contient à la suite :</label>
                    <input {...register('containsFollowing')} />
                    <p className={"message-error"}>{errors.containsFollowing?.message}</p>
                </div>
                <div className={"form-child"}>
                    <label>Anagramme :</label>
                    <input {...register('anagram')} />
                    <p className={"message-error"}>{errors.anagram?.message}</p>
                </div>
                <div className={"form-child"}>
                    <label>Nombre de syllabes minimum :</label>
                    <input type="number"  {...register('minimumNumberSyllables', { min: 0})} />
                    <p className={"message-error"}>{errors.minimumNumberSyllables?.message}</p>
            </div>
                <div className={"form-child"}>
                    <label>Nombre de syllabes maximum :</label>
                    <input type="number"  {...register('maximumNumberSyllables', { min: 0})} />
                    <p className={"message-error"}>{errors.maximumNumberSyllables?.message}</p>
                </div>
                <input type="submit" />
            </div>
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

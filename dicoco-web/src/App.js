import "./test.css";
import axios from "axios";
import React from "react";
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { GooeyCircleLoader } from "react-loaders-kit";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const baseURL = "http://127.0.0.1:5000/";

function  get_genre(genre){
    if (genre === "m")
        return "Masculin"
    else if (genre === "f")
        return "Féminin"
    else
        return "Neutre"
}

yup.setLocale({
    mixed: {
        required: 'champ requis',
        default: 'Non valide',
    },
    number: {
        default: "doit être un nombre",
        integer: "doit être un entier",
        positive: "doit être positif",
        typeError: "doit être un nombre"
    },
});

let schema = yup.object().shape({
    startsWith: yup.string(),
    startsWithPhoetically: yup.string(),
    endedWith: yup.string(),
    endedWithPhoetically: yup.string(),
    contains: yup.string(),
    containsPhoetically: yup.string(),
    containsFollowing: yup.string(),
    containsFollowingPhoetically: yup.string(),
    anagram: yup.string(),
    anagramPhoetically: yup.string(),
    anagramMinus: yup.string(),
    anagramPlus: yup.string(),
    minimumNumberSyllables: yup.number().required().typeError().integer().positive().max( yup.ref('maximumNumberSyllables'), () => 'doit être inférieur à la valeur maximum'),
    maximumNumberSyllables: yup.number().required().typeError().integer().positive().min( yup.ref('minimumNumberSyllables'),() => `doit être supérieur à la valeur minimum`),
    minimumNumberLetters: yup.number().required().typeError().integer().positive().max( yup.ref('maximumNumberLetters'), () => 'doit être inférieur à la valeur maximum'),
    maximumNumberLetters: yup.number().required().typeError().integer().positive().min( yup.ref('minimumNumberLetters'),() => `doit être supérieur à la valeur minimum`),
})

function App() {
    const [displays, setDisplays] =  React.useState({
        displayName: true,
        displayGender: true
    })
    const [pending, setPending] = React.useState(true);
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            minimumNumberSyllables: 1,
            maximumNumberSyllables: 10,
            minimumNumberLetters: 1,
            maximumNumberLetters: 25
        }
    });
    const [dico, setDico] = React.useState([]);

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setDisplays({
            ...displays,
            [name]: value
        });
    }

    const loaderProps = {
        loading: true,
        size: 275,
        duration: 2,
        colors: ["#99fffe", "#f42e00", "#042549"],
    };


    function downloadCSV() {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(dico);
        if (csv == null) return;

        const filename = 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

    function convertArrayOfObjectsToCSV(array) {
        let result;

        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(dico[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                // eslint-disable-next-line no-plusplus
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setDico(JSON.parse(response.data.dict));
            setPending(false);

        });
    }, []);

    const columns = React.useMemo(
        () => [
        {
            name: 'Nom',
            id: "Nom",
            omit: !displays.displayName,
            selector: row => row.ortho.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            cell:  row => <h3>{row.ortho}</h3>,
            sortable: true,
            center : true,
            reorder: true,
            style : {
                wordWrap: 'break-word',
                minWidth: 'auto'
            },
        },
        {
            name: 'Genre',
            omit: !displays.displayGender,
            selector: row => row.genre.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            cell:  row => get_genre(row.genre),
            sortable: true,
            center : true,
            reorder: true,
            style : {
                minWidth: 'auto'
            }
        },
        {
            name: 'Nombre',
            selector: row => row.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            sortable: true,
            center : true,
            reorder: true,
            style : {
                minWidth: 'auto'
            }
        },
        {
            name: 'Catégorie grammaticale',
            selector: row => row.cgram.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            sortable: true,
            center : true,
            reorder: true,
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
            reorder: true,
            style : {
                minWidth: 'auto'
            }
        },
        {
            name: 'Nombre de lettres',
            selector: row =>  parseInt(row.nbletters),
            cell:  row => <div>{row.nbletters}</div>,
            sortable: true,
            center : true,
            reorder: true,
            style : {
                minWidth: 'auto'
            }
        },
        {
            name: 'Nombre de syllabes',
            selector: row => parseInt(row.nbsyll),
            sortable: true,
            center : true,
            reorder: true,
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
            reorder: true,
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
            reorder: true,
            style : {
                minWidth: 'auto'
            }
        },
        {
            name: 'Unicité orthographique',
            selector: row => parseInt(row.puorth),
            sortable: true,
            center : true,
            reorder: true,
            style : {
                minWidth: 'auto'
            }
        },
        {
            name: "Nombre d'homophones",
            selector: row => parseInt(row.nbhomoph),
            sortable: true,
            center : true,
            reorder: true,
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
            reorder: true,
            style : {
                minWidth: 'auto'
            }
        }
    ],
    [displays.displayName, displays.displayGender],
    );

    function filterHead(data){
        console.log(data);
        axios.get(baseURL, {params : data}).then((response) => {
            setDico(JSON.parse(response.data.dict));
        });


    }

    let div = <div className="App">
        <form id="form-fiter_head" onSubmit={handleSubmit((data) => filterHead(data))}>
            <div className={"form-container"}>
                <fieldset>
                    <legend>Alphabétique:</legend>
                    <div className={"form-child"}>
                        <label>Commence par :</label>
                        <input {...register('startsWith')} />
                        <p className={"message-error"}>{errors.startsWith?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Finit par :</label>
                        <input {...register('endedWith')} />
                        <p className={"message-error"}>{errors.endedWith?.message}</p>
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
                        <label>Anagramme moins:</label>
                        <input {...register('anagramMinus')} />
                        <p className={"message-error"}>{errors.anagramMinus?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Anagramme plus:</label>
                        <input {...register('anagramPlus')} />
                        <p className={"message-error"}>{errors.anagramPlus?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Nombre de lettres minimum :</label>
                        <input type="number" required {...register('minimumNumberLetters', {min: 0})} />
                        <p className={"message-error"}>{errors.minimumNumberLetterss?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Nombre de lettres maximum :</label>
                        <input type="number" required {...register('maximumNumberLetters', {min: 0})} />
                        <p className={"message-error"}>{errors.maximumNumbeLetters?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Nombre de syllabes minimum :</label>
                        <input type="number" required {...register('minimumNumberSyllables', {min: 0})} />
                        <p className={"message-error"}>{errors.minimumNumberSyllables?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Nombre de syllabes maximum :</label>
                        <input type="number" required {...register('maximumNumberSyllables', {min: 0})} />
                        <p className={"message-error"}>{errors.maximumNumberSyllables?.message}</p>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Phonétique:</legend>
                    <div className={"form-child"}>
                        <label>Commence par :</label>
                        <input {...register('startsWithPhoetically')} />
                        <p className={"message-error"}>{errors.startsWithPhoetically?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Finit par :</label>
                        <input {...register('endedWithPhoetically')} />
                        <p className={"message-error"}>{errors.endedWithPhoetically?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Contient :</label>
                        <input {...register('containsPhoetically')} />
                        <p className={"message-error"}>{errors.containsPhoetically?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Contient à la suite :</label>
                        <input {...register('containsFollowingPhoetically')} />
                        <p className={"message-error"}>{errors.containsFollowingPhoetically?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Anagramme :</label>
                        <input {...register('anagramPhoetically')} />
                        <p className={"message-error"}>{errors.anagramPhoetically?.message}</p>
                    </div>
                </fieldset>
                <div className={"form-child"} id={"submit"}>
                    <button type="submit" className="button">Send</button>
                    <button onClick={() => downloadCSV()}>Export</button>
                </div>
                <fieldset className={"affichage"}>
                    <legend>Affichage:</legend>
                    <div className={"ckeckbox-display"}>
                        <input
                            type="checkbox"
                            id="displayName"
                            name="displayName"
                            onChange={e => handleInputChange(e)}
                            checked={displays.displayName}
                        />
                        <label htmlFor="displayName">Nom</label>
                    </div>
                    <div className={"ckeckbox-display"}>
                        <input
                            type="checkbox"
                            id="displayGender"
                            name="displayGender"
                            onChange={e => handleInputChange(e)}
                            checked={displays.displayGender}
                        />
                        <label htmlFor="displayGender">Genre</label>
                    </div>
                </fieldset>
            </div>

        </form>

        <DataTable
            columns={columns}
            data={dico}
            pagination
            striped
            highlightOnHover
            progressPending={pending}
            progressComponent={<GooeyCircleLoader {...loaderProps} />}
            noDataComponent={<div>Pas de données</div>}
            useSortBy
        >
        </DataTable>
    </div>;
    return div;
}

export default App;

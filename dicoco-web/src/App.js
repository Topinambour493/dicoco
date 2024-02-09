import axios from "axios";
import React, {useEffect} from "react";
import DataTable from 'react-data-table-component';
import {Controller, useForm} from 'react-hook-form';
import {GooeyCircleLoader} from "react-loaders-kit";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import Select from 'react-select';


const baseURL = process.env.REACT_APP_BASE_URL;


function get_genre(genre) {
    if (genre === "m")
        return "Masculin"
    else if (genre === "f")
        return "Féminin"
    else
        return "Neutre"
}

const options = [
    {label: "Nom", value: "NOM"},
    {label: "Auxiliaire", value: "AUX"},
    {label: "Verbe", value: "VER"},
    {label: "Autre", value: ""},
    {label: "Préposition", value: "PRE"},
    {label: "Adjectif", value: "ADJ"},
    {label: "Interjection", value: "ONO"},
    {label: "Conjonction", value: "CON"},
    {label: "Article défini", value: "ART:def"},
    {label: "Article indéfini", value: "ADJ:ind"},
    {label: "Pronom indéfini", value: "PRO:ind"},
    {label: "Pronom interrogatif", value: "PRO:int"},
    {label: "Pronom relatif", value: "PRO:rel"},
    {label: "Adjectif numérique", value: "ADJ:num"},
    {label: "Pronom personnel", value: "PRO:per"},
    {label: "Article indéfini", value: "ART:ind"},
    {label: "Liaison", value: "LIA"},
    {label: "Pronom possessif", value: "PRO:pos"},
    {label: "Pronom démonstratif", value: "PRO:dem"},
    {label: "Adjectif démonstratif", value: "ADJ:dem"},
    {label: "Adjectif possessif", value: "ADJ:pos"},
    {label: "Adjectif interrogatif", value: "ADJ:int"}
];

function get_nombre(nombre) {
    if (nombre === "s")
        return "Singulier"
    else if (nombre === "p")
        return "Pluriel"
    else
        return ""
}

function get_grammatical_category(grammatical_category) {
    if (grammatical_category === "NOM")
        return "Nom"
    else if (grammatical_category === "AUX")
        return "Auxiliaire"
    else if (grammatical_category === "VER")
        return "Verbe"
    else if (grammatical_category === "ADV")
        return "Adverbe"
    else if (grammatical_category === "PRE")
        return "Préposition"
    else if (grammatical_category === "ADJ")
        return "Adjectif"
    else if (grammatical_category === "ONO")
        return "Interjection"
    else if (grammatical_category === "CON")
        return "Conjonction"
    else if (grammatical_category === "ART:def")
        return "Article défini"
    else if (grammatical_category === "ADJ:ind")
        return "Adjéctif indéfini"
    else if (grammatical_category === "PRO:ind")
        return "Pronom indéfini"
    else if (grammatical_category === "PRO:int")
        return "Pronom interrogatif"
    else if (grammatical_category === "PRO:rel")
        return "Pronom relatif"
    else if (grammatical_category === "ADJ:num")
        return "Adjectif numérique"
    else if (grammatical_category === "PRO:per")
        return "Pronom personnel"
    else if (grammatical_category === "ART:ind")
        return "Article indéfini"
    else if (grammatical_category === "LIA")
        return "Liaison"
    else if (grammatical_category === "PRO:pos")
        return "Pronom possessif"
    else if (grammatical_category === "PRO:dem")
        return "Pronom démonstratif"
    else if (grammatical_category === "ADJ:dem")
        return "Adjectif démonstratif"
    else if (grammatical_category === "ADJ:pos")
        return "Adjectif possessif"
    else if (grammatical_category === "ADJ:int")
        return "Adjectif interrogatif"
    else
        return "Autre"
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
    anagramMinusPhoetically: yup.string(),
    anagramPlusPhoetically: yup.string(),
    minimumNumberSyllables: yup.number().required().typeError().integer().positive().max(yup.ref('maximumNumberSyllables'), () => 'doit être inférieur à la valeur maximum'),
    maximumNumberSyllables: yup.number().required().typeError().integer().positive().min(yup.ref('minimumNumberSyllables'), () => `doit être supérieur à la valeur minimum`),
    minimumNumberLetters: yup.number().required().typeError().integer().positive().max(yup.ref('maximumNumberLetters'), () => 'doit être inférieur à la valeur maximum'),
    maximumNumberLetters: yup.number().required().typeError().integer().positive().min(yup.ref('minimumNumberLetters'), () => `doit être supérieur à la valeur minimum`),
})

function App() {
    const [displays, setDisplays] = React.useState({
        displayName: true,
        displayGender: true,
        displayNumber: true,
        displayCgram: true,
        displayLemme: true,
        displayNumberofLetters : true
    })
    const [pending, setPending] = React.useState(false);
    const {register, handleSubmit, formState: {errors}, control} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            minimumNumberSyllables: 1,
            maximumNumberSyllables: 10,
            minimumNumberLetters: 1,
            maximumNumberLetters: 25,
            grammatical_category: []
        }
    });
    const [dico, setDico] = React.useState([]);

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr

    function hideAllTooltips(exception) {
        let tooltips = document.getElementsByClassName("tooltip-content");
        for (let j = 0; j < tooltips.length; j++) {
            if (tooltips[j] === exception)
                continue
            tooltips[j].style.display = "none";
        }

    }

    function changeStateTooltip(e) {
        e.stopPropagation()
        let tooltip = e.target.parentElement.lastChild
         console.log(tooltip.style.display)
        if (tooltip.style.display === "block")
            tooltip.style.display = "none";
        else
            tooltip.style.display = "block"
        hideAllTooltips(tooltip)

    }

    useEffect(() => {
        let elements = document.getElementsByClassName("container-tooltip");

        document.body.addEventListener("click", hideAllTooltips, false)


        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', changeStateTooltip, false);
        }


    });

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
            omit: !displays.displayNumber,
            selector: row => row.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            cell:  row => get_nombre(row.nombre),
            sortable: true,
            center : true,
            reorder: true,
            style : {
                minWidth: 'auto'
            }
        },
        {
            name: 'Catégorie grammaticale',
            omit: !displays.displayCgram,
            selector: row => row.cgram.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
            cell: row => get_grammatical_category(row.cgram),
            sortable: true,
            center : true,
            reorder: true,
            style : {
                minWidth: 'auto'
            }
        },
        {
            name: 'Lemme',
            omit : !displays.displayLemme,
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
            omit: !displays.displayNumberofLetters,
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
    [displays.displayName, displays.displayGender, displays.displayNumber, displays.displayCgram, displays.displayLemme, displays.displayNumberofLetters],
    );

    function filterHead(data) {
        if (data.grammatical_category)
            data.grammatical = JSON.stringify(data.grammatical_category.map((x) => x.value));
        console.log(baseURL)
        setPending(true);
        axios.get(baseURL, {params : data}).then((response) => {
            setDico(JSON.parse(response.data.dict));
            setPending(false);
        });


    }

    let diva = <div className="App">
        <form id="form-fiter_head" onSubmit={handleSubmit((data) => {
            filterHead(data)
        })}>
            <div className={"form-container"}>
                <fieldset>
                    <legend>Alphabétique</legend>
                    <div className={"form-child"}>
                        <label>Commence par </label>
                        <input autoCapitalize="none" {...register('startsWith')} />
                        <p className={"message-error"}>{errors.startsWith?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Finit par </label>
                        <input autoCapitalize="none" {...register('endedWith')} />
                        <p className={"message-error"}>{errors.endedWith?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label className={"tooltip"}>
                            Contient
                            <div className={"container-tooltip"}>
                                <img src={"information-icon.svg"} className={"info-button"}
                                     alt={"explication contient"}/>
                                <span className={"tooltip-content right"}>Renvoit les mots contenant dans l'ordre mais pas forcément à la suite les lettres donnés</span>
                            </div>
                        </label>
                        <input autoCapitalize="none" {...register('contains')} />
                        <p className={"message-error"}>{errors.contains?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label className={"tooltip"}>
                            Contient à la suite
                            <div className={"container-tooltip"}>
                                <img src={"information-icon.svg"} className={"info-button"}
                                     alt={"explication contient à la suite"}/>
                                <span className={"tooltip-content right"}>Renvoit les mots contenant à la suite les lettres donnés</span>
                            </div>
                        </label>
                        <input autoCapitalize="none" {...register('containsFollowing')} />
                        <p className={"message-error"}>{errors.containsFollowing?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Anagramme </label>
                        <input autoCapitalize="none" {...register('anagram')} />
                        <p className={"message-error"}>{errors.anagram?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label className={"tooltip"}>
                            Anagramme moins
                            <div className={"container-tooltip"}>
                                <img src={"information-icon.svg"} className={"info-button"}
                                     alt={"explication anagramme moins"}/>
                                <span className={"tooltip-content right"}>Renvoit les mots contenant uniquement tout ou en partie les lettres données</span>
                            </div>
                        </label>
                        <input autoCapitalize="none" {...register('anagramMinus')} />
                        <p className={"message-error"}>{errors.anagramMinus?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label className={"tooltip"}>
                            Anagramme plus
                            <div className={"container-tooltip"}>
                                <img src={"information-icon.svg"} className={"info-button"}
                                     alt={"explication anagramme plus"}/>
                                <span className={"tooltip-content right"}>Renvoit les mots contenant au minimum toutes les lettres données</span>
                            </div>
                        </label>
                        <input autoCapitalize="none" {...register('anagramPlus')} />
                        <p className={"message-error"}>{errors.anagramPlus?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Nombre de lettres minimum *</label>
                        <input
                            type="number"
                            required
                            {...register('minimumNumberLetters', {min: 0})}
                        />
                        <p className={"message-error"}>{errors.minimumNumberLetterss?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Nombre de lettres maximum *</label>
                        <input
                            type="number"
                            required
                            {...register('maximumNumberLetters', {min: 0})}
                        />
                        <p className={"message-error"}>{errors.maximumNumbeLetters?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Nombre de syllabes minimum *</label>
                        <input
                            type="number"
                            required {...register('minimumNumberSyllables', {min: 0})}
                        />
                        <p className={"message-error"}>{errors.minimumNumberSyllables?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Nombre de syllabes maximum *</label>
                        <input
                            type="number"
                            required
                            {...register('maximumNumberSyllables', {min: 0})}
                        />
                        <p className={"message-error"}>{errors.maximumNumberSyllables?.message}</p>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Phonétique</legend>
                    <div className={"form-child"}>
                        <label>Commence par </label>
                        <input autoCapitalize="none" {...register('startsWithPhoetically')} />
                        <p className={"message-error"}>{errors.startsWithPhoetically?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Finit par </label>
                        <input autoCapitalize="none" {...register('endedWithPhoetically')} />
                        <p className={"message-error"}>{errors.endedWithPhoetically?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label className={"tooltip"}>Contient
                            <div className={"container-tooltip"}>
                                <img
                                    src={"information-icon.svg"} className={"info-button"}
                                    alt={"explication contient"}/>
                                <span className={"tooltip-content right"}>Renvoit les mots contenant dans l'ordre mais pas forcément à la suite les lettres donnés</span>
                            </div>
                        </label>
                        <input autoCapitalize="none" {...register('containsPhoetically')}/>
                        <p className={"message-error"}>{errors.containsPhoetically?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label className={"tooltip"}>Contient à la suite
                            <div className={"container-tooltip"}>
                                <img
                                    src={"information-icon.svg"} className={"info-button"}
                                    alt={"explication contient à la suite"}/>
                                <span className={"tooltip-content right"}>Renvoit les mots contenant à la suite les lettres donnés</span>
                            </div>
                        </label>
                        <input autoCapitalize="none" {...register('containsFollowingPhoetically')} />
                        <p className={"message-error"}>{errors.containsFollowingPhoetically?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label>Anagramme </label>
                        <input autoCapitalize="none" {...register('anagramPhoetically')} />
                        <p className={"message-error"}>{errors.anagramPhoetically?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label className={"tooltip"}>Anagramme moins
                            <div className={"container-tooltip"}>
                                <img
                                    src={"information-icon.svg"} className={"info-button"}
                                    alt={"explication anagramme moins"}/>
                                <span className={"tooltip-content right"}>Renvoit les mots contenant au minimum toutes les lettres données</span>
                            </div>
                        </label>
                        <input autoCapitalize="none" {...register('anagramMinusPhoetically')} />
                        <p className={"message-error"}>{errors.anagramMinusPhoetically?.message}</p>
                    </div>
                    <div className={"form-child"}>
                        <label className={"tooltip"}>Anagramme plus
                            <div className={"container-tooltip"}>
                                <img src={"information-icon.svg"} className={"info-button"}
                                     alt={"explication anagramme plus"}/>
                                <span className={"tooltip-content right"}>Renvoit les mots contenant au minimum toutes les lettres données</span>
                            </div>
                        </label>
                        <input autoCapitalize="none" {...register('anagramPlusPhoetically')} />
                        <p className={"message-error"}>{errors.anagramPlusPhoetically?.message}</p>
                    </div>
                </fieldset>
                <fieldset className={"affichage"}>
                    <legend>Affichage</legend>
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
                        <label htmlFor="displayGender"> Genre</label>
                    </div>
                    <div className={"ckeckbox-display"}>
                        <input
                            type="checkbox"
                            id="displayNumber"
                            name="displayNumber"
                            onChange={e => handleInputChange(e)}
                            checked={displays.displayNumber}
                        />
                        <label htmlFor="displayNumber"> Nombre</label>
                    </div>
                    <div className={"ckeckbox-display"}>
                        <input
                            type="checkbox"
                            id="displayCgram"
                            name="displayCgram"
                            onChange={e => handleInputChange(e)}
                            checked={displays.displayCgram}
                        />
                        <label htmlFor="displayCgram"> Catégorie grammaticale</label>
                    </div>
                    <div className={"ckeckbox-display"}>
                        <input
                            type="checkbox"
                            id="displayLemme"
                            name="displayLemme"
                            onChange={e => handleInputChange(e)}
                            checked={displays.displayLemme}
                        />
                        <label htmlFor="displayLemme"> Lemme</label>
                    </div>
                    <div className={"ckeckbox-display"}>
                        <input
                            type="checkbox"
                            id="displayNumberofLetters"
                            name="displayNumberofLetters"
                            onChange={e => handleInputChange(e)}
                            checked={displays.displayNumberofLetters}
                        />
                        <label htmlFor="displayNumberofLetters"> Nombre de lettres</label>
                    </div>
                </fieldset>
                <fieldset className={"Divers"}>
                    <legend>Autres</legend>
                    <div className={"form-child"}>
                        <label>Catégorie grammaticale</label>
                        <Controller
                            control={control}
                            name="grammatical_category"
                            render={({field: {onChange, onBlur, value}}) => (
                                <Select
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value}
                                    options={options}
                                    isMulti
                                />
                            )}
                        />
                    </div>
                </fieldset>
                <div className={"form-child"} id={"submit"}>
                    <button type="submit" className="button">Send</button>
                </div>
            </div>

        </form>

        <DataTable
            columns={columns}
            data={dico}
            pagination
            striped
            highlightOnHover
            progressPending={pending}
            progressComponent={<div id="loader"><GooeyCircleLoader {...loaderProps} /></div>}
            noDataComponent={<div>Pas de données</div>}
            useSortBy
        >
        </DataTable>
    </div>;
    return diva;
}

export default App;

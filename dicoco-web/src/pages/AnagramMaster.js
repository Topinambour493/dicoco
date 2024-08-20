import DataTable from "react-data-table-component";
import {GooeyCircleLoader} from "react-loaders-kit";
import React, {useEffect, useState} from "react";
import {
    filterHead,
    get_genre,
    get_nombre,
    get_grammatical_category,
    loaderProps,
    handleInputChange,
    hideAllTooltips,
    changeStateTooltip
} from "../utils/utils";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FilterDisplay from "../components/FilterDisplay";
import AnagramFilter from "../components/AnagramFilter";
import ExplicationAnagram from "../components/ExplicationAnagramMaster";


let schema = yup.object().shape({
    anagramMinus: yup.string(),
    accentConsidered: yup.boolean(),
})

function AnagramMaster() {
    const [dico, setDico] = React.useState([]);
    const [pending, setPending] = React.useState(false);
    const {register, handleSubmit, formState: {errors}, control} = useForm({
        resolver: yupResolver(schema),
    });

    const [tab, setTab] = useState("anagram")
    const [displays, setDisplays] = React.useState({
        displayName: true,
        displayGender: true,
        displayNumber: true,
        displayCgram: true,
        displayLemme: true,
        displayNumberLetter: true,
        displayNumberSyl: true,
        displayOrthosyll: true,
        displayPhon: true,
        displayPuorth: true,
        displayNbhomoph: true,
        displayOrthrenv: true,
        accentConsidered: true

    })

    const columns = React.useMemo(() => [
            {
                name: 'Nom',
                id: "Nom",
                omit: !displays.displayName,
                selector: row => row.ortho.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                cell: row => <h3>{row.ortho}</h3>,
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    wordWrap: 'break-word',
                    minWidth: 'auto'
                },
            },
            {
                name: 'Genre',
                omit: !displays.displayGender,
                selector: row => row.genre.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                cell: row => get_genre(row.genre),
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    minWidth: 'auto'
                }
            },
            {
                name: 'Nombre',
                omit: !displays.displayNumber,
                selector: row => row.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                cell: row => get_nombre(row.nombre),
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    minWidth: 'auto'
                }
            },
            {
                name: 'Catégorie grammaticale',
                omit: !displays.displayCgram,
                selector: row => row.cgram.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                cell: row => get_grammatical_category(row.cgram),
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    minWidth: 'auto'
                }
            },
            {
                name: 'Lemme',
                omit: !displays.displayLemme,
                selector: row => row.lemme.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                cell: row => <div>{row.lemme}</div>,
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    minWidth: 'auto'
                }
            },
            {
                name: 'Nombre de lettres',
                omit: !displays.displayNumberLetter,
                selector: row => parseInt(row.nbletters),
                cell: row => <div>{row.nbletters}</div>,
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    minWidth: 'auto'
                }
            },
            {
                name: 'Nombre de syllabes',
                omit: !displays.displayNumberSyl,
                selector: row => parseInt(row.nbsyll),
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    minWidth: 'auto'
                }
            },
            {
                name: 'Forme orthographique syllabée',
                omit: !displays.displayOrthosyll,
                selector: row => row.orthosyll.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                cell: row => <div>{row.orthosyll}</div>,
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    minWidth: 'auto'
                }
            },
            {
                name: 'Phonétique',
                omit: !displays.displayPhon,
                selector: row => row.phon.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                cell: row => <div>{row.phon}</div>,
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    minWidth: 'auto'
                }
            },
            {
                name: 'Unicité orthographique',
                omit: !displays.displayPuorth,
                selector: row => parseInt(row.puorth),
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    minWidth: 'auto'
                }
            },
            {
                name: "Nombre d'homophones",
                omit: !displays.displayNbhomoph,
                selector: row => parseInt(row.nbhomoph),
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    minWidth: 'auto'
                }
            },
            {
                name: "Inverse",
                omit: !displays.displayOrthrenv,
                selector: row => row.orthrenv.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
                cell: row => <div>{row.orthrenv}</div>,
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    minWidth: 'auto'
                }
            }
        ],
        [displays.displayName, displays.displayGender, displays.displayNumber, displays.displayCgram, displays.displayLemme, displays.displayNumberLetter, displays.displayNumberSyl, displays.displayNbhomoph, displays.displayOrthosyll, displays.displayPhon, displays.displayOrthrenv, displays.displayPuorth],
    );

    const onOptionChange = e => {
        setTab(e.target.value)
    }

    useEffect(() => {
        document.title = "Dicoco anagramme: la recherche d'anagrammes sur le dictionnaire français"
        let elements = document.getElementsByClassName("container-tooltip");

        document.body.addEventListener("click", hideAllTooltips);


        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', changeStateTooltip);
        }
    }, []);

    let anagramMaster = <div className="anagramMaster">
            <ExplicationAnagram/>
            <div className={"tabs"}>
                <input type="radio" value={"anagram"} id="tab1" checked={tab === "anagram"} onChange={onOptionChange}
                       className="tab"/>
                <label htmlFor="tab1">Anagramme</label>
                <input type="radio" value={"display"} id="tab2" checked={tab === "display"} onChange={onOptionChange}
                       className="tab"/>
                <label htmlFor="tab2">Affichage</label>
            </div>
            <form id="form-fiter_head" onSubmit={handleSubmit((data) => {
                filterHead(data, setPending, setDico)
            })}>
                <div className={"form-container"}>
                    <AnagramFilter
                        displays={displays}
                        setDisplays={setDisplays}
                        register={register}
                        errors={errors}
                        tab={tab}
                    />
                    <FilterDisplay
                        displays={displays}
                        setDisplays={setDisplays}
                        tab={tab}
                    />
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
                defaultSortFieldId={6}
                defaultSortAsc={false}

            >
            </DataTable>

        </div>
    ;
    return anagramMaster;
}

export default AnagramMaster;
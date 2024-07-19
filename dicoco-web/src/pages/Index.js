import axios from "axios";
import React, {useEffect, useState} from "react";
import DataTable from 'react-data-table-component';
import {Controller, useForm} from 'react-hook-form';
import {GooeyCircleLoader} from "react-loaders-kit";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import Select from 'react-select';
import {
    filterHead,
    get_genre,
    get_nombre,
    get_grammatical_category,
    loaderProps,
    handleInputChange
} from "../utils/utils";
import FilterDisplay from "../components/FilterDisplay";
import PhoneticFilter from "../components/PhoneticFilter";
import OtherFilter from "../components/OtherFilter";
import AlphabeticFilter from "../components/AlphabeticFilter";
import TabsHeader from "../components/TabsHeader";

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
    accentConsidered: yup.boolean(),
})

function Index() {
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
    const [tab, setTab] = useState("alphabetic")

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
                cell: row => <h3>{row.ortho}</h3>,
                sortable: true,
                center: true,
                reorder: true,
                style: {
                    wordWrap: 'break-word',
                    minWidth: 'auto',
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
                name: "Lemme",
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


    const handleClick = () => {
        alert('En-tête cliqué !');
    };

    const HeaderWithButton = () => (
        <div className="header-container">
            <span>ID</span>
            <button className="header-button" onClick={handleClick}>
                Action
            </button>
        </div>
    );


    let index = <div className="app">
            <TabsHeader tab={tab} setTab={setTab}/>
            <form id="form-fiter_head" onSubmit={handleSubmit((data) => {
                filterHead(data, setPending, setDico)
            })}>
                <div className={"form-container"}>
                    <AlphabeticFilter
                        tab={tab}
                        displays={displays}
                        setDisplays={setDisplays}
                        register={register}
                        errors={errors}
                    />
                    <PhoneticFilter
                        tab={tab}
                        register={register}
                        errors={errors}
                    />
                    <FilterDisplay
                        tab={tab}
                        displays={displays}
                        setDisplays={setDisplays}
                    />
                    <OtherFilter
                        tab={tab}
                        control={control}
                        options={options}
                    />
                    <div className={"form-child"} id={"submit"}>
                        <button type="submit" className="button">Send</button>
                    </div>
                </div>

            </form>
            <div className={"table-wrapper"}>
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
                    responsive
                >
                </DataTable>
            </div>
        </div>
    ;
    return index;
}

export default Index;

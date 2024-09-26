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
    handleInputChange,
    hideAllTooltips,
    changeStateTooltip, getColumns, GetColumns
} from "../utils/utils";
import FilterDisplay from "../components/FilterDisplay";
import PhoneticFilter from "../components/PhoneticFilter";
import OtherFilter from "../components/OtherFilter";
import AlphabeticFilter from "../components/AlphabeticFilter";
import TabsHeader from "../components/TabsHeader";
import ExplicationIndex from "../components/ExplicationIndex";

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
    startsWithPhonology: yup.string(),
    endsWith: yup.string(),
    endsWithPhonology: yup.string(),
    contains: yup.string(),
    containsPhonology: yup.string(),
    containsFollowing: yup.string(),
    containsFollowingPhonology: yup.string(),
    anagram: yup.string(),
    anagramPhonology: yup.string(),
    anagramMinus: yup.string(),
    anagramPlus: yup.string(),
    anagramMinusPhonology: yup.string(),
    anagramPlusPhonology: yup.string(),
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


    useEffect(() => {
        document.title = "Dicoco : la recherche et le filtrage sur le dictionnaire français"
        let elements = document.getElementsByClassName("container-tooltip");

        document.body.addEventListener("click", hideAllTooltips);


        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', changeStateTooltip);
        }
    }, []);


    const columns = GetColumns(displays)


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
            <ExplicationIndex/>
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

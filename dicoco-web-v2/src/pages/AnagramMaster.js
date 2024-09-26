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
    changeStateTooltip, getColumns, GetColumns
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
        accentConsidered: true
    })

    const columns = GetColumns(displays)

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
import axios from "axios";
import React from "react";

export function filterHead(data, setPending, setDico) {
    const baseURL = process.env.REACT_APP_BASE_URL;

    if (data.grammatical_category)
        data.grammatical = JSON.stringify(data.grammatical_category.map((x) => x.value));
    setPending(true);
    axios.get(baseURL, {params: data}).then((response) => {
        setDico(JSON.parse(response.data.dict));
        setPending(false);
    });
}


export function get_genre(genre) {
    if (genre === "m")
        return "Masculin"
    else if (genre === "f")
        return "Féminin"
    else
        return "Neutre"
}


export function get_nombre(nombre) {
    if (nombre === "s")
        return "Singulier"
    else if (nombre === "p")
        return "Pluriel"
    else
        return ""
}

export function get_grammatical_category(grammatical_category) {
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


export const loaderProps = {
    loading: true,
    size: 275,
    duration: 2,
    colors: ["#99fffe", "#f42e00", "#042549"],
};


export const handleInputChange = (event, displays, setDisplays) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setDisplays({
        ...displays,
        [name]: value
    });
}


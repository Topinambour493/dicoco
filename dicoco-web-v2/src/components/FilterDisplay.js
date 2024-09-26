import React from "react";
import {apply_max_width_for_all_div, handleInputChange} from "../utils/utils";

function FilterDisplay({displays, setDisplays, tab}) {

    apply_max_width_for_all_div('.checkbox-display')

    let filterDisplay = <section className={tab === "display" ? 'show' : 'hidden'}>
        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                id="displayCgram"
                name="displayCgram"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayCgram}
            />
            <label htmlFor="displayCgram">Catégorie grammaticale</label>
        </div>
        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                id="displayOrthosyll"
                name="displayOrthosyll"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayOrthosyll}
            />
            <label htmlFor="displayOrthosyll">Forme orthographique syllabée</label>
        </div>
        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                id="displayGender"
                name="displayGender"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayGender}
            />
            <label htmlFor="displayGender">Genre</label>
        </div>
        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                id="displayLemme"
                name="displayLemme"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayLemme}
            />
            <label htmlFor="displayLemme">Lemme</label>
            <div className={"tooltip"}>
                <div className={"container-tooltip"}>
                    <img
                        src={"information-icon.svg"} className={"info-button"}
                        alt={"explication contient à la suite"}/>
                    <span
                        className={"tooltip-content right"}>Forme canonique d'un mot, c’est à dire l’infinitif pour un verbe, le masculin singulier pour un nom ou un adjectif</span>
                </div>
            </div>

        </div>
        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                id="displayNumber"
                name="displayNumber"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayNumber}
            />
            <label htmlFor="displayNumber">Nombre</label>
        </div>
        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                id="displayNumberLetter"
                name="displayNumberLetter"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayNumberLetter}
            />
            <label htmlFor="displayNumberLetter">Nombre de lettres</label>
        </div>
        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                id="displayNumberSyl"
                name="displayNumberSyl"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayNumberSyl}
            />
            <label htmlFor="displayNumberSyl">Nombre de syllabes</label>
        </div>
        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                id="displayNbhomoph"
                name="displayNbhomoph"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayNbhomoph}
            />
            <label htmlFor="displayNbhomoph">Nombre d'homophones</label>
        </div>
        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                id="displayPhon"
                name="displayPhon"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayPhon}
            />
            <label htmlFor="displayPhon">Phonologie</label>
        </div>

        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                id="displayPuorth"
                name="displayPuorth"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayPuorth}
            />
            <label htmlFor="displayPuorth">Unicité orthographique</label>
            <div className={"tooltip"}>
                <div className={"container-tooltip"}>
                    <img
                        src={"information-icon.svg"} className={"info-button"}
                        alt={"explication contient à la suite"}/>
                    <span
                        className={"tooltip-content right"}>Correspond au rang de la lettre en partant de la gauche à partir duquel le mot peut être identifié sans ambiguïté.</span>
                </div>
            </div>
        </div>
    </section>
    return filterDisplay;
}

export default FilterDisplay;
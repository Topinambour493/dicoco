import React from "react";
import {handleInputChange} from "../utils/utils";

function FilterDisplay({displays, setDisplays, tab}) {

    let filterDisplay = <main className={tab === "display" ? 'show' : 'hidden'}>
        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                id="displayName"
                name="displayName"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayName}
            />
            <label htmlFor="displayName">Nom</label>
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
                id="displayLemme"
                name="displayLemme"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayLemme}
            />
            <label htmlFor="displayLemme">Lemme</label>
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
            <label htmlFor="displayNumberSyl">Unicité orthographique</label>
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
                id="displayPuorth"
                name="displayPuorth"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayPuorth}
            />
            <label htmlFor="displayPuorth">Nombre de syllabes</label>
        </div>
        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                id="displayOrthrenv"
                name="displayOrthrenv"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayOrthrenv}
            />
            <label htmlFor="displayOrthrenv">Inverse</label>
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
                id="displayPhon"
                name="displayPhon"
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.displayPhon}
            />
            <label htmlFor="displayPhon">Phonétique</label>
        </div>
    </main>
    return filterDisplay;
}

export default FilterDisplay;
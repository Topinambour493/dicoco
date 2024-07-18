import React from "react";
import {handleInputChange} from "../utils/utils";

function AnagramFilter({displays, setDisplays, register, errors}) {

    let anagramFilter = <main className={"direction-column"}>
        <div className={"form-child"}>
            <label>Lettres</label>
            <input autoCapitalize="none" {...register('anagramMinus')} />
            <p className={"message-error"}>{errors.anagramMinus?.message}</p>
        </div>
        <div className={"checkbox-display"}>
            <input
                type="checkbox"
                {...register('accentConsidered')}
                onChange={e => handleInputChange(e, displays, setDisplays)}
                checked={displays.accentConsidered}
                id="accentConsidered"
            />
            <label htmlFor="accentConsidered">Prise en compte des accents</label>
        </div>
    </main>
    return anagramFilter;
}

export default AnagramFilter;
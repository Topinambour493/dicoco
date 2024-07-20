import React from "react";
import {apply_max_width_for_all_div, handleInputChange} from "../utils/utils";

function AlphabeticFilter({displays, setDisplays, register, errors, tab}) {

    apply_max_width_for_all_div(".form-child")


    let alphabeticFilter = <main className={tab === "alphabetic" ? 'show' : 'hidden'}>
        <div className={"form-child"}>
            <label>Commence par </label>
            <input autoCapitalize="none" {...register('startsWith')}/>
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
                    <span
                        className={"tooltip-content right"}>Renvoit les mots contenant à la suite les lettres donnés</span>
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
        <div className={"checkbox-display align-end"}>
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
    return alphabeticFilter;
}

export default AlphabeticFilter;

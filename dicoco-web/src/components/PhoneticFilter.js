import React from "react";
import {apply_max_width_for_all_div} from "../utils/utils";

function PhoneticFilter({register, errors, tab}) {

    apply_max_width_for_all_div('.form-child')

    let phoneticFilter = <section className={tab === "phonetic" ? 'show' : 'hidden'}>
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
                    <span
                        className={"tooltip-content right"}>Renvoit les mots contenant à la suite les lettres donnés</span>
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
                    <span className={"tooltip-content right"}>Renvoit les mots contenant uniquement tout ou en partie les lettres données</span>
                </div>
            </label>
            <input autoCapitalize="none" {...register('anagramPlusPhoetically')} />
            <p className={"message-error"}>{errors.anagramPlusPhoetically?.message}</p>
        </div>
    </section>
    return phoneticFilter;
}

export default PhoneticFilter;

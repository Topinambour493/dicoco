import React from "react";
import {Controller} from "react-hook-form";
import Select from "react-select";

function OtherFilter({control, options}) {

    let otherFilter = <fieldset className={"Divers"}>
        <legend>Autres</legend>
        <div className={"form-child"}>
            <label>Catégorie grammaticale</label>
            <Controller
                control={control}
                name="grammatical_category"
                render={({field: {onChange, onBlur, value}}) => (
                    <Select
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        options={options}
                        isMulti
                        placeholder="Tous"
                    />
                )}
            />
        </div>
    </fieldset>
    return otherFilter;
}

export default OtherFilter;

import {useState} from "react";

function TabsHeader({tab, setTab}) {


    const onOptionChange = e => {
        console.log(e.target.value)
        setTab(e.target.value)
    }


    let tabsHeader = <div className={"tabs"}>
        <input type="radio" value={"alphabetic"} id="tab1"  checked={tab === "alphabetic"} onChange={onOptionChange}  className="tab"/>
        <label htmlFor="tab1">Alphabétique</label>
        <input type="radio" value={"phonetic"} id="tab2" checked={tab === "phonetic"} onChange={onOptionChange} className="tab"/>
        <label htmlFor="tab2">Phonétique</label>
        <input type="radio" value={"display"} id="tab3" checked={tab === "display"} onChange={onOptionChange} className="tab"/>
        <label htmlFor="tab3">Affichage</label>
        <input type="radio" value={"other"} id="tab4" checked={tab === "other"} onChange={onOptionChange} className="tab"/>
        <label htmlFor="tab4">Autres</label>
    </div>
    return tabsHeader
}

export default TabsHeader
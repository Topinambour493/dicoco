import React from "react";

function ExplicationIndex() {

    let explication = <div id={"explication"}>
        <h1>Dicoco est un site permettant la recherche et le filtrage de mots sur le dictionnaire français</h1>
        <a href={"/anagram-master"}><h2>Page spéciale anagramme</h2></a>
        <p>Il permet nottament la recherche d'anagrammes, de mots par rapport à la phonétique ou encore par la fin des mots.</p>
        Pour une utilisation optimale:
        <ul>
            <li>Utilisez ce site sur ordinateur, ou à défaut en mode paysage si vous êtes sur téléphone ou tablette</li>
            <li>Choisissez les champs qui vous seront utiles dans la section Affichage</li>
            <li>Affinez votre recherche afin d'améliorer le temps de réponse</li>
        </ul>

    </div>

    return explication;
}

export default ExplicationIndex;
import React from "react";
import '../scss/build/explicationIndex.css';
function ExplicationIndex() {

    let explication = <div id={"explication"}>
        <h1>Dicoco est un site permettant la recherche et le filtrage de mots sur le dictionnaire français</h1>
        <a href={"/anagram-master"}><h2>Page spéciale anagramme</h2></a>
        <p>Il permet nottament la recherche d'anagrammes, de mots par rapport à la phonologie ou encore par la fin des mots.</p>
        <h3>La phonologie késaco ?</h3>
        <p>
            La phonologie est la branche de la linguistique qui étudie les sons d'une langue et leurs fonctions pour distinguer les mots.
            Elle analyse comment les sons s'organisent en systèmes et influencent le sens des mots.
        </p>
        <img src={"codes-phonologiques.png"}/>
        <h3>phonologie vs phonétique</h3>
        <p>
            La <b>phonétique</b> s'intéresse aux sons eux-mêmes, et la <b>phonologie</b> à leur rôle dans la langue.
        </p>
        <h3>Pour une utilisation optimale de dicoco:</h3>
        <ul>
            <li>Utilisez ce site sur ordinateur, ou à défaut en mode paysage si vous êtes sur téléphone ou tablette</li>
            <li>Choisissez les champs qui vous seront utiles dans la section Affichage</li>
            <li>Affinez votre recherche afin d'améliorer le temps de réponse</li>
        </ul>

    </div>

    return explication;
}

export default ExplicationIndex;
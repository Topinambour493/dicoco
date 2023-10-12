# dicoco
dicoco est une api et un site web permettant de checher des mots a l'aide de multiples filtres

## Installation CSV
Aller sur le site http://www.lexique.org/ et télécharger le Lexique3.83
Ouvrir le fichier Lexique383.xlsb dans excel puis Cliquer sur Fichier -> Enregistrer sous, choisir de l'enregistrer dans le dossier dicocoApi et choisir l'extension CSV

![image](https://github.com/Topinambour493/dicoco/assets/92278752/4f00e3d4-e439-436c-bc1d-2c250c9211cb)

Utiliser le format CSV

![image](https://github.com/Topinambour493/dicoco/assets/92278752/35d07111-1ef3-4451-90e5-7dd01e8895dd)

Mettre les memes parametres qu'indiqués ci dessus puis sauvegarder

## Installation backend

Il faut installer poetry puis depuis la racine du projet:
```
cd dicocoApi
poetry install
poetry run main.py
```

## Installation frontend
Il faut installer nodeJS puis depuis la racine du projet:
```
cd dicoco-web
npm install
npm run start
```



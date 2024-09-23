# Pourquoi v2 ?
Cette version alternative de dicocoApi aura les mêmes fonctionnalités mais 
sera plus rapide car les données seront dégrossis par des requetes SQL.

## SQL et csv ?
Oui, nous effectuons une migration des données du format CSV vers 
une base de données SQL avec des tables modifiés dans la recherche de l'optimisation


## Installation backend

Il faut installer poetry puis depuis la racine du projet:
```
cd dicocoApiV2
poetry install
poetry run set FLASK_APP=run.py
poetry run flask db init
poetry run flask db migrate -m "first migration"
poetry run flask db upgrade
poetry run flask fill_db
poetry run flask --debug run
```
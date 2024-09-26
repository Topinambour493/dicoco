import numpy as np

from . import db
import pandas as pd
from flask import current_app

from .models import Word
from .utils import sort_alphabetical_order, insert_percent_before_and_after_letters

app = current_app

@app.cli.command("fill_db")
def fill_db():
    """fills the db with lexicon data"""

    lex = pd.read_csv('http://www.lexique.org/databases/Lexique382/Lexique382.tsv', sep='\t')
    lex.dropna(subset=['ortho'], inplace=True)

    for _, w in lex.iterrows():
        word = Word(
            spelling=w["ortho"],
            phonology=w["phon"],
            lemma=w["lemme"],
            is_lemma=int(w["islem"]),
            grammatical_category=None if pd.isna(w["cgram"]) else w["cgram"],
            gender=None if pd.isna(w["genre"]) else w["genre"],
            number=None if pd.isna(w["nombre"]) else w["nombre"],
            number_of_homophones=int(w["nbhomoph"]),
            number_of_homographs=int(w["nbhomogr"]),
            number_of_letters=int(w["nblettres"]),
            number_of_phonemes=int(w["nbphons"]),
            number_of_syllables=int(w['nbsyll']),
            orthographic_uniqueness_point=int(w["puorth"]),
            syllabic_orthographic_form=None if pd.isna(w["orthosyll"]) else w['orthosyll'],
            spelling_in_alphabetical_order=sort_alphabetical_order(w["ortho"]),
            phonology_in_alphabetical_order=sort_alphabetical_order(w["phon"])
        )
        db.session.add(word)
    db.session.commit()

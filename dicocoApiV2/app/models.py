from dataclasses import dataclass

from . import db


@dataclass
class Word(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    spelling: str = db.Column(db.String(25, collation='utf8mb4_bin'), nullable=False)
    phonology: str = db.Column(db.String(25, collation='utf8mb4_bin'), nullable=False)
    lemma: str = db.Column(db.String(25, collation='utf8mb4_bin'), nullable=False)
    is_lemma: int = db.Column(db.Integer, nullable=False)
    grammatical_category: str = db.Column(db.String(25, collation='utf8mb4_bin'), nullable=True)
    gender: str = db.Column(db.String(10, collation='utf8mb4_bin'), nullable=True)
    number: str = db.Column(db.String(10, collation='utf8mb4_bin'), nullable=True)
    number_of_homophones: int = db.Column(db.Integer, nullable=False)
    number_of_homographs: int = db.Column(db.Integer, nullable=False)
    number_of_letters: int = db.Column(db.Integer, nullable=False)
    number_of_phonemes: int = db.Column(db.Integer, nullable=False)
    number_of_syllables: int = db.Column(db.Integer, nullable=False)
    orthographic_uniqueness_point: int = db.Column(db.Integer, nullable=False)
    syllabic_orthographic_form: str = db.Column(db.String(35, collation='utf8mb4_bin'), nullable=True)
    spelling_in_alphabetical_order: str = db.Column(db.String(25, collation='utf8mb4_bin'), nullable=False)
    phonology_in_alphabetical_order: str = db.Column(db.String(35, collation='utf8mb4_bin'), nullable=False)

    def as_dict(self):
        return {
            c.name: str(getattr(self, c.name)) for c in self.__table__.columns
        }

    def __repr__(self):
        return f'<Word {self.spelling}>'

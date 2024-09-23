from flask import jsonify, current_app
from sqlalchemy import select, or_, and_, func, collate
from unidecode import unidecode

from .models import Word
from .utils import sort_alphabetical_order, insert_percent_between_letters, insert_percent_before_and_after_letters, \
    anagram_minus

app = current_app


@app.teardown_appcontext
def shutdown_session(exception=None):
    ''' Enable Flask to automatically remove database sessions at the
    end of the request or when the application shuts down.
    Ref: https://flask.palletsprojects.com/en/2.3.x/patterns/sqlalchemy/
    '''
    app.session.remove()


@app.route('/')
def index():
    return jsonify({"message": "Bienvenue à AlphaIndex API!"})


@app.route('/1')
def test1():
    """compare avec un mot complet"""
    stmt = select(Word).where(Word.spelling == "concombre")
    result = app.session.execute(stmt).scalars().all()
    return jsonify({"data": result})

@app.route('/2')
def test2():
    """commence et finit par"""
    stmt = select(Word).where(and_(Word.spelling.startswith('capri'), Word.spelling.endswith('')))
    result = app.session.execute(stmt).scalars().all()
    return jsonify({"data": result})


@app.route('/3')
def test3():
    """contient à la suite"""
    stmt = select(Word).where(Word.spelling.like(insert_percent_before_and_after_letters("coco")))
    result = app.session.execute(stmt).scalars().all()
    return jsonify({"data": result})


@app.route('/4')
def test4():
    """contient pas forcéménet à la suite"""
    stmt = select(Word).where(
        Word.spelling.like(insert_percent_before_and_after_letters(insert_percent_between_letters("coco")))
    )
    result = app.session.execute(stmt).scalars().all()
    return jsonify({"data": result})


@app.route('/5')
def test5():
    """anagramme"""
    stmt = select(Word).where(Word.spelling_in_alphabetical_order.like(sort_alphabetical_order("e")))
    result = app.session.execute(stmt).scalars().all()
    return jsonify({"data": result})


@app.route('/6')
def test6():
    """anagramme plus"""
    stmt = select(Word).where(Word.spelling_in_alphabetical_order.like(
        insert_percent_before_and_after_letters(insert_percent_between_letters(sort_alphabetical_order("requin"))))
    )
    result = app.session.execute(stmt).scalars().all()
    return jsonify({"data": result})


@app.route('/7')
def test7():
    """anagramme moins"""
    # Exemple de motif à rechercher
    pattern = "ai"

    # Requête pour récupérer tous les mots
    stmt = select(Word)
    result = app.session.execute(stmt).scalars().all()

    # Filtrer les mots
    filtered_words = [word for word in result if anagram_minus(word.spelling_in_alphabetical_order, pattern)]

    return jsonify({"data": filtered_words})


@app.route('/8')
def test8():
    """catégorie grammaticale"""
    array = [""]
    if array == [""]:
        stmt = select(Word)
    else:
        stmt = select(Word).where(Word.grammatical_category.in_(array))
    result = app.session.execute(stmt).scalars().all()
    return jsonify({"data": result})

@app.route('/9')
def test9():
    """anagramme sans la prise en compte des accents"""
    stmt = (select(Word).where(
        collate(Word.spelling_in_alphabetical_order, collation='utf8mb4_unicode_ci')
        .like(sort_alphabetical_order("e"))))
    result = app.session.execute(stmt).scalars().all()
    return jsonify({"data": result})

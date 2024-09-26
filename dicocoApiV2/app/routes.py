import json

from flask import jsonify, request, current_app
from sqlalchemy import select, and_, collate
from unidecode import unidecode

from .models import Word
from .utils import sort_alphabetical_order, insert_percent_between_letters, insert_percent_before_and_after_letters

app = current_app


@app.teardown_appcontext
def shutdown_session(exception=None):
    ''' Enable Flask to automatically remove database sessions at the
    end of the request or when the application shuts down.
    Ref: https://flask.palletsprojects.com/en/2.3.x/patterns/sqlalchemy/
    '''
    app.session.remove()


@app.route('/', methods=['GET'])
def index():
    args = request.args
    accent_considered = json.loads(args.get("accentConsidered", "true"))
    print(accent_considered)
    """return filtered words"""
    stmt = select(Word).where(and_(
        start(args.get("startsWith", ""), accent_considered),
        end(args.get("endsWith", ""), accent_considered),
        include_sequence(args.get("containsFollowing", ""), accent_considered),
        include(args.get("contains", ""), accent_considered),
        anagram(args.get("anagram", ""), accent_considered),
        anagram_plus(args.get("anagramPlus", ""), accent_considered),
        start_phonology(args.get("startsWithPhonology", "")),
        end_phonology(args.get("endsWithPhonology", "")),
        include_phonology(args.get("containsPhonology", "")),
        include_sequence_phonology(args.get("containsFollowingPhonology", "")),
        anagram_phonology(args.get("anagramPhonology", "")),
        anagram_plus_phonology(args.get("anagramPlusPhonology", "")),
        grammatical_category(args.get("grammatical", "[]")),
        number_of_syllables(args.get("minimumNumberSyllables", 0), args.get("maximumNumberSyllables", 10)),
        number_of_letters(args.get("minimumNumberLetters", 0), args.get("maximumNumberLetters", 25))
    ))
    result = app.session.execute(stmt).scalars().all()
    if args.get("anagramMinus"):
        result = [word for word in result if
                  anagram_minus(word.spelling_in_alphabetical_order, args.get("anagramMinus", ""), accent_considered)]
    if args.get("anagramMinusPhonology"):
        result = [word for word in result if
                  anagram_minus_phonology(word.phonology_in_alphabetical_order, args.get("anagramMinusPhonology", ""))]
    result_dict = [word.as_dict() for word in result]
    return jsonify({"dict": json.dumps(result_dict)})


def start(string: str, accent_considered: bool):
    if string == "":
        return True
    string = string.lower()
    if accent_considered:
        return Word.spelling.startswith(string)
    return collate(Word.spelling, collation='utf8mb4_unicode_ci').startswith(string)


def end(string: str, accent_considered: bool):
    if string == "":
        return True
    string = string.lower()
    if accent_considered:
        return Word.spelling.endswith(string)
    return collate(Word.spelling, collation='utf8mb4_unicode_ci').endswith(string)


def include_sequence(string: str, accent_considered: bool):
    if string == "":
        return True
    string = string.lower()
    if accent_considered:
        return Word.spelling.like(insert_percent_before_and_after_letters(string))
    return collate(Word.spelling, collation='utf8mb4_unicode_ci').like(insert_percent_before_and_after_letters(string))


def include(string: str, accent_considered: bool):
    if string == "":
        return True
    string = string.lower()
    if accent_considered:
        return Word.spelling.like(
            insert_percent_before_and_after_letters(
                insert_percent_between_letters(string)
            )
        )
    return collate(Word.spelling, collation='utf8mb4_unicode_ci').like(
        insert_percent_before_and_after_letters(
            insert_percent_between_letters(string)
        )
    )


def anagram(string: str, accent_considered: bool):
    if string == "":
        return True
    string = string.lower()
    if accent_considered:
        return Word.spelling_in_alphabetical_order.like(sort_alphabetical_order(string))
    return collate(Word.spelling, collation='utf8mb4_unicode_ci').like(sort_alphabetical_order(string))


def anagram_plus(string: str, accent_considered: bool):
    if string == "":
        return True
    string = string.lower()
    if accent_considered:
        return Word.spelling_in_alphabetical_order.like(
            insert_percent_before_and_after_letters(
                insert_percent_between_letters(
                    sort_alphabetical_order(string)
                )
            )
        )
    return collate(Word.spelling, collation='utf8mb4_unicode_ci').like(
        insert_percent_before_and_after_letters(
            insert_percent_between_letters(
                sort_alphabetical_order(string)
            )
        )
    )


def anagram_minus(word: str, string: str, accent_considered: bool):
    if string == "":
        return True
    if accent_considered:
        pattern = list(string)
    else:
        word = list(unidecode(word))
        pattern = list(unidecode(string))
    if len(word) > len(pattern):
        return False
    for letter in word:
        if letter in pattern:
            pattern.remove(letter)
        else:
            return False
    return True


def start_phonology(string: str):
    if string == "":
        return True
    return Word.phonology.startswith(string)


def end_phonology(string: str):
    if string == "":
        return True
    return Word.phonology.endswith(string)


def include_sequence_phonology(string: str):
    if string == "":
        return True
    return Word.phonology.like(insert_percent_before_and_after_letters(string))


def include_phonology(string: str):
    if string == "":
        return True
    return Word.phonology.like(
        insert_percent_before_and_after_letters(
            insert_percent_between_letters(string)
        )
    )


def anagram_phonology(string: str):
    if string == "":
        return True
    return Word.phonology_in_alphabetical_order.like(sort_alphabetical_order(string))


def anagram_plus_phonology(string: str):
    if string == "":
        return True
    return Word.phonology_in_alphabetical_order.like(
        insert_percent_before_and_after_letters(
            insert_percent_between_letters(
                sort_alphabetical_order(string)
            )
        )
    )


def grammatical_category(array_stringify: str):
    if array_stringify == "[]":
        return True
    array = json.loads(array_stringify)
    return Word.grammatical_category.in_(array)


def number_of_syllables(minimum: str, maximum: str):
    return and_(int(minimum) <= Word.number_of_syllables, Word.number_of_syllables <= int(maximum))


def number_of_letters(minimum: str, maximum: str):
    return and_(int(minimum) <= Word.number_of_letters, Word.number_of_letters <= int(maximum))


def anagram_minus_phonology(word: str, string: str):
    if string == "":
        return True
    pattern = list(string)
    word = list(word)
    if len(word) > len(pattern):
        return False
    for letter in word:
        if letter in pattern:
            pattern.remove(letter)
        else:
            return False
    return True

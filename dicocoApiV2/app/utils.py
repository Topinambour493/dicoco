def sort_alphabetical_order(word):
    return ''.join(sorted(word))


def insert_percent_between_letters(word):
    return '%'.join(word)


def insert_percent_before_and_after_letters(word):
    return '%' + word + '%'


def anagram_minus(word, pattern):
    if pattern == "":
        return True
    pattern = list(pattern)
    if len(word) > len(pattern):
        return False
    for letter in word:
        if letter in pattern:
            pattern.remove(letter)
        else:
            return False
    return True

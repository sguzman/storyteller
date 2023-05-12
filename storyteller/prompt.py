from nltk.tokenize import word_tokenize
from storyteller.epub import get_full_text
import marisa_trie
import contractions


def read_dict():
    with open("assets/dict/en.txt") as f:
        contents = f.read()
    return [word.lower() for word in contents.split("\n")]


def find_invented_words(book_name: str):
    full_text = get_full_text(book_name)
    all_words = [
        word.lower()
        for word in word_tokenize(contractions.fix(full_text))
        if word.isalpha()
    ]

    dict_word_list = read_dict()
    trie = marisa_trie.Trie(dict_word_list)

    invented_words = [word for word in all_words if word not in trie]
    return list(set(invented_words))


def generate_initial_prompt(book_name: str):
    invented_words = find_invented_words(book_name)
    invented_word_str = ', '.join(invented_words[0:-1]) + ", and " + invented_words[-1]
    initial_prompt = f"The following is a fictional story, containing invented words such as {invented_word_str}"
    return initial_prompt

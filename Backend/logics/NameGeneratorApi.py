from keras.models import load_model
from nltk.corpus import wordnet
import nltk
import numpy as np


nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('averaged_perceptron_tagger')


prefix = ""
max_names = 10
chars_len = 27
maxlen = 31
char_indices = {
    '\n': 0,
    'a': 1,
    'b': 2,
    'c': 3,
    'd': 4,
    'e': 5,
    'f': 6,
    'g': 7,
    'h': 8,
    'i': 9,
    'j': 10,
    'k': 11,
    'l': 12,
    'm': 13,
    'n': 14,
    'o': 15,
    'p': 16,
    'q': 17,
    'r': 18,
    's': 19,
    't': 20,
    'u': 21,
    'v': 22,
    'w': 23,
    'x': 24,
    'y': 25,
    'z': 26}
indices_char = {
    0: '\n',
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
    8: 'h',
    9: 'i',
    10: 'j',
    11: 'k',
    12: 'l',
    13: 'm',
    14: 'n',
    15: 'o',
    16: 'p',
    17: 'q',
    18: 'r',
    19: 's',
    20: 't',
    21: 'u',
    22: 'v',
    23: 'w',
    24: 'x',
    25: 'y',
    26: 'z'}


model = load_model('brand_name_recommendation.h5')


def sample(preds):
    preds = np.asarray(preds).astype('float64')
    preds = preds / np.sum(preds)
    probas = np.random.multinomial(1, preds, 1)
    return np.random.choice(range(chars_len), p=probas.ravel())


def generate_new_names(prefix):
    sequence = ('{0:0>' + str(maxlen) + '}').format(prefix).lower()
    tmp_generated = prefix
    list_outputs = list()

    while (len(list_outputs) < max_names):
        x_pred = np.zeros((1, maxlen, chars_len))
        for t, char in enumerate(sequence):
            if char != '0':
                x_pred[0, t, char_indices[char]] = 1
        preds = model.predict(x_pred, verbose=0)[0]
        next_index = sample(preds)
        next_char = indices_char[next_index]
        if next_char == '\n' or len(tmp_generated) > maxlen:
            if tmp_generated not in list_outputs:
                list_outputs.append(tmp_generated)
            sequence = ('{0:0>' + str(maxlen) + '}').format(prefix).lower()
            tmp_generated = prefix
        else:
            tmp_generated += next_char
            sequence = (
                '{0:0>' + str(maxlen) + '}').format(tmp_generated).lower()
    return list_outputs

def predict(word: str):
    results = []
    syn = wordnet.synsets(word)
    synonyms = [word, ]
    count = 0
    for s in syn:
        for lm in s.lemmas():
            if word not in lm.name():
                synonyms.append(lm.name())
            elif count <= 2 and lm.name() != word:
                synonyms.append(lm.name())
                count += 1
    try:
        length = len(synonyms)
        if length > 4:
            length = 4
        for i in synonyms[:4]:
            if len(i) < 18 and '_' not in i and '-' not in i:
                prefix = i
                res = generate_new_names(prefix)
                results += res
        return results
    except BaseException:
        return {"message": "Something went wrong."}

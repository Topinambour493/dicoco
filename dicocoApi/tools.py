import csv
import json
from unidecode import unidecode

dico=list(csv.reader(open("Dico.csv")))
index_dico={'a': [1,12194], 'à': [1,12194], 'â': [1,12194], 'b': [12194,19327], 'c': [19327,35020], 'ç': [19327,35020], 'd': [35020,46955], 'e': [46955,59656], 'é': [46955,59656], 'è': [46955,59656], 'ê': [46955,59656], 'f': [59656,65543], 'g': [65543,70136], 'h': [70136,72770], 'i': [72770,78914], 'î': [72770,78914], 'j': [78914,80086], 'k': [80086,80419], 'l': [80419,83715], 'm': [83715,91425], 'n': [91425,93588], 'o': [93588,96169], 'ô': [93588,96169], 'p': [96169,108785], 'q': [108785,109367], 'r': [109367,122191], 's': [122191,131643], 't': [131643,138402], 'u': [138402,138891], 'ù': [138402,138891], 'v': [138891,142215], 'w': [142215,142315], 'x': [142315,142338], 'y': [142338,142430], 'z': [142430,142688]}
#['1_ortho', '2_phon', '3_lemme', '4_cgram', '5_genre', '6_nombre', '7_freqlemfilms2', '8_freqlemlivres', '9_freqfilms2', 
# '10_freqlivres', '11_infover', '12_nbhomogr', '13_nbhomoph', '14_islem', '15_nblettres', '16_nbphons', '17_cvcv', '18_p_cvcv', '19_voisorth', 
# '20_voisphon', '21_puorth', '22_puphon', '23_syll', '24_nbsyll', '25_cv-cv', '26_orthrenv', '27_phonrenv', '28_orthosyll', '29_cgramortho', 
# '30_deflem', '31_defobs', '32_old20', '33_pld20', '34_morphoder', '35_nbmorph']

#['NOM', 'AUX', 'VER', 'ADV', 'PRE', 'ADJ', 'ONO', 'CON', 'ART:def', 'ADJ:ind', 'PRO:ind', 'PRO:int',
#  'PRO:rel', 'ADJ:num', 'PRO:dem', 'ADJ:dem', 'PRO:per', 'ART:ind', 'LIA', 'PRO:pos', 'ADJ:pos', '', 'ADJ:int']


#{'NOM': ['a', 'a priori', 'aa', 'abaca', 'abaisse'], 'AUX': ['a', 'ai', 'aie', 'aient', 'aies'], 
# 'VER': ['a', 'abaissa', 'abaissai', 'abaissaient', 'abaissait'], 'ADV': ['a capella', 'a cappella', 'a contrario', 'a fortiori', 'a giorno'], 
# 'PRE': ["a l'instar", 'afin d', 'afin de', 'après', 'au-dessus'], 'ADJ': ['abaissant', 'abaissante', 'abaissé', 'abaissée', 'abaissées'], 
# 'ONO': ['acré', 'adieu', 'ah', 'alerte', 'allo'], 'CON': ['afin qu', 'afin que', 'ains', 'because', 'car'], 
# 'ART:def': ['au', 'aux', 'de', 'du', 'l'], 'ADJ:ind': ['aucun', 'aucune', 'aucunes', 'aucuns', 'certain'], 
# 'PRO:ind': ['aucun', 'aucune', 'autre', 'autrefois', 'autres'], 'PRO:int': ['auquel', 'auxquelles', 'auxquels', 'desquelles', 'desquels'], 
# 'PRO:rel': ['auquel', 'auxquelles', 'auxquels', 'desquelles', 'desquels'], 'ADJ:num': ['autres', 'c', 'cent', 'centaines', 'centenaires'], 
# 'PRO:dem': ['c', 'ce', 'ceci', 'cela', 'celle'], 'ADJ:dem': ['ce', 'ces', 'cet', 'cette'], 
# 'PRO:per': ['con', 'elle', 'elle-même', 'elles', 'elles-mêmes'], 'ART:ind': ['des', 'pa', 'un', 'une'], 
# 'LIA': ["l'"], 'PRO:pos': ['leur', 'leurs', 'mes', 'mien', 'mienne'], 'ADJ:pos': ['leurs', 'ma', 'mes', 'mien', 'mienne'], 
# '': ['o', 'team', 'à brûle-pourpoint', 'à cloche-pied', 'à rebrousse-poil'], 'ADJ:int': ['quel', 'quelle', 'quelles', 'quels']}

def nb_syllables(minimum,maximum,line):
    """renvoie un tab contenant les line de tout les worlds ayant le nombre de syllables demandés
    parmi ceux dans le tab en entrée
    min et max représente la fourchette de syllables voulues, nb_syllables([3,5]) renverra les worlds contenant entre 3 et 5 syllables
    Le tab en entrée doit être constitués de line du dico """
    minimum=int(minimum)
    maximum=int(maximum)
    if minimum>maximum:
        raise ValueError("le nombre min ne peut pas être plus grand que le nombre max")
    nb_syllables=int(line[23])
    return minimum<=nb_syllables<=maximum


def start(str,  accent_considered, line):
    """renvoie tous les worlds qui startnt par la/les letters demandés par l'utilisateur"""
    if(str ==""):
        return True
    if accent_considered == True:
        world=line[0]
    else:
        world = unidecode(line[0])
        str = unidecode(str)
    if len(world)>=len(str):
        if str==world[:len(str)]:
            return True
    return False

def end(str, accent_considered, line):
    """revoie tous les worlds qui finnisent par la/les letters demandés par l'utilisateur"""
    if(str ==""):
        return True
    if accent_considered:
        world=line[0]
    else:
        world = unidecode(line[0])
        str = unidecode(str)
    if len(world)>=len(str):
        if str==world[-len(str):]:
            return True
    return False

def include_sequence(str, accent_considered, line):
    """cette fonction renvoie tous les worlds qui contiennes la suite de letters dans l'ordre et a la suite."""
    if str== "":
        return True
    if accent_considered:
        world=line[0]
    else:
        world = unidecode(line[0])
        str = unidecode(str)
    if len(world)<len(str):
        return False
    for i in range (len(world)-len(str)+1):
        if str==world[i:i+len(str)]:
            return True
    return False

def include(str, accent_considered, line):
    """renvoie tous les worlds qui contiennent dans l'ordre mais pas forcément à la suite la/les letters demandés par l'utilisateur"""
    if str== "":
        return True
    if accent_considered:
        world=line[0]
    else:
        world = unidecode(line[0])
        str = unidecode(str)
    if len(world)<len(str):
        return False
    for i in range (len(str)):
        if str[i] in world:
            world= world[world.index(str[i])+1:]
        else:
            return False
    return True




def anagram(str, accent_considered, line):
    """renvoie tous les worlds qui contiennent intégralement toutes les letters demandés en se souciant de la position des letters dans le world"""
    if str== "":
        return True
    if accent_considered :
        world = list(line[0])
    else:
        world = list(unidecode(line[0]))
        str = unidecode(str)
    if len(world)!=len(str):
        return False
    for letter in str:
        if letter in world:
            world.remove(letter)
        else:
            return False

    return True

def anagram_plus(str, accent_considered, line):
    """renvoie tous les mots qui contiennent toutes les lettres demandés en se souciant de la position des lettres dans le mot, on peut définir un nombre de lettres suplémentaires autorisés en cheangeant l'argument sup"""
    if str== "":
        return True
    if accent_considered:
        world=list(line[0])
    else:
        world = list(unidecode(line[0]))
        str = unidecode(str)
    if len(world)<len(str):
        return False
    for letter in str:
        if letter in world:
            world.remove(letter)
        else:
            return False
    return True

def anagram_minus(str, accent_considered, line):
    """renvoie tous les mots qui contiennent toutes les lettres demandés en se souciant de la position des lettres dans le mot"""
    if str == "":
        return True
    if accent_considered:
        world = list(line[0])
        str = list(str)
    else:
        world = list(unidecode(line[0]))
        str = list(unidecode(str))
    if len(world)>len(str):
        return False
    for letter in world:
        if letter in str:
            str.remove(letter)
        else:
            return False
    return True

def start_phon(str, line):
    """renvoie tous les mots qui commencent par le/les sons demandés par l'utilisateur"""
    if(str ==""):
        return True
    world=line[1]
    if len(world)>=len(str):
        if str==world[:len(str)]:
            return True
    return False


def end_phon(str,line):
    """renvoie tous les mots qui finissent par le/les sons demandés par l'utilisateur"""
    if(str ==""):
        return True
    world=line[1]
    if len(world)>=len(str):
        if str==world[-len(str):]:
            return True
    return False

def nb_letters(min,max,line):
    """renvoie un tab contenant les line de tout les worlds ayant le nombre de syllables demandés
    parmi ceux dans le tab en entrée
    min et max représente la fourchette de syllables voulues, nb_syllables([3,5]) renverra les worlds contenant entre 3 et 5 syllables
    Le tab en entrée doit être constitués de line du dico """
    min = int(min)
    max = int(max)
    if max<min:
        raise ValueError("le nombre min ne peut pas être plus grand que le nombre max")
    nb_syllables=int(line[14])
    return min<=nb_syllables<=max

def include_phon(str,line):
    """renvoie tous les worlds qui contiennent dans l'ordre mais pas forcément à la suite la/les letters demandés par l'utilisateur"""
    if str== "":
        return True
    world=line[1]
    if len(world)<len(str):
        return False
    for i in range (len(str)):
        if str[i] in world:
            world= world[world.index(str[i])+1:]
        else:
            return False
    return True


def include_sequence_phon(str,line):
    """cette fonction renvoie tous les worlds qui contiennes la suite de letters dans l'ordre et a la suite."""
    if str== "":
        return True
    world=line[1]
    if len(world)<len(str):
        return False
    for i in range (len(world)-len(str)+1):
            if str==world[i:i+len(str)]:
                return True
    return False

def anagram_phon(str,line):
    """renvoie tous les worlds qui contiennent intégralement toutes les letters demandés en se souciant de la position des letters dans le world"""
    if str== "":
        return True
    world = list(line[1])
    if len(world)!=len(str):
        return False
    for letter in str:
        if letter in world:
            world.remove(letter)
        else:
            return False
    return True

def anagram_plus_phon(str, line):
    """renvoie tous les mots qui contiennent toutes les lettres demandés en se souciant de la position des lettres dans le mot, on peut définir un nombre de lettres suplémentaires autorisés en cheangeant l'argument sup"""
    if str== "":
        return True
    world = list(line[1])
    if len(world)<len(str):
        return False
    for letter in str:
        if letter in world:
            world.remove(letter)
        else:
            return False
    return True

def anagram_minus_phon(str,line):
    """renvoie tous les mots qui contiennent toutes les lettres demandés en se souciant de la position des lettres dans le mot, on peut définir un nombre de lettres suplémentaires autorisés en cheangeant l'argument sup"""
    if str == "":
        return True
    str = list(str)
    world = list(line[1])
    if len(world)>len(str):
        return False
    for letter in world:
        if letter in str:
            str.remove(letter)
        else:
            return False
    return True

def grammatical_category(arrayStringify, line):
    """renvoie tous les mots appartenant à la/les catégories demandés"""
    array = json.loads(arrayStringify)
    if array == []:
        return True
    return line[3] in array



def transform_in_json(tab=dico[1:]):
    list_index = ['ortho', 'phon', 'lemme', 'cgram', 'genre', 'nombre', 'freqlemfilms2', 'freqlemlivres', 'freqfilms2', 'freqlivres', 'infover', 'nbhomogr', 'nbhomoph', 'islem', 'nbletters', 'nbphons', 'cvcv', 'p_cvcv', 'voisorth', 'voisphon', 'puorth', 'puphon', 'syll', 'nbsyll', 'cv-cv', 'orthrenv', 'phonrenv', 'orthosyll', 'cgramortho', 'deflem', 'defobs', 'old20', 'pld20', 'morphoder', 'nbmorph']
    tab_dico =  []
    for i in range (len(tab)):
        dict = {}
        for j in range (len(list_index)):
            dict[list_index[j]] = tab[i][j]
        tab_dico.append(dict)
    return  json.dumps(tab_dico)


def filter_head_dico(args):
    accent_considered = json.loads(args.get("accentConsidered"))
    dico_filter_head=[]
    for line in dico[1:] :
        if start(args.get("startsWith",""), accent_considered, line) \
            and end(args.get("endedWith",""), accent_considered, line) \
            and include_sequence(args.get("containsFollowing",""), accent_considered, line) \
            and include(args.get("contains",""), accent_considered, line) \
            and anagram(args.get("anagram",""), accent_considered, line) \
            and anagram_minus(args.get("anagramMinus",""), accent_considered, line) \
            and anagram_plus(args.get("anagramPlus",""), accent_considered, line) \
            and start_phon(args.get("startsWithPhoetically",""), line) \
            and end_phon(args.get("endedWithPhoetically",""), line) \
            and nb_syllables(args.get("minimumNumberSyllables",0),args.get("maximumNumberSyllables", 10), line) \
            and nb_letters(args.get("minimumNumberLetters",0),args.get("maximumNumberLetters", 25), line) \
            and include_phon(args.get("containsPhoetically",""), line) \
            and include_sequence_phon(args.get("containsFollowingPhoetically",""), line) \
            and anagram_phon(args.get("anagramPhoetically",""), line) \
            and anagram_minus_phon(args.get("anagramMinusPhoetically",""), line) \
            and anagram_plus_phon(args.get("anagramPlusPhoetically",""), line) \
            and grammatical_category(args.get("grammatical","[]"), line) :
                dico_filter_head.append(line)
    return transform_in_json(dico_filter_head)

def anagrammer(args):
    dico_filter_head = []
    if args.accent:
        for line in dico[1:]:
            if annagram_minus(args.get("letters"), line):
                dico_filter_head.append(line)
    else:
        for line in dico[1:]:
            if anagram_minus_without_accent(args.get("letters"), line):
                dico_filter_head.append(line)
    return transform_in_json(dico_filter_head)
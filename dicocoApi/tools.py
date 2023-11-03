import csv
import json

dico=list(csv.reader(open("Dico.csv")))
index_dico={'a': [1,12194], 'à': [1,12194], 'â': [1,12194], 'b': [12194,19327], 'c': [19327,35020], 'ç': [19327,35020], 'd': [35020,46955], 'e': [46955,59656], 'é': [46955,59656], 'è': [46955,59656], 'ê': [46955,59656], 'f': [59656,65543], 'g': [65543,70136], 'h': [70136,72770], 'i': [72770,78914], 'î': [72770,78914], 'j': [78914,80086], 'k': [80086,80419], 'l': [80419,83715], 'm': [83715,91425], 'n': [91425,93588], 'o': [93588,96169], 'ô': [93588,96169], 'p': [96169,108785], 'q': [108785,109367], 'r': [109367,122191], 's': [122191,131643], 't': [131643,138402], 'u': [138402,138891], 'ù': [138402,138891], 'v': [138891,142215], 'w': [142215,142315], 'x': [142315,142338], 'y': [142338,142430], 'z': [142430,142688]}
#['1_ortho', '2_phon', '3_lemme', '4_cgram', '5_genre', '6_nombre', '7_freqlemfilms2', '8_freqlemlivres', '9_freqfilms2', 
# '10_freqlivres', '11_infover', '12_nbhomogr', '13_nbhomoph', '14_islem', '15_nblettres', '16_nbphons', '17_cvcv', '18_p_cvcv', '19_voisorth', 
# '20_voisphon', '21_puorth', '22_puphon', '23_syll', '24_nbsyll', '25_cv-cv', '26_orthrenv', '27_phonrenv', '28_orthosyll', '29_cgramortho', 
# '30_deflem', '31_defobs', '32_old20', '33_pld20', '34_morphoder', '35_nbmorph']

def nb_syllables(min,max,line):
    """renvoie un tab contenant les line de tout les worlds ayant le nombre de syllables demandés
    parmi ceux dans le tab en entrée
    min et max représente la fourchette de syllables voulues, nb_syllables([3,5]) renverra les worlds contenant entre 3 et 5 syllables
    Le tab en entrée doit être constitués de line du dico """
    
    if max<min:
        raise ValueError("le nombre min ne peut pas être plus grand que le nombre max")
    nb_syllables=int(line[23])
    return min<=nb_syllables<=max


def start(str,line):
    """renvoie tous les worlds qui startnt par la/les letters demandés par l'utilisateur"""
    if(str ==""):
        return True
    res=False
    world=line[0]
    if len(world)>=len(str):
        if str==world[:len(str)]:
            res = True
    return res

def end(str,line):
    """revoie tous les worlds qui finnisent par la/les letters demandés par l'utilisateur"""
    if(str ==""):
        return True
    res = False
    world=line[0]
    if len(world)>=len(str):
        if str==world[-len(str):]:
            res = True    
    return res

def include_sequence(str,line):
    """cette fonction renvoie tous les worlds qui contiennes la suite de letters dans l'ordre et a la suite."""
    if str== "":
        return True
    res = False
    world=line[0]
    if len(world)>=len(str):
        for i in range (len(world)-len(str)+1):
                if str==world[i:i+len(str)]:  
                    res = True
    return res

def include(str,line):
    """renvoie tous les worlds qui contiennent dans l'ordre mais pas forcément à la suite la/les letters demandés par l'utilisateur"""
    if str== "":
        return True
    res= False
    world=line[0]
    if len(world)>=len(str):
        i=0
        this_world="valid"
        while len(str)>i and this_world=="valid":
            if str[i] in world:
                i += 1
            else:
                this_world="unvalid"
                res = False
                break
            if this_world=="valid":
                res = True
    return res

def anagram(str,line):
    """renvoie tous les worlds qui contiennent intégralement toutes les letters demandés en se souciant de la position des letters dans le world"""
    world = line[0]
    if str== "":
        return True
    res = False
    if len(world)==len(str):
        res = True
        for i in str:
                if i in world:
                    continue
                else:
                    res = False
                    break
    return res

def start_phon(str,line):
    """revoie tous les worlds qui startnt par le/les sons demandés par l'utilisateur"""
    if str== "":
        return True
    res = False
    phon=line[1]
    if len(phon)>=len(str):
        if str==phon[:len(str)]:
                res = True
    return res


def end_phon(str,line):
    """revoie tous les worlds qui finissent par le/les sons demandés par l'utilisateur"""
    if str== "":
        return True
    res = False
    phon=line[1]
    if len(phon)>=len(str):
        if str==phon[-len(str):]:
                res = True
    return res

def nb_letters(min,max,line):
    """renvoie un tab contenant les line de tout les worlds ayant le nombre de syllables demandés
    parmi ceux dans le tab en entrée
    min et max représente la fourchette de syllables voulues, nb_syllables([3,5]) renverra les worlds contenant entre 3 et 5 syllables
    Le tab en entrée doit être constitués de line du dico """
    
    if max<min:
        raise ValueError("le nombre min ne peut pas être plus grand que le nombre max")
    nb_syllables=int(line[14])
    return min<=nb_syllables<=max

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
    dico_filter_head=[]
    for line in dico[1:] :
        if start(args.get("startsWith",""),line) \
            and end(args.get("endedWith",""), line) \
            and include_sequence(args.get("containsFollowing",""),line) \
            and include(args.get("contains",""),line) \
            and anagram(args.get("anagram",""),line) \
            and start_phon(args.get("startsWithPhoetically",""),line) \
            and end_phon(args.get("endedWithPhoetically",""),line) :
                dico_filter_head.append(line)
    return transform_in_json(dico_filter_head)

import csv
import json

dico=list(csv.reader(open("Dico.csv")))
index_dico={'a': [1,12194], 'à': [1,12194], 'â': [1,12194], 'b': [12194,19327], 'c': [19327,35020], 'ç': [19327,35020], 'd': [35020,46955], 'e': [46955,59656], 'é': [46955,59656], 'è': [46955,59656], 'ê': [46955,59656], 'f': [59656,65543], 'g': [65543,70136], 'h': [70136,72770], 'i': [72770,78914], 'î': [72770,78914], 'j': [78914,80086], 'k': [80086,80419], 'l': [80419,83715], 'm': [83715,91425], 'n': [91425,93588], 'o': [93588,96169], 'ô': [93588,96169], 'p': [96169,108785], 'q': [108785,109367], 'r': [109367,122191], 's': [122191,131643], 't': [131643,138402], 'u': [138402,138891], 'ù': [138402,138891], 'v': [138891,142215], 'w': [142215,142315], 'x': [142315,142338], 'y': [142338,142430], 'z': [142430,142688]}



def affiche(tab):
    liste=""
    for ligne_mot in tab:
        liste+=ligne_mot[0]+"\n"
    print(liste)
    print(len(tab))

def boyermoore_position(str,texte):
    """renvoie un tableau contenant tous les indices du mot qui sont le début de str, si il n'y pas str dans le mot alors le tableau est vide
    Ex: boyermoore_position("ca","cacahuètes") renverra [0,2]"""
    positions=[]
    if len(str)==1:
        for i in range(len(texte)):
            if texte[i]==str:
               positions+=[i]
        return positions
    i=len(str)-1
    b=-1
    while i<len(texte):
        if texte[i]==str[b]:
            if b==-len(str):
                positions+=[i]
                b=-1
                i+=len(str)*2-1
            else:
                b-=1
                i-=1
        else:
            while -b<=len(str) and str[b]!=texte[i] :
                b-=1
            i+=-b-1
            b=-1
    return positions


def motte(tab):
    """renvoie les éléments du tableau sous la forme d'une chaine de caractères"""
    mot=""
    for i in tab:
        mot+=str(i)
    return mot

def tableau(str):
    """renvoie la chaine de caracteres sous la forme d'un tableau"""
    tab=[]
    for lettre in str:
        tab.append(lettre)
    return tab

def ligne(str):
    """renvoie la ligne complètes du mot demandé s'il existe"""
    for ligne_mot in dico[index_dico[str[0]][0]:index_dico[str[0]][1]]:
        if ligne_mot[0]==str:
            return ligne_mot
    raise ValueError("ce mot n'est pas dans le dictionnaire")

def mot_existe(str):
    """renvoie True si le mot existe, False s'il n'existe pas"""
    for ligne_mot in dico[index_dico[str[0]][0]:index_dico[str[0]][1]]:
        if ligne_mot[0]==str:
            return True
    return False

def nb_syllabes(min,max,tab=dico[1:]):
    """renvoie un tableau contenant les ligne de tout les mots ayant le nombre de syllabes demandés
    parmi ceux dans le tableau en entrée
    min et max représente la fourchette de syllabes voulues, nb_syllabes([3,5]) renverra les mots contenant entre 3 et 5 syllabes
    Le tableau en entrée doit être constitués de ligne du dico """
    if max<min:
        raise ValueError("le nombre min ne peut pas être plus grand que le nombre max")
    liste=[]
    for ligne_mot in tab:
        nb_syllabes=int(ligne_mot[9])
        if min<=nb_syllabes<=max:
            liste.append(ligne_mot)
    return liste

def inverse_mot(str):
    """renvoie la suite de lettres dans l'orde inverse, a l'envers"""
    str_inverse=""
    for letrre in str:
        str_inverse=letrre+str_inverse
    return str_inverse

def commence(str,tab=dico[1:]):
    """renvoie tous les mots qui commencent par la/les lettres demandés par l'utilisateur"""
    if(str ==""):
        return tab
    liste=[]
    for ligne_mot in tab:
        mot=ligne_mot[0]
        if len(mot)>=len(str):
            if str==mot[:len(str)]:
                liste.append(ligne_mot)
    print(liste[:5])
    return liste

def finit(str,tab=dico[1:]):
    """revoie tous les mots qui finnisent par la/les lettres demandés par l'utilisateur"""
    if(str ==""):
        return tab
    liste=[]
    for ligne_mot in tab:
        mot=ligne_mot[0]
        if len(mot)>=len(str):
            if str==mot[-len(str):]:
                liste.append(ligne_mot)
    print(liste[:5])
    return liste

def contient_suite(str,tab=dico[1:]):
    """cette fonction renvoie tous les mots qui contiennes la suite de lettres dans l'ordre et a la suite.
"""
    liste=[]
    for ligne_mot in tab:
        mot=ligne_mot[0]
        if len(mot)>=len(str):
            for i in range (len(mot)-len(str)+1):
                if str==mot[i:i+len(str)]:
                    liste.append(ligne_mot)
    return liste

def contient(str,tab=dico[1:]):
    """renvoie tous les mots qui contiennent dans l'ordre mais pas forcément à la suite la/les lettres demandés par l'utilisateur"""
    liste=[]
    str=tableau(str)
    for ligne_mot in tab:
        mot=tableau(ligne_mot[0])
        if len(mot)>=len(str):
            i=0
            ce_mot="valide"
            while len(str)>i and ce_mot=="valide":
                if str[i] in mot:
                    mot=mot[mot.index(str[i])+1:]
                else:
                    ce_mot="non-valide"
                    break
                i=i+1
            if ce_mot=="valide":
                liste.append(ligne_mot)
    return liste

def anagramme(str,tab=dico[1:]):
    """renvoie tous les mots qui contiennent intégralement toutes les lettres demandés en se souciant de la position des lettres dans le mot"""
    liste=[]
    for ligne_mot in tab:
        mot=tableau(ligne_mot[0])
        if len(mot)==len(str):
            ce_mot="valide"
            for lettre in str:
                if lettre in mot:
                    mot.remove(lettre)
                else:
                    ce_mot="non-valide"
                    break
            if ce_mot=="valide":
                liste.append(ligne_mot)
    return liste

def sorte_anagramme(str,sup=100,tab=dico[1:]):
    """renvoie tous les mots qui contiennent toutes les lettres demandés en se souciant de la position des lettres dans le mot, on peut définir un nombre de lettres suplémentaires autorisés en cheangeant l'argument sup"""
    liste=[]
    for ligne_mot in tab:
        mot=tableau(ligne_mot[0])
        if len(mot)<=sup+len(str):
            ce_mot="valide"
            for lettre in str:
                if lettre in mot:
                    mot.remove(lettre)
                else:
                    ce_mot="non-valide"
                    break
            if ce_mot=="valide":
                liste.append(ligne_mot)
    return liste



def phon(str):
    """"renvoie l'écriture phonétique du mot"""
    return tableau_mot(str)[0][1]

def commence_phon(str,tab=dico[1:]):
    """revoie tous les mots qui commencent par le/les sons demandés par l'utilisateur"""
    liste=[]
    for ligne_mot in tab:
        mot_phon=ligne_mot[1]
        if len(mot_phon)>=len(str):
            if str==mot_phon[:len(str)]:
                liste.append(ligne_mot)
    return liste


def finit_phon(str,tab=dico[1:]):
    """revoie tous les mots qui finissent par le/les sons demandés par l'utilisateur"""
    liste=[]
    for ligne_mot in tab:
        mot_phon=ligne_mot[1]
        if len(mot_phon)>=len(str):
            if str==mot_phon[-len(str):]:
                liste.append(ligne_mot)
    return liste

def contient_suite_phon(str,tab=dico[1:]):
    """cette fonction renvoie tous les mots qui contiennes la suite de sons dans l'ordre et a la suite.
En changeant le paramètre indice, on change ce que nous renvoie la fonction: si on laisse "all", la fonction renvoie la ligne complète de chaque mot, si l'on veut uniquement le mot, alors on indique 0 """
    liste=[]
    for ligne_mot in tab:
        mot_phon=ligne_mot[1]
        if len(mot_phon)>=len(str):
            for i in range (len(mot_phon)-len(str)+1):
                if str==mot_phon[i:i+len(str)]:
                    liste.append(ligne_mot)
    return liste

def contient_phon(str,tab=dico[1:]):
    """revoie tous les mots qui contiennent dans l'ordre mais pas forcément à la suite le/les sons demandés par l'utilisateur"""
    liste=[]
    str=tableau(str)
    for ligne_mot in tab:
        mot_phon=tableau(ligne_mot[1])
        if len(mot_phon)>=len(str):
            i=0
            ce_mot="valide"
            while len(str)>i and ce_mot=="valide":
                if str[i] in mot_phon:
                    mot_phon=mot_phon[mot_phon.index(str[i])+1:]
                else:
                    ce_mot="non-valide"
                    break
                i=i+1
            if ce_mot=="valide":
                liste.append(ligne_mot)
    return liste

def anagramme_phon(str,tab=dico[1:]):
    """renvoie tous les mots qui contiennent exclusivement tous les sons demandés en se souciant de la position des lettres dans le mot"""
    liste=[]
    for ligne_mot in tab:
        mot_phon=tableau(ligne_mot[1])
        if len(mot_phon)==len(str):
            ce_mot="valide"
            for lettre in str:
                if lettre in mot:
                    mot_phon.remove(lettre)
                else:
                    ce_mot="non-valide"
                    break
            if ce_mot == "valide":
                liste.append(ligne_mot)
    return liste

def sorte_anagramme_phon(str,tab=dico[1:],sup=100):
    """renvoie tous les mots qui contiennent tous les sons demandés en se souciant de la position des sons dans le mot, on peut définir un nombre de sons suplémentaires autorisés en cheangeant l'argument sup """
    liste=[]
    for ligne_mot in tab:
        mot_phon=tableau(mot[1])
        if len(mot_phon)<=sup+len(str):
            ce_mot="valide"
            for lettre in str:
                if lettre in mot_phon:
                    mot_phon.remove(lettre)
                else:
                    ce_mot="non-valide"
                    break
            if ce_mot == "valide":
                liste.append(ligne_mot)
    return liste



def contrepetrie(str1,str2,contient_str1_et_str2="oui",tab=dico[1:]):
    """renvoie tous les mots contenant une ou plusieurs fois str1 qui existe toujours lorsque str1 est remplacé par str2
    En fonction de l'argument contient_str1_et_str2 on peut choisir de:
        -récuperer également les mots qui contiennent str1 et str2,  contient_str1_et_str2="oui"
        -ne pas récuperer les mots qui contiennent str1 et str2,  contient_str1_et_str2="non"
        -récuperer également les mots qui contiennent str1 et str2,  contient_str1_et_str2="uniquement"  """
    liste=[]
    for ligne_mot in tab:
        if ligne_mot not in liste:
            mot=tableau(ligne_mot[0])
            pos_début_str1=boyermoore_position(str1,mot)
            pos_début_str2=boyermoore_position(str2,mot)
            if ((contient_str1_et_str2=="oui") and (pos_début_str1!=[] or pos_début_str2!=[]))                                                                                  or ((contient_str1_et_str2=="uniquement") and (pos_début_str1!=[] and pos_début_str2!=[]))                                                              or ((contient_str1_et_str2=="non") and ((pos_début_str1!=[] and pos_début_str2==[]) or (pos_début_str1==[] and pos_début_str2!=[]))):
                pos_début=positions(pos_début_str1,pos_début_str2,str1,str2)
                decal=0
                #decal permet que les lettres soient enlevés et mises au bon endroit lorsque la                                                                                                                  taille entre str1 et str2 et différente
                for a in pos_début:
                    del mot[a[0]+decal:a[0]+decal+len(a[1])]
                    t=0
                    str=str2 if a[1]==str1 else str1
                    for b in range (a[0]+decal,a[0]+decal+len(str)):
                        mot.insert(b,str[t])
                        t+=1
                    decal+=len(str)-len(a[1])
                mot2=motte(mot)
                if mot_existe(mot2):
                    liste.append(ligne_mot)
                    liste.append(ligne(mot2))
    return liste

def positions(pos_début_str1,pos_début_str2,str1,str2):
    """renvoie un tableau contenant par ordre croissant les indices du mot qui sont le début de str1 ou str2"""
    pos_début=[]
    i1=0
    i2=0
    while i1<len(pos_début_str1) and i2<len(pos_début_str2):
        if pos_début_str1[i1] < pos_début_str2[i2]:
            pos_début.append([pos_début_str1[i1],str1])
            i1+=1
        else:
            pos_début.append([pos_début_str2[i2],str2])
            i2+=1
    for i in range (i1,len(pos_début_str1)):
        pos_début.append([pos_début_str1[i],str1])
    for i in range (i2,len(pos_début_str2)):
        pos_début.append([pos_début_str2[i],str2])
    return pos_début


def transform_in_json(tab=dico[1:]):
    list_index = ['ortho', 'phon', 'lemme', 'cgram', 'genre', 'nombre', 'freqlemfilms2', 'freqlemlivres', 'freqfilms2', 'freqlivres', 'infover', 'nbhomogr', 'nbhomoph', 'islem', 'nblettres', 'nbphons', 'cvcv', 'p_cvcv', 'voisorth', 'voisphon', 'puorth', 'puphon', 'syll', 'nbsyll', 'cv-cv', 'orthrenv', 'phonrenv', 'orthosyll', 'cgramortho', 'deflem', 'defobs', 'old20', 'pld20', 'morphoder', 'nbmorph']
    tab_dico =  []
    for i in range (len(tab)):
        dict = {}
        for j in range (len(list_index)):
            dict[list_index[j]] = tab[i][j]
        tab_dico.append(dict)
    return  json.dumps(tab_dico)

def filter_head_dico(args):
    dico_filter_head = commence(args.get("startsWith",""))
    dico_filter_head =finit(args.get("endedWith",""), dico_filter_head)
    print(args.get("startsWith",""))

    return transform_in_json(dico_filter_head)
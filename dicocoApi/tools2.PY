import csv
import json

dico=list(csv.reader(open("Dico.csv")))
index_dico={'a': [1,12194], 'à': [1,12194], 'â': [1,12194], 'b': [12194,19327], 'c': [19327,35020], 'ç': [19327,35020], 'd': [35020,46955], 'e': [46955,59656], 'é': [46955,59656], 'è': [46955,59656], 'ê': [46955,59656], 'f': [59656,65543], 'g': [65543,70136], 'h': [70136,72770], 'i': [72770,78914], 'î': [72770,78914], 'j': [78914,80086], 'k': [80086,80419], 'l': [80419,83715], 'm': [83715,91425], 'n': [91425,93588], 'o': [93588,96169], 'ô': [93588,96169], 'p': [96169,108785], 'q': [108785,109367], 'r': [109367,122191], 's': [122191,131643], 't': [131643,138402], 'u': [138402,138891], 'ù': [138402,138891], 'v': [138891,142215], 'w': [142215,142315], 'x': [142315,142338], 'y': [142338,142430], 'z': [142430,142688]}
#['1_ortho', '2_phon', '3_lemme', '4_cgram', '5_genre', '6_nombre', '7_freqlemfilms2', '8_freqlemlivres', '9_freqfilms2', 
# '10_freqlivres', '11_infover', '12_nbhomogr', '13_nbhomoph', '14_islem', '15_nblettres', '16_nbphons', '17_cvcv', '18_p_cvcv', '19_voisorth', 
# '20_voisphon', '21_puorth', '22_puphon', '23_syll', '24_nbsyll', '25_cv-cv', '26_orthrenv', '27_phonrenv', '28_orthosyll', '29_cgramortho', 
# '30_deflem', '31_defobs', '32_old20', '33_pld20', '34_morphoder', '35_nbmorph']


def affiche(tab):
    list=""
    for line_world in tab:
        list+=line_world[0]+"\n"
    print(list)
    print(len(tab))

def boyermoore_position(str,text):
    """renvoie un tab contenant tous les indices du world qui sont le start de str, si il n'y pas str dans le world alors le tab est vide
    Ex: boyermoore_position("ca","cacahuètes") renverra [0,2]"""
    positions=[]
    if len(str)==1:
        for i in range(len(text)):
            if text[i]==str:
               positions+=[i]
        return positions
    i=len(str)-1
    b=-1
    while i<len(text):
        if text[i]==str[b]:
            if b==-len(str):
                positions+=[i]
                b=-1
                i+=len(str)*2-1
            else:
                b-=1
                i-=1
        else:
            while -b<=len(str) and str[b]!=text[i] :
                b-=1
            i+=-b-1
            b=-1
    return positions


def worldte(tab):
    """renvoie les éléments du tab sous la forme d'une chaine de caractères"""
    world=""
    for i in tab:
        world+=str(i)
    return world

def tab(str):
    """renvoie la chaine de caracteres sous la forme d'un tab"""
    tab=[]
    for letter in str:
        tab.append(letter)
    return tab

def line(str):
    """renvoie la line complètes du world demandé s'il exist"""
    for line_world in dico[index_dico[str[0]][0]:index_dico[str[0]][1]]:
        if line_world[0]==str:
            return line_world
    raise ValueError("ce world n'est pas dans le dictionnaire")

def world_exist(str):
    """renvoie True si le world exist, False s'il n'exist pas"""
    for line_world in dico[index_dico[str[0]][0]:index_dico[str[0]][1]]:
        if line_world[0]==str:
            return True
    return False

def nb_syllables(min,max,line):
    """renvoie un tab contenant les line de tout les worlds ayant le nombre de syllables demandés
    parmi ceux dans le tab en entrée
    min et max représente la fourchette de syllables voulues, nb_syllables([3,5]) renverra les worlds contenant entre 3 et 5 syllables
    Le tab en entrée doit être constitués de line du dico """
    
    if max<min:
        raise ValueError("le nombre min ne peut pas être plus grand que le nombre max")
    nb_syllables=int(line[23])
    return min<=nb_syllables<=max

def opposite_world(str):
    """renvoie la suite de letters dans l'orde opposite, a l'envers"""
    str_opposite=""
    for letrre in str:
        str_opposite=letrre+str_opposite
    return str_opposite

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
    """cette fonction renvoie tous les worlds qui contiennes la suite de letters dans l'ordre et a la suite.
"""
    res = False
    world=line[0]
    if len(world)>=len(str):
        for i in range (len(world)-len(str)+1):
                if str==world[i:i+len(str)]:  
                    res = True
    return res

def include(str,line):
    """renvoie tous les worlds qui contiennent dans l'ordre mais pas forcément à la suite la/les letters demandés par l'utilisateur"""
    
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
    res = False
    world = line[0]
    if len(world)==len(str):
        res = True
        for i in str:
                if i in world:
                    continue
                else:
                    res = False
                    break
    return res

def sorte_anagram(str,sup=100,tab=dico[1:]):
    """renvoie tous les worlds qui contiennent toutes les letters demandés en se souciant de la position des letters dans le world, on peut définir un nombre de letters suplémentaires autorisés en cheangeant l'argument sup"""
    list=[]
    for line_world in tab:
        world=tab(line_world[0])
        if len(world)<=sup+len(str):
            ce_world="valide"
            for letter in str:
                if letter in world:
                    world.remove(letter)
                else:
                    ce_world="non-valide"
                    break
            if ce_world=="valide":
                list.append(line_world)
    return list


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

def include_sequence_phon(str,tab=dico[1:]):
    """cette fonction renvoie tous les worlds qui contiennes la suite de sons dans l'ordre et a la suite.
En changeant le paramètre indice, on change ce que nous renvoie la fonction: si on laisse "all", la fonction renvoie la line complète de chaque world, si l'on veut uniquement le world, alors on indique 0 """
    list=[]
    for line_world in tab:
        world_phon=line_world[1]
        if len(world_phon)>=len(str):
            for i in range (len(world_phon)-len(str)+1):
                if str==world_phon[i:i+len(str)]:
                    list.append(line_world)
    return list

def include_phon(str,tab=dico[1:]):
    """revoie tous les worlds qui contiennent dans l'ordre mais pas forcément à la suite le/les sons demandés par l'utilisateur"""
    list=[]
    str=tab(str)
    for line_world in tab:
        world_phon=tab(line_world[1])
        if len(world_phon)>=len(str):
            i=0
            ce_world="valide"
            while len(str)>i and ce_world=="valide":
                if str[i] in world_phon:
                    world_phon=world_phon[world_phon.index(str[i])+1:]
                else:
                    ce_world="non-valide"
                    break
                i=i+1
            if ce_world=="valide":
                list.append(line_world)
    return list

def anagramme_phon(str,tab=dico[1:]):
    """renvoie tous les worlds qui contiennent exclusivement tous les sons demandés en se souciant de la position des letters dans le world"""
    list=[]
    for line_world in tab:
        world_phon=tab(line_world[1])
        if len(world_phon)==len(str):
            ce_world="valide"
            for letter in str:
                if letter in world:
                    world_phon.remove(letter)
                else:
                    ce_world="non-valide"
                    break
            if ce_world == "valide":
                list.append(line_world)
    return list

def sorte_anagramme_phon(str,tab=dico[1:],sup=100):
    """renvoie tous les worlds qui contiennent tous les sons demandés en se souciant de la position des sons dans le world, on peut définir un nombre de sons suplémentaires autorisés en cheangeant l'argument sup """
    list=[]
    for line_world in tab:
        world_phon=tab(world[1])
        if len(world_phon)<=sup+len(str):
            ce_world="valide"
            for letter in str:
                if letter in world_phon:
                    world_phon.remove(letter)
                else:
                    ce_world="non-valide"
                    break
            if ce_world == "valide":
                list.append(line_world)
    return list



def contrepetrie(str1,str2,include_str1_et_str2="oui",tab=dico[1:]):
    """renvoie tous les worlds contenant une ou plusieurs fois str1 qui exist toujours lorsque str1 est remplacé par str2
    En fonction de l'argument include_str1_et_str2 on peut choisir de:
        -récuperer également les worlds qui contiennent str1 et str2,  include_str1_et_str2="oui"
        -ne pas récuperer les worlds qui contiennent str1 et str2,  include_str1_et_str2="non"
        -récuperer également les worlds qui contiennent str1 et str2,  include_str1_et_str2="uniquement"  """
    list=[]
    for line_world in tab:
        if line_world not in list:
            world=tab(line_world[0])
            pos_start_str1=boyermoore_position(str1,world)
            pos_start_str2=boyermoore_position(str2,world)
            if ((include_str1_et_str2=="oui") and (pos_start_str1!=[] or pos_start_str2!=[]))                                                                                  or ((include_str1_et_str2=="uniquement") and (pos_start_str1!=[] and pos_start_str2!=[]))                                                              or ((include_str1_et_str2=="non") and ((pos_start_str1!=[] and pos_start_str2==[]) or (pos_start_str1==[] and pos_start_str2!=[]))):
                pos_start=positions(pos_start_str1,pos_start_str2,str1,str2)
                decal=0
                #decal permet que les letters soient enlevés et mises au bon endroit lorsque la                                                                                                                  taille entre str1 et str2 et différente
                for a in pos_start:
                    del world[a[0]+decal:a[0]+decal+len(a[1])]
                    t=0
                    str=str2 if a[1]==str1 else str1
                    for b in range (a[0]+decal,a[0]+decal+len(str)):
                        world.insert(b,str[t])
                        t+=1
                    decal+=len(str)-len(a[1])
                world2=worldte(world)
                if world_exist(world2):
                    list.append(line_world)
                    list.append(line(world2))
    return list

def positions(pos_start_str1,pos_start_str2,str1,str2):
    """renvoie un tab contenant par ordre croissant les indices du world qui sont le start de str1 ou str2"""
    pos_start=[]
    i1=0
    i2=0
    while i1<len(pos_start_str1) and i2<len(pos_start_str2):
        if pos_start_str1[i1] < pos_start_str2[i2]:
            pos_start.append([pos_start_str1[i1],str1])
            i1+=1
        else:
            pos_start.append([pos_start_str2[i2],str2])
            i2+=1
    for i in range (i1,len(pos_start_str1)):
        pos_start.append([pos_start_str1[i],str1])
    for i in range (i2,len(pos_start_str2)):
        pos_start.append([pos_start_str2[i],str2])
    return pos_start


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
    dico_filter_head = start(args.get("startsWith",""))
    dico_filter_head =end(args.get("endedWith",""), dico_filter_head)
    print(args.get("startsWith",""))

    return transform_in_json(dico_filter_head)

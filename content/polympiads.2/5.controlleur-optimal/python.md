---
title: 'Statistiques sur les voyageurs'
description: 'Votre entreprise vous demande calculer des statistiques sur les chemins des voyageurs.'

code:
  default: |
    nb_arrets = int(input())
    parents = list(map(int, input().split()))
    nb_voyageurs = int(input())
    arret_depart = []
    arret_fin = []
    for i in range(nb_voyageurs):
        a, b = list(map(int, input().split()))
        arret_depart.append(a)
        arret_fin.append(b)
    
    # Affichez pour tous les arrêts le nombre de voyageurs qui y passent
  corrected: |
    nb_arrets = int(input())
    parents = list(map(int, input().split()))
    nb_voyageurs = int(input())
    arret_debut = []
    arret_fin = []
    for i in range(nb_voyageurs):
        a, b = list(map(int, input().split()))
        arret_debut.append(a)
        arret_fin.append(b)
    
    # On calcule la distance à la racine
    distance_racine = [0 for i in range(nb_arrets)]
    for i_arret in range(nb_arrets):
        distance_racine[i_arret] = distance_racine[parents[i_arret]] + 1
        
    MAX_P2K = 20 # la puissance maximale est 2 puissance 20
    parents_2k = [[0 for i_arret in range(nb_arrets)] for i_puissance in range(MAX_P2K)]
    # On initialise parents_2k[0] qui représente les premiers parents (2 puissance 0 = 1)
    for i_arret in range(nb_arrets):
        parents_2k[0][i_arret] = parents[i_arret]
        
    # On itère sur chaque puissance de 2 à partir de 2 puissance 1 pour calculer sa table
    for i_puissance in range(1, MAX_P2K):
        for i_arret in range(nb_arrets):
            # Le 2 puissance iPuissance arrêt suivant est égal au 2 puissance iPuissance - 1 arrêt de l'arrêt
            # du 2 puissance iPuissance - 1 arrêt suivant de l'arrêt
            parents_2k[i_puissance][i_arret] = parents_2k[i_puissance - 1][parents_2k[i_puissance - 1][i_arret]]
        
    # On créé la liste de poids
    poids = [ 0 for i in range(nb_arrets) ]
    
    # Pour chaque voyageur
    for i in range(nb_voyageurs):
        debut = arret_debut[i]
        fin = arret_fin[i]
    
        # On ajoute 1 en bas des deux chemins
        poids[debut] += 1
        poids[fin] += 1
    
        # Si la distance à la racine du début est inférieure à celle de la fin, on les inverse
        # C'est utile pour faciliter la suite du code, ça ne change rien
        if (distance_racine[debut] < distance_racine[fin]):
            temp = debut
            debut = fin
            fin = temp
    
        k_a_decomposer = distance_racine[debut] - distance_racine[fin]
        for i_puissance in range(MAX_P2K):
            # Si kADecomposer est impair alors la iPuissance-ème puissance est inclue dans k.
            if (k_a_decomposer % 2 == 1):
                debut = parents_2k[i_puissance][debut]
    
            # On divise kADecomposer pour passer à la puissance suivante
            k_a_decomposer /= 2
    
        # Maintenant, le début et la fin sont à la distance de la racine donc on peut appliquer l'algorithme
        # De recherche en parcourant les puissances de 2
        for i_puissance in range(MAX_P2K - 1, -1, -1):
            if (parents_2k[i_puissance][debut] != parents_2k[i_puissance][fin]):
                debut = parents_2k[i_puissance][debut]
                fin = parents_2k[i_puissance][fin]
        
        # Maintenant, début = fin et il s'agit de L ou debut != fin et parents[debut] = parents[fin] et c'est L
        if (debut != fin):
            debut = parents[debut]
            fin   = parents[fin]
    
        # On retire 1 sur L
        poids[debut] -= 1
        # Si le parent de L existe (L != 0), alors on retire 1 au parent de L
        if (debut != 0):
            poids[parents[debut]] -= 1
    
            # On calcule la somme sur le sous arbre
    for i_arret in range(nb_arrets - 1, 0, -1):
        poids[parents[i_arret]] += poids[i_arret] # On ajoute la somme du sous arbre à la somme du parent
    
    for i_arret in range(nb_arrets):
        print(poids[i_arret])

tests:
  - input: |
      4
      0 0 0 1
      2
      1 2
      1 3
    expectedOutput: |-
      1
      2
      1
      1
  - input: |
      10
      0 0 1 2 2 1 5 0 7 7
      10
      1 3
      0 0
      3 9
      8 4
      0 5
      6 2
      6 5
      5 2
      2 9
      9 4
    expectedOutput: |-
      6
      8
      7
      2
      2
      4
      2
      4
      1
      3
---

### Statistiques sur les voyageurs

Grâce à votre connaissance sur le réseau, vous avez été embauché pour l'entreprise de transport. Votre premier travail consiste à calculer des statistiques sur les voyageurs de votre ligne de métro. Récemment, celle-ci est devenue bi-directionnelle, ce qui signifie qu'il s'agit toujours d'un arbre, mais que vous pouvez-vous rendre d'un arrêt à un autre sans contrainte, aucune direction n'est forcée. On vous donne toujours l'arbre sous le même format.

Cependant, vous avez reçu de la part de l'entreprise des informations sur `nb_voyageurs` voyageurs, notamment chacun d'entre eux a effectué un trajet entre deux arrêts dans le plus court chemin possible. Votre but est de déterminer le nombre de voyageurs qui sont passés par chaque arrêt et d'afficher ces `nb_arrets` valeurs dans l'ordre, une valeur par ligne.

### Consigne

On va vous donner l'information sur `nb_voyageurs` voyageurs, représentés par deux listes `arretDepart` et `arretFin`. Votre but est de déterminer le nombre de voyageurs qui sont passés par chaque arrêt et d'afficher ces `nb_arrets` valeurs dans l'ordre, une valeur par ligne.

### Exemple

Supposons qu'on ait l'exemple suivant et que `arret_depart = [1, 1]` et `arret_fin = [2, 3]` :

::dark-background
![Tree](/polympiads/tree-metro-polympiads.png)
::

Dans cet exemple, vous devez affichez sur 4 lignes les valeurs 1, 2, 1 et 1.

### Indices et contraintes

Ce problème est beaucoup plus complexe que les précédents, et nécessite d'avoir résolu et compris l'exercice précédent.

::hint
Supposons que tous les voyageurs se rendent toujours d'un arrêt à un arrêt situé sur le chemin de celui-ci à la racine, pouvez-vous trouver une manière de faire ce calcul ?

#title
Indice n°1
::

::hint
On est toujours dans le même cas que l'indice n°1, on va supposer qu'on inscrit des valeurs sur chacun des arrêts, et que le résultat pour un arrêt correspond à la somme des valeurs dans le sous-arbre de cet arrêt (le sous-arbre étant défini comme l'arrêt, ses enfants, les enfants de ses enfants, etc...). Pouvez-vous trouver les valeurs que l'on doit inscrire pour que cela fonctionne ?

#title
Indice n°2
::

::solution
Supposons que `A` et `B` sont les deux arrêts et que `B` est sur le chemin de la racine à `A`. Alors les valeurs à inscrire sont 1 sur l'arrêt `A`, dans ce cas là tous les arrêts de `A` à la racine reçoivent un `+1`, et `-1` sur l'arrêt `parents[B]`, dans ce cas là, tous les arrêts de `B` à la racine reçoivent un `-1` sauf `B`. On peut alors montrer que cela donne le résultat attendu.

#title
Solution des indices 1 et 2
::

::hint
Pouvez-vous décomposer un chemin en deux chemins de la forme des indices 1 et 2.

#title
Indice n°3
::

::solution
On peut décomposer cela en deux chemins, si `L` est le plus bas ancêtre commun, alors on peut le décomposer en un chemin de `A` à `L` et un de `B` à `L`. Cependant, dans ce cas là on compte une fois en trop pour la valeur de `L`, donc on doit retirer `1` sur cette valeur et rajouter `1` sur le parent de `L`.

#title
Solution
::
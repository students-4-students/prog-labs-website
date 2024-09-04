---
title: 'Prochain arrêt lointain'
description: 'Calculez des arrêts suivants rapidement'

code:
  default: |
    nb_arrets = int(input())
    parents = list(map(int, input().split()))
    nb_requetes = int(input())
    k_arret_suivant = []
    arret_depart = []
    for i in range(nb_requetes):
        k, d = list(map(int, input().split()))
        k_arret_suivant.append(k)
        arret_depart.append(d)
    
    # Affichez pour chaque requête le k_arret_suivant[i]-ème arrêt suivant de arret_depart[i]
  corrected: |
    nb_arrets = int(input())
    parents = list(map(int, input().split()))
    nb_requetes = int(input())
    k_arret_suivant = []
    arret_depart = []
    for i in range(nb_requetes):
        k, d = list(map(int, input().split()))
        k_arret_suivant.append(k)
        arret_depart.append(d)
    
    # Pour chaque requête
    for i in range(nb_requetes):
        arret_actuel = arret_depart[i]
        
        # On itère kArretSuivant[i] fois pour prendre le parent de l'arret actuel et avancer pour avancer k fois
        for iteration_actuelle in range(k_arret_suivant[i]):
            arret_actuel = parents[arret_actuel]
            
        print(arret_actuel)
        
    # BONUS
        
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
        
    # Pour chaque requête
    for i in range(nb_requetes):
        arret_actuel = arret_depart[i]
        k_a_decomposer = k_arret_suivant[i]
            
        for i_puissance in range(MAX_P2K):
            # Si kADecomposer est impair alors la iPuissance-ème puissance est inclue dans k.
            if k_a_decomposer % 2 == 1:
                arret_actuel = parents_2k[i_puissance][arret_actuel]
            # On divise kADecomposer pour passer à la puissance suivante
            k_a_decomposer //= 2
        
        print(arret_actuel)

tests:
  - input: |
      4
      0 0 0 1
      0 2 3 1
    expectedOutput: |-
      0
      2
      3
      3
  - input: |
      10
      0 0 1 2 2 1 5 0 7 7
      0 8 8 2 9 5 6 10 4 7
    expectedOutput: |-
      0
      8
      16
      18
      25
      13
      19
      10
      14
      17
---

### Distances au centre-ville

Cette fois-ci, on va vous donner `nb_requetes` requêtes. La i-ème d'entre-elle vous demandera de calculer le `k_arret_suivant[i]`-ème arrêt suivant, en partant de l'arrêt `arretDepart[i]`, et de l'afficher sur une ligne.

On défini le k-ème arrêt suivant comme l'arrêt sur le chemin à la racine qui est à une distance k.

### Exemple

Supposons qu'on ait l'exemple suivant et que `k_arret_suivant = [2, 1]` et `arret_depart = [3, 2]`

::dark-background
![Tree](/polympiads/tree-metro-polympiads.png)
::

Dans cet exemple, la première requête vous demande de dire le 2-ème prochain arrêt de l'arrêt 3. Il s'agit de l'arrêt 0. La seconde requête vous demande d'afficher l'arrêt 0 par le même raisonnement.

### Bonus

Le premier code présenté dans la correction est assez lent, seriez-vous capable de trouver une solution qui fonctionne lorsque `nb_arrets = 100'000` et `nb_requetes = 100'000` en utilisant moins de 10'000'000 opérations ?

::hint
Que pouvez-vous dire du deuxième arrêt suivant ? du quatrième par rapport au deuxième ?

#title
Indice n°1
::

::hint
Supposons que vous connaissez tous les deuxième arrêts suivants, pouvez-vous calculer rapidement tous les quatrièmes arrêts suivant ? De même pour les quatrièmes et les huitièmes ?

#title
Indice n°2
::

::solution
Le quatrième arrêt suivant d'un arrêt est le deuxième arrêt suivant du deuxième arrêt suivant de cet arrêt.

#title
Solution des indices 1 et 2
::

::hint
On cherche à calculer le k arrêt suivant. Pouvez-vous le décomposer en puissances de 2 et utiliser les outils des indices 1 et 2 ? 

#title
Indice n°3
::

::solution
On peut décomposer un nombre en puissances de 2 (par exemple, 5 = 4 + 1 et 49 = 32 + 16 + 1), et après utiliser les tables d'arrêt suivants avec des puissances de 2 qu'on précalcule pour retrouver le k-ème arrêt suivant. Par exemple si on veut trouver le 5-ème arrêt suivant, on récupère le premier arrêt suivant du quatrième arrêt suivant.

#title
Solution
::
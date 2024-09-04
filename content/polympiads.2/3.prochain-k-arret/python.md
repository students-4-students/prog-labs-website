---
title: 'Voyageur perdu'
description: 'Aidez un voyageur perdu à trouver le nom de sa destination'

code:
  default: |
    nb_arrets = int(input())
    parents = list(map(int, input().split()))
    nb_restaurants = int(input())
    distances_a_l_arret = []
    arret_depart = []
    for i in range(nb_restaurants):
        k, d = list(map(int, input().split()))
        distances_a_l_arret.append(k)
        arret_depart.append(d)
    
    # Affichez pour chaque requête l'arrêt à une distance distances_a_l_arret[i] de l'arrêt arret_depart[i]
  corrected: |
    nb_arrets = int(input())
    parents = list(map(int, input().split()))
    nb_restaurants = int(input())
    distances_a_l_arret = []
    arret_depart = []
    for i in range(nb_restaurants):
        k, d = list(map(int, input().split()))
        distances_a_l_arret.append(k)
        arret_depart.append(d)
    
    # Pour chaque requête
    for i in range(nb_restaurants):
        arret_actuel = arret_depart[i]
        
        # On itère distancesALArret[i] fois pour prendre le parent de l'arret actuel, en réduisant à chaque fois la distance de 1
        for iteration_actuelle in range(distances_a_l_arret[i], 0, -1):
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
    for i in range(nb_restaurants):
        arret_actuel = arret_depart[i]
        k_a_decomposer = distances_a_l_arret[i]
            
        for i_puissance in range(MAX_P2K):
            # Si k_a_decomposer est impair alors la iPuissance-ème puissance est inclue dans k.
            if k_a_decomposer % 2 == 1:
                arret_actuel = parents_2k[i_puissance][arret_actuel]
            # On divise k_a_decomposer pour passer à la puissance suivante
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
      0 8 5 9 9 6 6 1 4 8
    expectedOutput: |-
      0
      8
      13
      22
      22
      14
      20
      1
      5
      9
---

### Voyageur perdu

Cette fois-ci, nous allons nous intéresser au scénario suivant. Un voyageur vous aborde dans le métro, et, ne comprenant pas le fonctionnement du métro, souhaite savoir quel est le numéro de l'arrêt auquel se trouve un restaurant qui l'intéresse. Cependant, il ne connaît pas grand chose sur cet arrêt, la seule chose qu'il sait est qu'il s'agit d'un arrêt sur le chemin entre un arrêt de départ dont il connaît le numéro, ainsi que la distance à cet arrêt de départ. Cependant, ce voyageur est venu pour tester tous les restaurants de la ville, et il va vous demander de lui répondre à `nb_restaurants` restaurants.

### Consigne

on va vous donner `nb_restaurants` restaurants. Le i-ème d'entre eux se trouve à l'arrêt à une distance `distance_a_l_arret[i]` de l'arrêt `arret_depart[i]`. Vous devez afficher les `nb_restaurants` indices des arrêts où se trouvent les restaurants. Pour ce problème, on supposera que la distance entre un arrêt et son arrêt suivant est 1.

### Exemple

Supposons qu'on ait l'exemple suivant et que `distance_a_l_arret = [2, 1]` et `arret_depart = [3, 2]`

::dark-background
![Tree](/polympiads/tree-metro-polympiads.png)
::

Dans cet exemple, les deux restaurants se situent à la racine, l'arrêt 0.

### Bonus

Le premier code présenté dans la correction est assez lent, seriez-vous capable de trouver une solution qui fonctionne lorsque `nb_arrets = 100'000` et `nb_restaurants = 100'000` en utilisant moins de 10'000'000 opérations ?

::hint
Que pouvez-vous dire d'un restaurant à une distance de 2 ? à une distance de 4 ?

#title
Indice n°1
::

::hint
Supposons que vous connaissez pour chaque arrêt l'arrêt à une distance de 2, pouvez-vous calculer rapidement pour chaque arrêt son arrêt à une distance de 4 ? De même avec une distance de 4 et distance de 8 ?

#title
Indice n°2
::

::solution
L'arrêt à une distance de 4 est l'arrêt à une distance de 2 de l'arrêt à une distance de 2. Plus généralement, l'arrêt à une distance qui est une puissance de 2 est l'arrêt à la distance de la puissance de 2 en dessous de l'arrêt à la distance de la puissance de 2 en dessous de l'arrêt.

#title
Solution des indices 1 et 2
::

::hint
On cherche à calculer l'arrêt à une distance de k. Pouvez-vous décomposer k en puissances de 2 et utiliser les outils des indices 1 et 2 pour résoudre ? 

#title
Indice n°3
::

::solution
On peut décomposer un nombre en puissances de 2 (par exemple, 5 = 4 + 1 et 49 = 32 + 16 + 1), et on peut ensuite utiliser les tables des arrêts à des distances de puissance de 2 qu'on sait calculer. On peut juste calculer la table pour les 20 premières puissances. Pour ce qui est de la décomposition, il faut trouver la décomposition en base 2 de k et appliquer les tables de cette décomposition. Par exemple si k vaut 5, on doit utiliser la table à distance 4 et la table à distance 1.

#title
Solution
::
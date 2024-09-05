---
title: 'Alice et Bob'
description: 'Aidez Alice et Bob à déterminer où ils pourront se retrouver selon leur arrêt où ils se trouvent'

code:
  default: |
    nb_arrets = int(input())
    parents = list(map(int, input().split()))
    nb_questions = int(input())
    arret_alice = []
    arret_bob = []
    for i in range(nb_questions):
        a, b = list(map(int, input().split()))
        arret_alice.append(a)
        arret_bob.append(b)

    # Affichez pour chaque question le premier arrêt où Alice et Bob peuvent se rejoindre
  corrected: |
    nb_arrets = int(input())
    parents = list(map(int, input().split()))
    nb_questions = int(input())
    arret_alice = []
    arret_bob = []
    for i in range(nb_questions):
        a, b = list(map(int, input().split()))
        arret_alice.append(a)
        arret_bob.append(b)

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
        
    # Pour chaque requête
    for i in range(nb_questions):
        alice = arret_alice[i]
        bob = arret_bob[i]
        
        # Si la distance à la racine d'alice est inférieure à celle de bob, on les inverse
        # C'est utile pour faciliter la suite du code
        if (distance_racine[alice] < distance_racine[bob]):
            temp = alice
            alice = bob
            bob = temp
        
        k_a_decomposer = distance_racine[alice] - distance_racine[bob];
        for i_puissance in range(MAX_P2K):
            # Si kADecomposer est impair alors la iPuissance-ème puissance est inclue dans k.
            if (k_a_decomposer % 2 == 1):
                alice = parents_2k[i_puissance][alice]

            # On divise kADecomposer pour passer à la puissance suivante
            k_a_decomposer /= 2
        
        # Maintenant, Alice et Bob sont à la distance de la racine donc on peut appliquer l'algorithme
        # De recherche en parcourant les puissances de 2
        for i_puissance in range(MAX_P2K - 1, -1, -1):
            if (parents_2k[i_puissance][alice] != parents_2k[i_puissance][bob]):
                alice = parents_2k[i_puissance][alice]
                bob = parents_2k[i_puissance][bob]
        
        # Maintenant, alice = bob et il s'agit du résultat ou alice != bob et parents[alice] = parents[bob] et c'est le résultat
        if (alice != bob):
            alice = parents[alice]
            bob   = parents[bob]
        
        
        # Maintenant, alice = bob et il s'agit du résultat
        print(alice)

tests:
  - input: |
      4
      0 0 0 1
      2
      1 2
      1 3
    expectedOutput: |-
      0
      1
  - input: |
      10
      0 0 1 2 2 1 5 0 7 7
      10
      3 4
      2 0
      4 6
      8 4
      0 9
      6 4
      6 2
      3 1
      8 7
      9 2
    expectedOutput: |-
      2
      0
      1
      0
      0
      1
      1
      1
      7
      0
---

### Alice et Bob

Alice et Bob ne se sont pas vus depuis longtemps, ils souhaitent donc se retrouver. Chacun d'entre eux se situeront avant leur rendez-vous à un arrêt. Cependant, ils ne souhaitent pas passer trop de temps dans le métro et souhaitent se retrouver le plus tôt possible sur leur trajet jusqu'à la racine. Aidez-les à trouver le premier arrêt auquel ils peuvent se retrouver. Malheureusement, Alice et Bob ne savent pas encore où ils se trouveront avant de se retrouver, et vous posent la question plusieurs fois.

### Consigne

On va vous poser `nb_questions` questions. La i-ème d'entre elle correspondra à une question où Alice se trouve à l'arrêt `arret_alice[i]` et où Bob se trouve à l'arrêt `arret_bob[i]`. Pour chacune d'entre elles, vous devez afficher l'arrêt correspondant au plus bas ancêtre commun de ces deux arrêts dans l'arbre, le premier arrêt auquel Alice et Bob peuvent se rejoindre. Vous devez afficher un résultat par ligne.

### Exemple

Supposons qu'on ait l'exemple suivant et que `arret_alice = [1, 1]` et `arret_bob = [2, 3]` :

::dark-background
![Tree](/polympiads/tree-metro-polympiads.png)
::

Dans cet exemple, Alice et Bob pourront se rejoindre uniquement à la racine pour la première question, et ils pourront se rejoindre à l'arrêt 1 pour la deuxième. Vous devez donc afficher 0 et 1.

### Indices et contraintes

Ce problème est beaucoup plus complexe que les précédents, et nécessite d'avoir résolu et compris le bonus de l'exercice précédent. Nous vous invitons à faire celui-ci avant d'essayer ce problème.

::hint
Supposons que l'arrêt d'Alice et l'arrêt de Bob sont à la même distance de la racine, que pouvez-vous faire ?

#title
Indice n°1
::

::hint
Supposons que l'arrêt d'Alice et l'arrêt de Bob sont à la même distance de la racine, que pouvez-vous dire des arrêts à une distance d'une puissance de 2 des arrêts actuels ?

#title
Indice n°2
::

::solution
On note `A` et `B` les arrêts actuels et on s'intéresse à la une puissance de 2. Si l'arrêt à cette distance de `A` et celui de `B` sont les mêmes, alors soit il s'agit du premier arrêt soit il s'agit d'un arrêt avant. On va donc ne rien faire et passer à la puissance en dessous. Sinon, on remplace `A` et `B` par les arrêts en question et on continue avec la même puissance. On peut alors montrer qu'à la fin, soit `A = B`, soit l'arrêt à une distance de 1 de `A` est le même que celui de `B`.

#title
Solution des indices 1 et 2
::

::hint
On cherche maintenant à ramener `A` et `B` à la même distance de la racine, comment peut-on faire ça sans changer le résultat ?

#title
Indice n°3
::

::solution
Supposons que `B` soit à une distance `d` et que `A` soit à une distance `e` de la racine, et que `d < e`, alors si on remplace `A` par l'arrêt à une distance `e - d` de `A`, le résultat ne change pas et on se ramène au cas des indices 1 et 2.

#title
Solution
::

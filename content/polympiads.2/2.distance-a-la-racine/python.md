---
title: 'Distances au centre-ville'
description: 'Calculez des quantités sur des arbres'

code:
  default: |
    nb_arrets = int(input())
    parents = list(map(int, input().split()))
    distances_aux_parents = list(map(int, input().split()))
    
    # Affichez nb_noeuds nombres, les distances au centre ville.
  corrected: |
    nb_arrets = int(input())
    parents = list(map(int, input().split()))
    distances_aux_parents = list(map(int, input().split()))
    
    # On calcule la distance de la manière suivante, pour tout noeud possédant un parent,
    # La distance au centre est la distance au centre du parent plus la distance au parent
    distances_au_centre = [0 for i in range(nb_arrets)]
    for i_arret in range(1, nb_arrets):
        distances_au_centre[i_arret] = distances_au_centre[parents[i_arret]] + distances_aux_parents[i_arret]
    
    for i_arret in range(nb_arrets):
        print(distances_au_centre[i_arret])

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
      0 8 5 5 9 3 5 1 10 8
    expectedOutput: |-
      0
      8
      13
      18
      22
      11
      16
      1
      11
      9
---

### Distances au centre-ville

Dans cette seconde série, on va représenter notre ligne de métro par un arbre enraciné, où la racine représente le centre-ville et le parent d'un arrêt représente l'arrêt suivant sur le chemin de la ligne.

On vous demande de calculer pour chacun des arrêts sa distance au centre-ville. En plus de vous donner la liste des parents, on vous donnera une seconde liste `distances_aux_parents`, où le i-ème élément représente la distance entre le i-ème arrêt et son parent. Le premier élément n'ayant pas de signification, il vaudra 0. Vous devez afficher `nb_arrets` chiffres, les distances au centre-ville, chacun sur une ligne.

### Exemple

Supposons qu'on ait l'exemple suivant et que la liste de distances soit `[0, 2, 3, 1]` :

::dark-background
![Tree](/polympiads/tree-metro-polympiads.png)
::

Vous devez alors afficher quatre lignes, contenant respectivement 0, 2, 3 et 3. 

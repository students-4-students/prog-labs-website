---
title: 'Temps avant le terminus'
description: 'Calculez la durée pour rejoindre le terminus de la ligne de métro'

code:
  default: |
    nb_arrets = int(input())
    durees = list(map(int, input().split()))

    # Complétez le code pour calculer et afficher le temps pour atteindre le terminus
  corrected: |
    nb_arrets = int(input())
    durees = list(map(int, input().split()))

    # On calcule la somme des éléments dans le tableau durees, qui nous donne
    # Le résultat attendu.
    temps_au_terminus = 0
    for i_arret in range(nb_arrets - 1):
        temps_au_terminus += durees[i_arret]

    # On affiche la durée
    print(temps_au_terminus)

tests:
  - input: |
      4
      3 4 2
    expectedOutput: |-
      9
  - input: |
      10
      2 1 5 4 4 3 2 9 2
    expectedOutput: |-
      32
---

### Enoncé

La ligne M1 est l’une des lignes principales du réseau de transport qui permet aux étudiants de se déplacer.

Dans cette série, nous allons nous intéresser à différentes questions qu’un voyageur pourrait se poser lorsqu’il se trouve dans une ligne de métro, et allons essayer d’y répondre algorithmiquement.

Lors de ce premier exercice, on va chercher à calculer le temps nécessaire pour se rendre du départ de la ligne à son terminus.

### Objectif

Nous allons modéliser la ligne de métro comme une ligne unidirectionnelle contenant `nb_arrets` arrêts, numérotés de 0 à `nb_arrets` - 1. Le métro se déplace de l’arrêt 0 à l’arrêt `nb_arrets` - 1 en passant par tous les arrêts au milieu, dans l’ordre de la numérotation. De plus, on vous donne en entrée une liste `durees`, où le i-ème élément représente la durée du trajet entre l’arrêt i et l’arrêt i + 1. Vous partez de l’arrêt 0 et le terminus est l’arrêt `nb_arrets` - 1. Affichez la durée pour rejoindre le terminus.

### Exemple

Par exemple, on peut considérer la ligne suivante avec 4 arrêts de métro. Ici, la ligne de métro est représentée par une chaîne partant du départ de la ligne, avec l’arrêt 0 et passant par les arrêts 1 et 2 puis par l’arrêt 3. Les durées affichées représentent le temps pour se déplacer d’un arrêt au suivant.

![Graph](/polympiads/graph-metro-polympiads.png)

Dans ce cas, le tableau donné en entrée est [3, 4, 2], , et le temps pour rejoindre le terminus est de 9 minutes, et vous devez afficher la chaîne "9".

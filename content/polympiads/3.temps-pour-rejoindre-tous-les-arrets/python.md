---
title: 'Temps avant tous les arrêts'
description: 'Calculez la durée pour rejoindre tous les arrêts de la ligne de métro'

code:
  default: |
    nb_arrets = int(input())
    durees = list(map(int, input().split()))

    # Complétez le code pour calculer et afficher le temps pour atteindre tous les arrêts
  corrected: |
    nb_arrets = int(input())
    durees = list(map(int, input().split()))

    # Pour chaque fin
    for i_fin in range(1, nb_arrets - 1):
        # On calcule le temps de trajet à la fin
        temps_a_fin = 0
        for i_arret in range(i_fin): temps_a_fin += durees[i_arret]
        
        # On affiche le temps
        print(temps_a_fin)


    # BONUS

    nb_arrets = int(input())
    durees = list(map(int, input().split()))

    temps_a_fin = 0

    # Pour chaque fin
    for i_fin in range(1, nb_arrets - 1):
        # On augmente le temps par rapport au temps précédent (voir les indices)
        temps_a_fin += durees[i_fin - 1]

        # On affiche le temps
        print(temps_a_fin)

tests:
  - input: |
      4
      3 4 2
    expectedOutput: |-
      3
      7
      9
  - input: |
      10
      2 1 5 4 4 3 2 9 2
    expectedOutput: |-
      2
      3
      8
      12
      16
      19
      21
      30
      32
---

### Enoncé

Notre voyageur est maintenant indécis, il ne sait pas à quel arrêt il souhaite se rendre. Il souhaite, afin de faire son choix, connaître le temps pour rejoindre chacun des arrêts depuis le premier arrêt. Pouvez-vous l’aider à calculer toutes ces valeurs ?

### Objectif

Nous allons utiliser la même modélisation que dans l’exercice précédent. Vous devrez afficher _nb_arrets_ - 1 nombres sur _nb_arrets_ - 1 lignes. Le premier d’entre eux doit représenter le temps pour rejoindre le deuxième arrêt. Le second doit représenter le temps pour rejoindre le troisième arrêt, etc...

### Exemple

Par exemple, on peut considérer la ligne suivante avec 4 arrêts de métro.

![Graph](/polympiads/graph-metro-polympiads.png)

Dans ce cas, le tableau donné en entrée est [3, 4, 2], et les temps pour rejoindre les arrêts 1, 2 et 3 sont respectivement 3, 7 et 9 et vous devez donc afficher 3 lignes avec respectivement les chiffres 3, 7 et 9.

### Bonus

Le premier code présenté dans la correction est assez lent, seriez-vous capable de trouver une solution qui fonctionne lorsque _nb_arrets = 100'000_ en utilisant moins de 10'000'000 opérations ?

::hint
Que pouvez vous dire du calcul du temps de trajet entre l’arrêt 0 et l’arrêt i_fin ?

#title
Indice n°1
::

::hint
Existe-t-il une redondance lors du calcul des temps de trajet ?

#title
Indice n°2
::

::hint
Essayez d’exprimer le temps de trajet entre l’arrêt 0 et l’arrêt i_fin + 1 à partir de celui entre l’arrêt 0 et l’arrêt i_fin ? Que pouvez-vous faire de cette information ?

#title
Indice n°3
::

::hint
Le temps de trajet entre l'arrêt 0 et l'arrêt i_fin + 1 est égal au temps de trajet entre l'arrêt 0 et l'arrêt i_fin plus le temps de trajet entre l'arrêt i_fin et l'arrêt i_fin + 1. De cette manière, vous pouvez calculer en une opération le résultat à partir du précédent.

#title
Solution des indices
::

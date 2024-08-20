---
title: 'Carrés parfaits'
description: 'Résoudre un problème composé de plusieurs partie'

code:
  default: |
    n = int(input()) # lire le nombre n
    count = 0

    for i in range(n+1):
        # à compléter

    print(count)

  corrected: |
    n = int(input()) # lire le nombre n
    count = 0

    for i in range(n+1):
        for j in range(i+1):
            if j * j == i:
                count += 1 # équivalent à count = count + 1

    print(count)

tests:
  - input: '10'
    expectedOutput: '4'
  - input: '100'
    expectedOutput: '11'
---

![Carrés](/banner/carres.png)

### Enoncé

Un nombre est un carré parfait si sa racine carrée est un **entier**.

### Objectif

Ecrivez un programme qui retourne le nombre de carrés parfaits entre 0 et n (inclus).

### Exemple

Si n = 10, alors votre programme doit afficher `4`.

::hint
Utilisez deux boucles for : une pour parcourir les nombres de 0 à n et une autre pour chercher s’il existe une racine entière de ces nombres.
::

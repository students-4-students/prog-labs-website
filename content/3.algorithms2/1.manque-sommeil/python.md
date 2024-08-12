---
title: 'Manque de Sommeil'
description: 'todo'

code:
  default: |
    n = int(input()) # lire le nombre d'heure de sommeil

    # à compléter

  corrected: |
    n = int(input()) # lire le nombre d'heure de sommeil

    if n == 8:
        print("Suffisant")
    elif n < 8:
        print("Il faut dormir plus")
    else:
        print("Bravo !")

tests:
  - input: '8'
    expectedOutput: 'Suffisant'
  - input: '10'
    expectedOutput: 'Bravo !'
  - input: '6'
    expectedOutput: 'Il faut dormir plus'
---

![Sommeil](/banner/sommeil.png)

### Énoncé

Avant de venir à l’EPFL, Adam a reçu pas mal de conseils de gens expérimentés:

- le travail acharné
- la persévérance
- bien suivre les cours
- faire les séries d’exos
- Faire du sport 🏋️
- **BIEN DORMIIIR**

Adam n’est pas organisé donc il n’a pas réussi le dernier point, ce qui lui couté cher mentalement et physiquement.

### Objectif

Etant donné le nombre **n** d’heures de sommeil d’Adam, vous devez renvoyer si c’est suffisant ou pas.

Si **n** est :

- supérieur à 8 afficher “Bravo !”
- égal à 8 afficher “Suffisant”
- inférieur à 8 afficher “Il faut dormir plus”

<details>
  <summary>Indice</summary>
    Utilisez un `if`, un `elif`, et un `else`.
</details>

---
title: 'Boucles'
description: 'Utilisez une boucle pour répéter du code.'

code:
  default: |
    # ne faites pas attention à cette ligne
    # elle sert à initialiser les variables
    n = int(input())

    # compléter le code
  corrected: |
    # ne faites pas attention à cette ligne
    # elle sert à initialiser les variables
    n = int(input())

    for i in range(1, n+1):
        print(i)

    # Aller plus loin n°1
    for i in range (2, n+1, 2):
        print(i)

    # ou alors
    for i in range(2, n+1):
        # si le reste de la division par 2 est 0
            # c'est que i = 2k + 0 donc i est pair !
        if (i % 2 == 0):
            print(i)

    # Aller plus loin n°2
    for i in range(n, 0, -1):
        print(i)

tests:
  - input: |
      3
    expectedOutput: |-
      1
      2
      3
  - input: |
      10
    expectedOutput: |-
      1
      2
      3
      4
      5
      6
      7
      8
      9
      10
---

### Objectif

En programmation on voudra souvent répéter du code un certain nombre de fois ou à une variable près. La boucle `for` nous permet de faire cela.

### Consigne

Utilisez une boucle `for` pour afficher tous les nombres entiers compris entre 1 et n (inclus).

**pour aller plus loin…**

⭐ modifiez votre boucle pour afficher tous les nombres entiers pairs compris entre 2 et n (inclus si n est pair).

⭐ modifiez votre boucle pour afficher tous les nombres entiers compris entre 1 et n (inclus) par ordre décroissant.

### Cours

Une boucle `for` peut être écrite comme suit :

```python
for i in range(98):
	# code à exécuter...
}
```

- `i` est une variable qui prendra successivement toutes les valeurs de la séquence générée par `range(98)`, c'est-à-dire de 0 à 97.
- `in` indique que la variable `i` va prendre toutes les valeurs comprise dans `range(98)` (_range_ en anglais veut dire interval)
- l’instruction `range(98)` crée un interval de valeur que `i` va prendre qui commence à 0 inclus et qui se finit à 98 exclus et le “pas” de l’interval est 1 ( `i` prend d’abord la valeur 0 puis 1 puis 2, etc), ce qui ce traduit dans la boucle dans le fait que `i` est incrémentée par 1 à chaque itération de la boucle

> Note : la syntaxe plus générale de range est la suivant : `range(début, fin, pas)` où `*début*` est la valeur initiale (incluse) de l’interval, `*fin*` la valeur finale (exclue) de l’interval et `*pas*` détermine l'incrément entre chaque valeur successive de la séquence.
>
> Par exemple `range(2, 11, 2)` crée l’interval suivant : $[2, 4, 6, 8, 10]$
>
> Vous pouvez choisir d’indiquer uniquement la fin (comme dans l’exemple de boucle ci-dessus) ou uniquement le début et la fin ou encore le début et la fin et le pas (comme dans l’exemple précédent). La valeur par défaut pour le début est 0 et la valeur de pas par défaut est 1.

Ainsi, notre code sera exécuté 98 fois.

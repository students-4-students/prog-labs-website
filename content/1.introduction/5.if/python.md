---
title: 'Condition IF'
description: 'Faites des calculs conditionnels avec des variables.'

code:
  default: |
    # ne faites pas attention à ces deux lignes
    # elles servent à initialiser les variables
    a = int(input())
    b = int(input())

    # compléter le code
  corrected: |
    # ne faites pas attention à ces deux lignes
    # elles servent à initialiser les variables
    a = int(input())
    b = int(input())

    if a == b:
        print("j'ai tout compris")

tests:
  - input: |
      42
      42
    expectedOutput: |-
      j'ai tout compris
  - input: |
      42
      256
    expectedOutput: ''
---

### Objectif

La grande majorité des algorithmes exécutent du code différent en fonction de calculs précédents (par exemple, si l’heure est 20h, alors on va dormir, sinon on travaille). Ce `si ... sinon ...` s’exprime avec ce qu’on appelle un branchement conditionnel.

### Consigne

Vous disposez de deux nombres stockés dans les variables `a` et `b`. S’ils sont égaux, affichez `j’ai tout compris` dans le terminal.

### Cours

Vous aurez besoin de l’opérateur d’égalité, noté `==`. Il sert à comparer deux variables, pour voir si leur valeur est égale.

```python
a = 6
b = 5

a == b # renvoie False
a == (b + 1) # renvoie True
```

Une variante de cet opérateur est `!=` et permet de vérifier si deux variables sont différentes.

D’autres comparaisons peuvent être effectuées :

```python
a < b # renvoie False
a >= b # renvoie True
```

Il est possible de comparer du texte également avec `==` :

```python
texte1 = "Vous allez passer la 1ère année !!"
texte2 = "Vous allez passer la 1ère année !!"

texte1 == texte2 # renvoie True
```

Alors, comment utiliser ces conditions ? C’est ici que nous utilisons le `if` :

```python
a = 6
b = 6

if a == b:
    # s'exécute uniquement si a et b sont égaux
    print("Wow, amazing")
```

⚠️ En Python, l’indentation (espace blanc avant une ligne de code) est très important pour le bon fonctionnnement du programme, par exemple, on ici on veut afficher “Wow, amazing” uniquement si `a == b`, on indente donc la ligne du `print` pour que Python la considère comme faisant partie du bloc de code à exécuter si `a == b`.

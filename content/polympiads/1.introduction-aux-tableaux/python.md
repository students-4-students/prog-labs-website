---
title: 'Introduction aux tableaux'
description: 'Créez et manipulez des tableaux.'

code:
  default: |
    nb_elements = int(input())
    tableau     = list(map(int, input().split()))
    
    indice_depart, indice_fin = list(map(int, input().split()))
    
    # Implémentez ce que demande la consigne
    
    print(*tableau)
  corrected: |
    nb_elements = int(input())
    tableau     = list(map(int, input().split()))
    
    indice_depart, indice_fin = list(map(int, input().split()))
    
    # On récupère la valeur de départ
    valeur_depart = tableau[indice_depart]
    
    # On calcule la valeur qu'on souhaite stocker dans le tableau
    valeur_fin = valeur_depart + 1
    
    # On la stocke dans le tableau à l'indice de fin
    tableau[indice_fin] = valeur_fin
    
    # On aurait aussi pu écrire
    # tableau[indice_fin] = tableau[indice_depart] + 1
    
    print(*tableau)

tests:
  - input: |
      4
      1 2 4 8
      1 3
    expectedOutput: |-
      1 2 4 3 
---

### Introduction aux tableaux

Dans cet exercice, nous allons aborder l’un des éléments fondamentaux de l’informatique, les tableaux. Il s’agit d’une structure de données que vous avez déjà rencontré avec les chaînes de caractères, qui sont équivalentes à un tableau de caractère.

Un tableau peut être représenté comme une séquence finie d’éléments. On appelle la taille de ce tableau le nombre d’éléments de celui-ci, et on associe le premier élément à l’indice 0, le second à l’indice 1, etc... Par exemple, la séquence finie [1, 2, 3, 2] est représentée par la table

| Indice | 0   | 1   | 2   | 3   |
| ------ | --- | --- | --- | --- |
| Valeur | 1   | 2   | 3   | 2   |

Ici, on a choisi un tableau de nombres, mais on aurait pu imaginer un tableau de caractères comme [’H’, ‘e’, ‘l’, ‘l’, ‘o’], équivalent à la chaîne "Hello", ou même un tableau contenant d’autres types d’objets. L’intérêt d’un tableau est que ses éléments sont modifiables, et on peut changer la valeur associée à un indice. Voici quelques exemples de syntaxes pour les tableaux

```python
# créé une variable tableau de taille 4 contenant la séquence finie [1, 2, 3, 2]
tableau = [ 1, 2, 3, 2 ]

# on peut alors calculer si on le souhaite la somme des deux premières valeurs
somme = tableau[0] + tableau[1]

# on peut alors le stocker dans la quatrième case du tableau
tableau[3] = somme

# notre nouvelle séquence est alors [1, 2, 3, 3]
# on aurait aussi pu écrire tout sur une seule ligne
# tableau[3] = tableau[0] + tableau[1];
# bien sûr, les valeurs 0, 1 et 3 sont arbitraires, on aurait pu utiliser
# des variables ou des expressions à la place
```

### Consigne

Afin de vous familiariser avec les tableaux, on va vous donner un tableau d’entiers dans la variable `tableau` avec `nb_elements` éléments.

On vous donne aussi deux indices `indice_depart` et `indice_fin`. Vous devez remplacer la valeur à l’indice `indice_fin` par la valeur à l’indice `indice_depart`, à laquelle vous devez ajouter 1.

### Exemple

Par exemple, si on vous donne comme tableau [ 1, 2, 4, 8 ] et comme indices de départ et indices de fin respectivement 1 et 3, alors votre tableau final doit valoir [ 1, 2, 4, 3 ].

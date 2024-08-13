---
title: 'Or, and et else'
description: 'Utilisez les opérateurs logiques pour combiner des conditions.'

code:
  default: |
    # ne faites pas attention à ces deux lignes
    # elles servent à initialiser les variables
    heures = int(input())
    minutes = int(input())

    # compléter le code
  corrected: |
    # ne faites pas attention à ces deux lignes
    # elles servent à initialiser les variables
    heures = int(input())
    minutes = int(input())

    if heures == 8 and minutes == 15:
        print("Good morning EPFL")
    else:
        print("EPFL")

tests:
  - input: |
      8
      15
    expectedOutput: |-
      Good morning EPFL
  - input: |
      8
      16
    expectedOutput: |-
      EPFL
---

### Objectif

Dans certains cas, on peut vouloir exécuter un morceau de code si une condition est vérifiée et un morceau différent si elle ne l’est pas. Ceci est fait au moyen du branchement conditionnel `else` .

De même, on veut souvent vérifier si des combinaisons de conditions sont vraies (par exemple une condition A **ou** une condition B est vraie, ou alors les deux en même temps).

### Consigne

Vous disposez de deux variables contenant des nombres :

- une variable `heure`
- une variable `minutes`

Vérifiez si la variable `heure` contient `8` et la variable `minutes` contient `15` alors affichez `Good morning EPFL` sinon affichez simplement `EPFL`.

### Cours

Ici, vous aurez besoin de combiner `if` et `else` comme suit :

```python
if condition1:
    print("La première condition est vraie.")
elif condition2:
    print("La seconde condition est vraie.")
else:
    print("Aucune des deux conditions n'est vraie.")
```

Dans la quasi-totalité des langages de programmation que vous rencontrerez, il existe ce que l’on appelle des _opérateurs logiques._ Ce sont des opérateurs destinés à combiner où modifier vos conditions et permettre plus de flexibilité.

**Opérateur OU : si au moins une des N propositions est vraie**

**Opérateur ET : si toutes les N propositions sont vraies**

Par exemple :

```python
# and ("et" logique)
if condition1 and condition2:
    print("La condition1 ET la condition2 sont vraies.")

# or ("ou" logique)
if condition1 or condition2:
    print("La condition1 est vraie OU la condition2 est vraie OU les deux.")

# not (négation logique)
if not condition1:
    print("La condition1 est fausse.")
```

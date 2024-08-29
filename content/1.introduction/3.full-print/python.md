---
title: 'Print complet'
description: "Affichez le contenu d'une variable."

code:
  default: |
    # ne faites pas attention à cette ligne
    # elle sert à initialiser la variable
    # (voir le cours)
    a = int(input())

    # compléter le code

  corrected: |
    # ne faites pas attention à cette ligne
    # elle sert à initialiser la variable
    # (voir le cours)
    a = int(input())

    print(a)

tests:
  - input: '42'
    expectedOutput: '42'
  - input: '256'
    expectedOutput: '256'
---

### Objectif

Nous avons vu comment déclarer des variables, apprenons maintenant comment afficher leur contenu (c’est parfois utile pour comprendre pourquoi un programme ne fonctionne pas comme prévu !).

### Consigne

Affichez le contenu de la variable `a`.

Attention, le code à compléter contient 1 ligne qu'il ne faut pas modifier (`input`). Elle sert à donner des valeurs à la variable `a` pour que nous puissions tester automatiquement si votre code fonctionne pour plusieurs valeurs différentes. Ignorez-les pour cette semaine de pré-rentrée, vous verrez ça plus tard :)

### Cours

Pour cela, utilisons l’instruction `print()` vue rapidement dans le premier exercice.

Elle s’utilise comme ceci :

```python
print("Hello EPFL") # afficher Hello EPFL
```

Attention, comme nous voulons afficher du texte, il faut l'encadrer de guillemets sinon cela ne fonctionne pas. Si on veut afficher 1, qui est simplement un nombre, on écrit :

```python
print(1) # affiche 1
```

C’est la même chose pour les variables !

```python
text = "Hello EPFL"

print(text) # affiche Hello EPFL

number = 1

print(number) # affiche 1
```

> Note : `print` ajoute automatiquement un saut de ligne après avoir affiché le contenu. Pour ne pas afficher de retour à la ligne, utiliser `print(text, end=””)` qui affichera le contenu de la variable `text` sans retour à la ligne (deux `print` comme ceci seront affichés sur la même ligne)

---
title: 'Variables'
description: 'Déclarez des variables.'

code:
  default: |
    # écrire votre code ici
  corrected: |
    a = "Salut"
    b = 42
    c = True

tests:
  - input: ''
    expectedOutput: ''
---

### Objectif

Un deuxième outil de programmation que vous utiliserez tout le temps à l’EPFL sont **les variables**.

Celles-ci permettent de stocker des valeurs temporairement (des sortes de boîtes). En Python, chaque variable possède un nom, une valeur et un type (nombre, texte, etc.).

### Consigne

Déclarez 3 variables, `a`, `b` et `c`. Dans la première, mettre le texte `Salut`, dans la deuxième, mettre le nombre `42`, et dans la troisième, mettre la valeur `vrai`.

### Cours

En Python, une variable se déclare par la syntaxe suivante :

- **nom = valeur**

Par exemple, dans le code suivant, on déclare une variable appelée “nombre”, (dont le type est “int”) et la valeur 6.

```python
nombre = 6
```

Comment déterminer le type de la variable ?

Il en existe de nombreux, intéressons-nous à 3 d’entre eux :

- le premier permet de stocker des nombres entiers. C’est le type `int` (voir l’exemple ci-dessus).
- un autre permet de stocker du texte (appelées chaînes de caractères), c’est le type `str`

Ce texte doit être encadré par des guillemets doubles ou simples, comme ceci :

```python
texte = "Vous êtes à S4S"
# ou encore
texte = 'Vous êtes à S4S'
```

> Note : En Python, vous pouvez accéder au caractère placé à une position spécifique d’une chaîne en utilisant `texte[8]` (exemple pour la position 8). Attention, l’indexage des lettres commence à 0 (l’index de la première lettre est 0) !

- le dernier type que nous allons voir est le type `bool`. Ce type permet de stocker uniquement deux valeurs : True et False (Vrai ou Faux).

On peut également réassigner une valeur.

```python
nombre = 1 # ici, nombre vaut 1

nombre = 2
# maintenant ce n'est plus 1
# qui est stocké dans nombre, mais 2 !
```

La gestion des types des variables en Python est assez différentes d’autres languages de programation comme C/C++/Java. En effet on dit que le language Python est typé dynamiquement: chaque variable déclarée possède un type, mais ce n’est pas au programmeur d’expliciter textuellement le type de la variable qu’il déclare. Il peut juste utiliser la syntaxe **nom = valeur** et ce sera Python qui décidera lui même du type à attribuer à la variable en fonction de la valeur assignée. De plus, contrairement à en Java ou en C++, en Python il est possible de stocker successivement plusieurs valeurs de types différents dans une même variable (d’où le nom de typage _dynamique_) voici un exemple :

```python
variable = 10 # la variable est initalement de type 'int'
# ...
variable = "Salut" # la variable est à présent de type 'str'
# ...
variable = True # la variable est à présent de type 'bool'
```

> Note : pour celles et ceux voulant aller plus loin, en Python il existe une instruction permetant de déterminer à tout moment du programme le type courant d’une variable, c’est l’instruction `type(...)`. Par exemple pour afficher le type d’une variable vous pouvez utiliser la ligne suivante `print(type(variable))`

Maintenant, c’est à vous de jouer. Déclarez trois variables, que vous nommerez `a`, `b` et `c`, en mettant dans a, `42`, dans b, `Salut`, et dans c, `True`.

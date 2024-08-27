---
title: 'Dessiner EPFL'
description: "Dessinez le logo de l'EPFL dans la console."

code:
  default: |
    # n est la hauteur du L
    n = int(input())

    for i in range(n):
        # compléter le dessin du L

  corrected: |
    n = int(input())

    for i in range(n-1):
        # compléter le dessin du L
        print("*")

    for i in range(n):
        print("*", end="")

    # pour aller plus loin, vous pouvez dessiner les lettres EPF !
    n = int(input())

    for i in range(n):
        # print E
        if i == 0 or i == n-1 or i == n // 2:
            for j in range(n):
                print("*", end="")
        else:
            print("*", end="")
            for j in range(1, n):
                print(" ", end="")
        print("  ", end="") # espace entre les lettres
        # print P
        if i == 0 or i == n // 2:
            for j in range(n - 2):
                print("*", end="")
            print(" ", end="")
        elif i < n // 2:
            print("*", end="")
            for j in range(1, n - 2):
                print(" ", end="")
            print("*", end="")
        else:
            print("*", end="")
            for j in range(1, n - 1):
                print(" ", end="")
        print("  ", end="") # espace entre les lettres
        # print F
        if i == 0 or i == n // 2:
            for j in range(n - 1):
                print("*", end="")
        else:
            print("*", end="")
            for j in range(1, n - 1):
                print(" ", end="")
        print("  ", end="") # espace entre les lettres
        # print L
        if i == n - 1:
            for j in range(n):
                print("*", end="")
        else:
            print("*", end="")

tests:
  - input: '7'
    expectedOutput: |-
      *
      *
      *
      *
      *
      *
      *******
  - input: '10'
    expectedOutput: |-
      *
      *
      *
      *
      *
      *
      *
      *
      *
      **********
---

![EPFL](/banner/epfl.png)

### Enoncé

Il existe deux très grandes universités en Suisse connues à l’échelle internationale qui sont :

l’EPFZ (**École polytechnique fédérale de Zurich)** et l’EPFL (**École polytechnique fédérale de Lausanne).** On vous félicite d’avoir fait le bon choix.

Voilà le logo de l’EPFL :

![EPFL](/banner/epfl_logo.png)

Il sera encore plus stylé sur la console, dessinons-le ensemble :)

### Objectif

On vous donne les 3 premières lettres soit EPF, occupez-vous uniquement de dessiner le L manquant.

Vous pourriez utiliser l'instruction `print("un texte...", end="")` qui affichera "un texte" sans retour à la ligne... !

### Entrées

- **n** (Entier) : la hauteur maximale des lettres

**Exemples de tests :**

Si n = `7`, votre programme doit renvoyer (ne prenez que le L en compte) :

```java
*******  *****   ******  *
*        *    *  *       *
*        *    *  *       *
*******  *****   ******  *
*        *       *       *
*        *       *       *
*******  *       *       *******
```

::hint
Qu’est-ce qu’un `L`? c’est `n-1` lignes d’une étoile, puis une ligne de `n` étoiles :)
::

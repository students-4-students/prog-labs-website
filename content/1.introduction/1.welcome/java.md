---
title: 'Java : Bienvenue !'
description: 'Une rapide présentation du site de S4S Prog.'

code:
  default: |
    class Main {
      public static void main(String[] args) {
        System.out.println("Hello EPFL"); // affiche "Hello EPFL"
      }
    }
  corrected: |
    // voilà le code corrigé (identique dans cet exemple)
    class Main {
      public static void main(String[] args) {
        System.out.println("Hello EPFL"); // affiche "Hello EPFL"
      }
    }

runtime:
  stdin:
  stdout:

tests:
  - input: ''
    expectedOutput: 'Hello EPFL'
---

![Java](/banner/intro.png)

## Introduction au Java

Bienvenue au cours de programmation de Students 4 Students ! 🎉

Cette année, vous allez apprendre le Java, un langage de programmation très utilisé et assez adapté pour commencer. Ce site est là pour vous permettre d'acquérir quelques bases utiles pour votre première année à l'EPFL.

Lors du semestre, vous utiliserez un logiciel installé sur votre ordinateur pour lancer le code, mais ce sera très similaire à ce site !

**Organisation**

Ce cours est séparé en 3 séries :

- **1 série de syntaxe**, pour vous introduire au langage utilisé pendant le semestre
- **2 séries d’algorithmes,** pour vous faire pratiquer le langage et développer votre réflexion !

Chaque exercice sera séparé en 3 parties :

- une **introduction** présentant rapidement les concepts abordés
- une **consigne** (et des indices...) précisant ce que vous devez faire
- un **cours** pour apprendre à faire ce qui est demandé :)

**Enjoy !**

Si vous êtes à l'aise vous pouvez ne pas lire le cours, mais prenez votre temps pour bien comprendre chaque exercice !

Même si ce TP est entièrement faisable en ligne, ne restez pas seul derrière votre ordinateur ! **Discutez entre participants, posez des questions aux assistants**… c’est ce qui vous fera le plus progresser !

## Consigne

Lancez le code pré-écrit dans l'éditeur de code.

## Cours

En Java, on a besoin d’un morceau de code qui sera toujours présent avant d'écrire notre propre code. Vous comprendrez pourquoi il est utile plus tard dans le semestre 🙂

```java
class Main {
		public static void main(String[] args){

				// on met notre code ici !
				// par exemple on peut mettre l'instruction suivante :

				System.out.println("Hello EPFL"); // affiche "Hello EPFL"

		}
}
```

Les mots précédées de `//` sont ignorés, et sont des commentaires du code, on peut donc écrire en français après les avoir ajouté, sans que cela cause un problème.

_Il est très recommandé de respecter l’indentation (des espaces pour faire ressortir chaque bloc de code). Ce n’est pas grave si vous ne comprenez pas pour le moment !_

Et maintenant, **comment exécuter notre code ?** Dans chaque éditeur de code dont ce site, il existe un petit bouton prévu à cet effet, généralement un bouton "Play" (une flèche orientée vers la droite), situé en haut à droite de l’éditeur.

L’instruction `System.out.println` , que vous verrez en détails plus tard, permet à votre programme d’afficher du texte.

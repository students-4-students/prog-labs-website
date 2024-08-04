---
title: 'Java : Bienvenue !'
description: 'Une rapide présentation du site de S4S Prog.'

code:
  default: >
    public class Main {

      public static void main(String[] args) {

        System.out.println("Hello EPFL"); // affiche "Hello EPFL"

      }

    }
  corrected: >
    // voilà le code corrigé (identique dans cet exemple)
    public class Main {

      public static void main(String[] args) {

        System.out.println("Hello EPFL"); // affiche "Hello EPFL"

      }

    }

runtime:
  stdin:
  stdout:

validation:
  solver: >
    {
        manyTests(n) { return [this.test(n-1), this.test(n), this.test(n+1)] },
        test: (n) => 2*n,
        solve: (n) => n,
    }
  tests:
    - { input: 1, output: 1 }
    - { input: 1 }
    - { input: 'test(3)', resolved: false }
    - { input: 'manyTests(3)', resolved: false, multiple: true }
---

![Java logo](https://kinsta.com/wp-content/uploads/2023/01/Java-logo.png)

## Introduction au Java 👨‍💻

Bienvenue au cours de programmation de Students 4 Students ! 🎉

Cette année, vous allez apprendre le Java, un langage de programmation très utilisé et assez adapté pour commencer. Ce site est là pour vous permettre d'acquérir quelques bases utiles pour votre première année à l'EPFL.

Lors du semestre, vous utiliserez un logiciel installé sur votre ordinateur pour lancer le code, mais ce sera très similaire à ce site !

Chaque exercice sera séparé en 3 parties :

- une **introduction** présentant rapidement les concepts abordés
- une **consigne** précisant ce que vous devez faire
- un **cours** (et des indices...) pour apprendre à faire ce qui est demandé :)

Si vous êtes à l'aise vous pouvez ne pas lire le cours, mais prenez votre temps pour bien comprendre chaque exercice !

### La consigne

Lancez le code pré-écrit dans l'éditeur de code.

### Le cours

En Java, on a besoin d’un petit bout de code qui sera toujours présent (vous comprendrez pourquoi durant le semestre) avant d'écrire notre propre code :

```java
public class Main {
	public static void main(String[] args) {

    // et voilà
    // après avoir écrit tout ça
    // on peut enfin écrire notre code ici !

	}
}
```

Les mots précédées de `//` sont ignorés, et sont des commentaires du code.

Et maintenant, comment exécuter notre code ? Dns chaque éditeur de code dont ce site, il existe un petit bouton prévu à cet effet, généralement un bouton "Play" (une flèche orientée vers la droite), situé en haut à droite de l’éditeur.

#### Crédits

Cette série a été rédigée par Emmanuel Omont.

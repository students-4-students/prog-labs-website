---
title: 'Java : El Tony'
description: 'todo '

code:
  default: |
    import java.util.Scanner;
    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int jourDebut = scanner.nextInt(); // lire le jour de debut
            int jourFin = scanner.nextInt(); // lire le jour de fin
            
            // a completer
        }
    }
  corrected: |
    import java.util.Scanner;

    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int jourDebut = scanner.nextInt(); // lire le jour de debut
            int jourFin = scanner.nextInt(); // lire le jour de fin
            
            System.out.println(Math.pow(2, (jourFin - jourDebut + 1)) - 1);
        }
    }

    // L’informatique et la programmation ce n'est pas que des boucles for et des conditions, il faut savoir utiliser les outils, il y a beaucoup de maths et de logique relié à la programmation, il faut être attentif et trouver a chaque fois le moyen le plus efficace en temps et en mémoire pour résoudre un problème. La programmation c'est avant tout raisonner.

runtime:
  stdin:
  stdout:
---

### Intro

Dans Java, il existe pas mal de classe qu'on appelle des classes utilitaires qui nous permettent de faire des choses sans avoir à réinventer la roue, une de ces classes est la classe [_Math_](https://docs.oracle.com/javase%2F8%2Fdocs%2Fapi%2F%2F/java/lang/Math.html) qui nous permet de faire des opérations mathématiques comme la racine carrée, la puissance, la valeur absolue etc...

Exemple :

- la puissance en java :

```java
Math.pow(a, b) // renvoie a^b
```

### Enoncé

Tony, étudiant en IC, est addict aux maté, cette addiction s'accentue de plus en plus pendant la période de révision (mois de Juillet uniquement).

Il boit chaque jour deux fois le nombre de maté qu'il a bu la veille. Il commence par un maté le premier jour.

Il faut trouver combien de maté il a bu **jusqu'au jour n** étant donné le jour de début de la période de révision et le jour n

### Exemple

```java
input : 3 5
output : 7
```

Si on est le jour 1 (le 3 juillet), Tony a bu 1 maté

Si on est le jour 2 (le 4 juillet), Tony a bu 1+2 matés

Si on est le jour 3 (le 5 juillet), Tony a bu 1+2+4 matés.

### Objectif

Le but de ce problème est d'employer intelligemment les fonctions de la classe utilitaire Math pour résoudre ce problème avec tout le background qu'on a déjà.

---
title: 'Java : Affichage'
description: 'Afficher du contenu dans le terminal.'

code:
  default: |
    class Main {
      public static void main(String[] args){

        // complétez le code ici
        
      }
    }
  corrected: |
    class Main {
      public static void main(String[] args){
      
        String a = 42;
        int b = "Salut";
        boolean c = true;

      }
    }

runtime:
  stdin:
  stdout:
---

### Objectif

Un deuxième outil de programmation que vous utiliserez tout le temps à l’EPFL sont **les variables**.

Celles-ci permettent de stocker des valeurs temporairement (des sortes de boîtes). En Java, chaque variable possède un nom, une valeur et un type (nombre, texte, etc.).

### Consigne

Déclarez 3 variables, `a`, `b` et `c`. Dans la première, mettre le texte `Salut`, dans la deuxième, mettre le nombre `42`, et dans la troisième, mettre la valeur `vrai`.

Indice : attention au type de chaque variable, ils sont différents !

### Cours

En Java, une variable se déclare par la syntaxe suivante :

- **type nom = valeur**

Par exemple, dans le code suivant, on déclare une variable appelée “nombre”, dont le type est "int" (voir plus bas) et la valeur est 6.

On n’oublie pas le `;` à la fin!

```java
int nombre = 6;
```

Comment déterminer le type de la variable ?

Il en existe de nombreux, intéressons-nous à 3 d’entre eux :

- le premier permet de stocker des nombres entiers. C’est le type `int` (voir l’exemple ci-dessus).
- un autre permet de stocker du texte (appelées chaînes de caractères), c’est le type `String`

Ce texte doit être encadré par des guillemets doubles, comme ceci :

```java
String texte = "Vous êtes à S4S";
```

> Note : les chaînes de caractères sont en fait des séquences d’un type plus petit, les `char`. En Java, vous pouvez accéder au caractère placé à une position spécifique d’une chaîne en utilisant `texte.charAt(8)` (exemple pour la position 8).

- le dernier type que nous allons voir est le type `boolean`. Ce type permet de stocker uniquement deux valeurs : True et False (Vrai ou Faux).

On notera qu’en Java, on peut laisser une variable vide, qui est alors remplie avec une valeur par défaut :

```java
int nb; // vaut 0

boolean boo; // vaut false
```

On peut également réassigner une valeur.

```java
int nombre = 1; // là, nombre vaut 1.

nombre = 2;

// maintenant, ce n'est plus 1
// qui est stocké dans nombre, mais 2 !
```

Une fois que le type d’une variable est choisi, il n'est plus modifiable. On ne peut donc jamais stocker de texte dans une variable après l'avoir déclaré comme `int`, et inversement, par exemple.

```java
int nombre = 0;

nombre = "Salut"; // ne fonctionne pas !

String text = 2; // ne fonctionne pas non plus !
```

Maintenant, c’est à vous de jouer. Déclarez trois variables, que vous nommerez `a`, `b` et `c`, en mettant dans a, `42`, dans b, `Salut`, et dans c, `true`.

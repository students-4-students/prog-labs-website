---
title: 'Java : Variables'
description: 'Déclarez des variables simples.'

code:
  default: >
    public class Main {

      public static void main(String[] args) {

        // complétez le code ici

      }

    }
  corrected: >
    public class Main(){
      public static void main(String[] args){
        System.out.println("Bonjour EPFL");
      }
    }
    //le wrapper est préécrit et immodifiable, 
    //mais la personne doit quand même le taper.
    //Au début, il y a un commentaire à la place de la ligne, en mettant
    //ligne à modifier

runtime:
  stdin:
  stdout:
---

### Objectif

Vous aurez souvent besoin dans vos programmes de stocker des valeurs temporairement. Pour cela, utilisons ce qu’on appelle des variables (des sortes de boîtes). En Java, chaque variable possède un nom, une valeur et un type (nombre, texte, etc.).

### La consigne

Déclarez 3 variables, a, b et c. Dans la première, mettre le texte “Salut”, dans la deuxième, mettre le nombre 42, et dans la troisième, mettre la valeur vrai.

### Le cours

En Java, une variable se déclare par la syntaxe suivante :

**type nom = valeur**.

Par exemple, dans le code suivant, on déclare une variable appelée “nombre”, dont le type est "int" (voir plus bas) et la valeur est 6.
On n’oublie pas le ; à la fin!

```java
int nombre = 6;
```

Comment déterminer le type de la variable ?

Il en existe de nombreux, intéressons-nous à 3 d’entre eux :

- le premier permet de stocker des nombres entiers. C’est le type “int” (voir l’exemple ci-dessus).
- un autre permet de stocker du texte (appelées chaînes de caractères), c’est le type “String”

Ce texte doit être encadré par des guillemets doubles, comme ceci :

```java
String texte = "Vous êtes à S4S";
```

Enfin, le dernier type que nous allons voir est le type "Boolean". Ce type permet de stocker uniquement deux valeurs : True et False (Vrai ou Faux). A première vue, cela peut paraître inutile, mais il est très pratique, notamment pour tester des conditions. Il se déclare donc comme tel :

```java
boolean bool = true; //pour déclarer vrai
boolean bool2 = false; //pour déclarer faux
```

On notera que en Java, on peut laisser une variable vide, qui est alors remplie avec une valeur par défaut

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

Maintenant, c’est à vous de jouer. Déclarez trois variables, que vous nommerez a, b et c, en mettant dans a, `42`, dans b, `Salut`, et dans c, `true`.

#### Crédits

Cette série a été rédigée par Emmanuel Omont.

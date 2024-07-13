---
title: 'Java : Affichage'
description: 'Afficher du contenu dans le terminal.'

code:
  default: |
    public class Main {
      public static void main(String[] args) {
        // complétez le code ici
      }
    }
  corrected: |
    public class Main(){
      public static void main(String[] args){
        System.out.println("Bonjour EPFL");
      }
    }
    // le wrapper est préécrit et immodifiable, 
    // mais la personne doit quand même le taper.
    // Au début, il y a un commentaire à la place de la ligne, en mettant
    // ligne à modifier

runtime:
  stdin:
  stdout:
---

### Objectif

Savoir afficher du contenu dans le terminal est une compétence primordial, pour voir ce qu’on est en train de faire, et même parfois pour savoir pourquoi le programme ne fonctionne pas comme on veut (on appelle ça "débugger").

### La consigne

Votre programme doit afficher "Bonjour EPFL" dans le terminal.

### Le cours

En Java, la ligne qui va permettre d’afficher quelque chose est l’instruction suivante :

```java
System.out.println();
```

> Attention, en Java chaquee instruction doit se terminer par un point-virgule ;

Dans les (), on place alors ce qu’on veut afficher. Par exemple, pour afficher Hello word, on peut écrire :

```java
System.out.println("Hello word");
```

Les guillements autour du texte sont importants, car c'est un texte (une suite de caractères). Par contre, pour afficher 1, qui ets un simple nombre, on écrit, sans guillemets :

```java
System.out.println(1);
```

#### Crédits

Cette série a été rédigée par Emmanuel Omont.

---
title: 'Java : Affichage'
description: 'Afficher du contenu dans le terminal.'

code:
  default: >
    public class Main {

      public static void main(String[] args) {

        System.out.println("Hello EPFL"); // affiche "Hello EPFL"

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

![Java logo](https://kinsta.com/wp-content/uploads/2023/01/Java-logo.png)

## Introduction au Java 👨‍💻

Afficher des choses dans le terminal, c’est primordial, pour voir ce qu’on est en train de faire, et même parfois pour savoir pourquoi le programme ne fonctionne pas comme on veut.

### La consigne

Afficher “Bonjour EPFL” dans le terminal.

### Le cours

En Java, la ligne qui va permettre d’afficher quelque chose est l’instruction

```java
System.out.println()
```

Dans les (), on place alors ce qu’on veut afficher. Par exemple, si je veux afficher Hello word, j’écris

```java
System.out.println("Hello word");
```

Attention, comme c’est des lettres, il faut les encadrer de “”, sinon cela ne fonctionne pas. Si je veux afficher 1, qui est simplement un nombre, j’écris

```java
System.out.println(1);
```

Faites bien attention à ne pas oublier le ; à la fin de l’instruction, toutes les instructions en Java doivent se finir ainsi, sinon, il y aura une erreur

#### Crédits

Cette série a été rédigée par Emmanuel Omont.

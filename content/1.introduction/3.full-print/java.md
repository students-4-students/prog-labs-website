---
title: 'Print complet'
description: "Affichez le contenu d'une variable."

code:
  default: |
    import java.util.Scanner;

    class Main {
        public static void main(String[] args){
            // ne faites pas attention à ces deux lignes
            // elles servent à initialiser les variables
            // (voir le cours)
            Scanner scanner = new Scanner(System.in);
            int a = scanner.nextInt();
            
            // complétez le code

        }
    }
  corrected: |
    import java.util.Scanner;

    class Main {
        public static void main(String[] args){
            // ne faites pas attention à ces deux lignes
            // elles servent à initialiser les variables
            // (voir le cours)
            Scanner scanner = new Scanner(System.in);
            int a = scanner.nextInt();
            
            System.out.println(a);
        }
    }

tests:
  - input: '42'
    expectedOutput: '42'
  - input: '256'
    expectedOutput: '256'
---

### Objectif

Nous avons vu comment déclarez des variables, apprenons maintenant comment afficher leur contenu (c’est parfois utile pour comprendre pourquoi un programme ne fonctionne pas comme prévu !).

### Consigne

Affichez le contenu de la variable `a`.

Attention, le code à compléter contient 3 lignes qu'il ne faut pas modifier (`scanner`). Elles servent à donner des valeurs à la variable `a` pour que nous puissions tester automatiquement si votre code fonctionne pour plusieurs valeurs différentes. Ignorez-les pour cette semaine de pré-rentrée, vous verrez ça plus tard :)

### Cours

Pour cela, utilisons l’instruction `System.out.println()` vu rapidement dans le premier exercice. Elle s’utilise comme ceci :

```java
System.out.println("Hello EPFL"); // affiche Hello EPFL
```

Attention, comme nous voulons afficher du texte, il faut les encadrer de guillemets sinon cela ne fonctionne pas. Si on veut afficher 1, qui est simplement un nombre, on écrit simplement :

```java
System.out.println(1); // affiche 1
```

C’est la même chose pour des variables !

```java
String text = "Hello EPFL";

System.out.println(text); // affiche Hello EPFL

int number = 1;

System.out.println(number); // affiche 1
```

> Note : `System.out.println` ajoute automatiquement un saut de ligne après avoir affiché le contenu. Une variante existe, `System.out.print`, qui permet de ne pas ajouter le saut automatiquement (deux `print` simples de suite seront affichés sur la même ligne).

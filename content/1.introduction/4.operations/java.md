---
title: 'Opérations'
description: 'Faites des calculs avec des variables.'

code:
  default: |
    public class Main(){
      public static void main(String[] args){
        // ignorez ces lignes
        // elles servent à initialiser les variables
        Scanner scanner = new Scanner(System.in);
        int nombre1 = scanner.nextInt();
        int nombre2 = scanner.nextInt();
        
        String texte1 = scanner.nextLine();
        String texte2 = scanner.nextLine();

        System.out.println(nombre1 * nombre2);
        // complétez les instructions
        
      }
    }
  corrected: |
    public class Main(){
      public static void main(String[] args){
        // ne faites pas attention à ces deux lignes
        // elles servent à initialiser les variables
        // (voir le cours)
        Scanner scanner = new Scanner(System.in);
        int nombre1 = scanner.nextInt();
        int nombre2 = scanner.nextInt();
        
        String texte1 = scanner.nextLine();
        String texte2 = scanner.nextLine();
        
        System.out.println(nombre1 * nombre2); //on peut aussi stocker le résultat dans une variable intermédiaire
        System.out.println(nombre1 + nombre2); //on peut aussi stocker le résultat dans une variable intermédiaire
        System.out.println(texte1 + texte2); //on peut aussi stocker le résultat dans une variable intermédiaire
      }
    }

tests:
  - input: |
      42
      256
      Hello
      EPFL
    expectedOutput: |-
      10752
      298
      HelloEPFL
  - input: |
      1
      2
      Salut
      EPFL
    expectedOutput: |-
      2
      3
      SalutEPFL
---

### Objectif

Vos programmes à l’EPFL ne se limiteront pas à afficher du contenu dans le terminal… mais serviront à faire des calculs pour vous et pour cela, il est nécessaire de s’intéresser aux opérateurs!

### Consigne

Deux nombres se trouvent dans les variables `nombre1` et `nombre2`.

Affichez à l’aide de `System.out.println`, dans l’ordre :

- le résultat de la multiplication de ces deux nombres
- le résultat de l’addition de ces deux nombres

Deux textes sont stockés dans les variables `texte1` et `texte2`.
Affichez le résultat de la concaténation de ces deux chaînes de caractères

### Cours

Dans ce cours, nous allons voir des opérateurs dit “arithmétiques”, ceux qui renvoient un résultat de même type que les variables sur lesquelles vous les appliquez.

On va commencer par les opérations applicables sont les nombres entiers (les `Integer` en anglais, donc les variables de type `int`). Il en existe 5 principales :

- L’addition (comme en math), avec le signe `+`
- La soustraction (comme en math), avec le signe `-`
- La division entière (arrondie a l’entier inférieur, c’est à dire que 5/3 donne 1), avec le signe `/`
- La multiplication (comme en math), avec le signe `*`
- L’opération modulo (le reste de la division de a par b), dénotée par `%` (très utile pour beaucoup d’algorithmes !)

```java
int a = 19;
int b = 6;

int add = a + b; // vaut 25
int sub = a - b; // vaut 13
int div = a / b; // vaut 3
int mul = a * b; // vaut 114
int mod = a % b; // vaut 1, car 19 = 3*6+1
```

Ensuite, il existe également une opération applicable sur les chaînes de caractères (les textes), qu’on appelle la concaténation. Elle permet de coller les deux chaînes l’une à la suite de l’autre, et elle s’exprime avec l’opérateur `+` (assez intuitif :).

```java
String texteA = "Je suis à ";
String texteB = "l'EPFL";

String texteC = texteA + texteB; //donne "Je suis à l'EPFL"
```

Il existe bien sûr d’autres opérations, que nous ne verrons pas ici !

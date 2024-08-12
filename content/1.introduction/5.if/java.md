---
title: 'Condition IF'
description: 'Faites des calculs conditionnels avec des variables.'

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
            int b = scanner.nextInt();

            // complétez le code
        }
    }
  corrected: |
    import java.util.Scanner;

    public class Main {
        public static void main(String[] args){
            // ne faites pas attention à ces deux lignes
            // elles servent à initialiser les variables
            // (voir le cours)
            Scanner scanner = new Scanner(System.in);
            int a = scanner.nextInt();
            int b = scanner.nextInt();
                
            if (a == b) {
                System.out.println("j'ai tout compris");
            }
        }
    }

tests:
  - input: |
      42
      42
    expectedOutput: |-
      j'ai tout compris
  - input: |
      42
      256
    expectedOutput: ''
---

### Objectif

La grande majorité des algorithmes exécutent du code différent en fonction de calculs précédents (par exemple, si l’heure est 20h, alors on va dormir, sinon on travaille). Ce `si ... sinon ...` s’exprime avec ce qu’on appelle un branchement conditionnel.

### Consigne

Vous disposez de deux nombres stockés dans les variables `a` et `b`. S’ils sont égaux, affichez `j’ai tout compris` dans le terminal.

### Cours

Vous aurez besoin de l’opérateur d’égalité, noté `==`. Il sert à comparer deux variables, pour voir si leur valeur est égale.

```java
int a = 6;
int b = 5;

a == b; // renvoie false
a == (b + 1); // renvoie true
```

Une variante de cet opéarateur est `!=` et permet de vérifier si deux variables sont différentes.

D’autres comparaisons peuvent être effectuées :

```java
a < b; // renvoie false
a >= b; // renvoie true
```

Il est aussi possible de comparer du texte, mais pour une raison que vous découvrirez plus tard, vous devez utiliser **.equals()** et non `==` :

```java
String texte1 = "Vous allez passer la 1ère année !!";
String texte2 = "Vous allez passer la 1ère année !!";

texte1.equals(texte2); // renvoie true
```

Alors, comment utiliser ces conditions ? C’est ici que nous utilisons le `if` :

```java
int a = 6;
int b = 6;

if (a == b) {
    // s'exécute uniquement si a et b sont égaux
    System.out.println("Wow, amazing");
}
```

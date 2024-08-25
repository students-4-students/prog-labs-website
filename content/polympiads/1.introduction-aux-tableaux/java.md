---
title: 'Introduction aux tableaux'
description: 'Créez et manipulez des tableaux.'

code:
  default: |
    import java.util.Scanner;

    class Main { 
        public static void main (String[] args) {
            Scanner sc = new Scanner(System.in);
            int nbElements = sc.nextInt();
            int[] tableau  = new int[nbElements];
            for (int i = 0; i < nbElements; i ++) {
                tableau[i] = sc.nextInt();
            }
            
            int indiceDepart = sc.nextInt();
            int indiceFin    = sc.nextInt();
            
            // Implémentez ce que demande la consigne
            
            for (int i = 0; i < nbElements; i ++) {
                System.out.print(tableau[i]);
                System.out.print(" ");
            }
            System.out.println();
        }
    }
  corrected: |
    import java.util.Scanner;

    class Main { 
        public static void main (String[] args) {
            Scanner sc = new Scanner(System.in);
            int nbElements = sc.nextInt();
            int[] tableau  = new int[nbElements];
            for (int i = 0; i < nbElements; i ++) 
                tableau[i] = sc.nextInt();
            
            int indiceDepart = sc.nextInt();
            int indiceFin    = sc.nextInt();
            
            // Ici, on récupère la valeur
            int valeurDepart = tableau[indiceDepart];
            // On calcule la valeur qu'on souhaite stocker dans le tableau
            int valeurFin = valeurDepart + 1;
            // On la stocke dans le tableau à l'indice de fin
            tableau[indiceFin] = valeurFin;
            // On aurait aussi pu écrire
            // tableau[indiceFin] = tableau[indiceDepart] + 1;
            
            for (int i = 0; i < nbElements; i ++) {
                System.out.print(tableau[i]);
                System.out.print(" ");
            }
            System.out.println();
        }
    }

tests:
  - input: |
      4
      1 2 4 8
      1 3
    expectedOutput: |-
      1 2 4 3
---

### Introduction aux tableaux

Dans cet exercice, nous allons aborder l’un des éléments fondamentaux de l’informatique, les tableaux. Il s’agit d’une structure de données que vous avez déjà rencontré avec les chaînes de caractères, qui sont équivalentes à un tableau de caractère.

Un tableau peut être représenté comme une séquence finie d’éléments. On appelle la taille de ce tableau le nombre d’éléments de celui-ci, et on associe le premier élément à l’indice 0, le second à l’indice 1, etc... Par exemple, la séquence finie [1, 2, 3, 2] est représentée par la table

| Indice | 0   | 1   | 2   | 3   |
| ------ | --- | --- | --- | --- |
| Valeur | 1   | 2   | 3   | 2   |

Ici, on a choisi un tableau de nombres, mais on aurait pu imaginer un tableau de caractères comme [’H’, ‘e’, ‘l’, ‘l’, ‘o’], équivalent à la chaîne "Hello", ou même un tableau contenant d’autres types d’objets. L’intérêt d’un tableau est que ses éléments sont modifiables, et on peut changer la valeur associée à un indice. Voici quelques exemples de syntaxes pour les tableaux

```java
class Main {
    public static void main (String[] args) {
        // créé une variable tableau de type tableau d'entier et de taille 4,
        int[] tableau = new int[4];
        // ici 4 aurait aussi pu être une variable ou une expression
        // On stocke la séquence [1, 2, 3, 2] dans le tableau
        tableau[0] = 1;
        tableau[1] = 2;
        tableau[2] = 3;
        tableau[3] = 2;

        // Pour créer facilement un tableau dont on connaît les éléments, on aurait aussi pu faire
        // int[] tableau = new int[] { 1, 2, 3, 2 };
        // cela est équivalent à stocker la séquence finie [1, 2, 3, 2] dans notre tableau.

        // on peut alors calculer si on le souhaite la somme des deux premières valeurs
        int somme = tableau[0] + tableau[1];
        // on peut alors le stocker dans la quatrième case du tableau
        tableau[3] = somme;
        // notre nouvelle séquence est alors [1, 2, 3, 3]
        // on aurait aussi pu écrire tout sur une seule ligne
        // tableau[3] = tableau[0] + tableau[1];
        // bien sûr, les valeurs 0, 1 et 3 sont arbitraires, on aurait pu utiliser
        // des variables ou des expressions à la place
    }
}
```

### Consigne

Afin de vous familiariser avec les tableaux, on va vous donner un tableau d’entiers dans la variable _tableau_ avec _nbElements_ éléments.

On vous donne aussi deux indices _indiceDepart_ et _indiceFin_. Vous devez remplacer la valeur à l’indice _indiceFin_ par la valeur à l’indice _indiceDepart_, à laquelle vous devez ajouter 1.

### Exemple

Par exemple, si on vous donne comme tableau [ 1, 2, 4, 8 ] et comme indices de départ et indices de fin respectivement 1 et 3, alors votre tableau final doit valoir [ 1, 2, 4, 3 ].

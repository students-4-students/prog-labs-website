---
title: 'Java : EPFL'
description: 'todo '

code:
  default: |
    import java.util.Scanner;

    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            System.out.print("Entrez la hauteur maximale des lettres : ");
            int n = scanner.nextInt();

            for (int i = 0; i < n; i++) {
            
                // print E
                if (i == 0 || i == n - 1 || i == n / 2) {
                    for (int j = 0; j < n; j++) {
                        System.out.print("*");
                    }
                } else {
                    System.out.print("*");
                    for (int j = 1; j < n; j++) {
                        System.out.print(" ");
                    }
                }
                
                System.out.print("  "); // espace entre les lettres
                // print P
                if (i == 0 || i == n / 2) {
                    for (int j = 0; j < n - 2; j++) {
                        System.out.print("*");
                    }
                    System.out.print(" ");
                } else if (i < n / 2) {
                    System.out.print("*");
                    for (int j = 1; j < n - 2; j++) {
                        System.out.print(" ");
                    }
                    System.out.print("*");
                } else {
                    System.out.print("*");
                    for (int j = 1; j < n - 1; j++) {
                        System.out.print(" ");
                    }
                }
                
                System.out.print("  "); // espace entre les lettres
                // print F
                if (i == 0 || i == n / 2) {
                    for (int j = 0; j < n - 1; j++) {
                        System.out.print("*");
                    }
                } else {
                    System.out.print("*");
                    for (int j = 1; j < n - 1; j++) {
                        System.out.print(" ");
                    }
                }
                System.out.print("  "); // espace entre les lettres
                // compléter le L
            }
        }
    }

  corrected: |
    import java.util.Scanner;

    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            System.out.print("Entrez la hauteur maximale des lettres : ");
            int n = scanner.nextInt();

            for (int i = 0; i < n; i++) {
                // print E
                if (i == 0 || i == n - 1 || i == n / 2) {
                    for (int j = 0; j < n; j++) {
                        System.out.print("*");
                    }
                } else {
                    System.out.print("*");
                    for (int j = 1; j < n; j++) {
                        System.out.print(" ");
                    }
                }
                System.out.print("  "); // espace entre les lettres
                // print P
                if (i == 0 || i == n / 2) {
                    for (int j = 0; j < n - 2; j++) {
                        System.out.print("*");
                    }
                    System.out.print(" ");
                } else if (i < n / 2) {
                    System.out.print("*");
                    for (int j = 1; j < n - 2; j++) {
                        System.out.print(" ");
                    }
                    System.out.print("*");
                } else {
                    System.out.print("*");
                    for (int j = 1; j < n - 1; j++) {
                        System.out.print(" ");
                    }
                }
                System.out.print("  ");
                // print F
                if (i == 0 || i == n / 2) {
                    for (int j = 0; j < n - 1; j++) {
                        System.out.print("*");
                    }
                } else {
                    System.out.print("*");
                    for (int j = 1; j < n - 1; j++) {
                        System.out.print(" ");
                    }
                }
                System.out.print("  ");
                // print L
                if (i == n - 1) {
                    for (int j = 0; j < n; j++) {
                        System.out.print("*");
                    }
                } else {
                    System.out.print("*");
                }
                System.out.println();
            }
        }
    }

runtime:
  stdin:
  stdout:
---

### Enoncé

Il existe deux très grande université en Suisse connu à l’échelle internationale sui sont :

l’EPFZ (**École polytechnique fédérale de Zurich)** et l’EPFL (**École polytechnique fédérale de Lausanne).** On vous félicite d’avoir fait le bon choix.

Ceci est le logo de notre chère EPFL

![EPFL logo](https://www.epfl.ch/about/overview/wp-content/uploads/2020/07/logo-epfl.png)

Stylé non ? 

Il le sera plus sur la console, let’s go, on le dessine ensemble.

### Objectif

On vous donnera les 3 premières lettres soit EPF, et vous allez terminer le reste (On sait que vous êtes assez intelligent pour devinez laquelle choisir pour réussir l’exo) 

### Entrées :

**n** (Entier) : la hauteur maximale des lettres

### Exemples de tests :

**Entrées** :

```java
7
```

**Sortie**

```java
*******  *****   ******  *
*        *    *  *       *
*        *    *  *       *
*******  *****   ******  *
*        *       *       *
*        *       *       *
*******  *       *       *******
```
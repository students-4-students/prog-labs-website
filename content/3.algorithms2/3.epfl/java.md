---
title: 'Dessiner EPFL'
description: "Dessinez le logo de l'EPFL dans la console."

code:
  default: |
    import java.util.Scanner;

    class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // n est la hauteur du L
            int n = scanner.nextInt();

            for (int i = 0; i < n; i++) {
                // compléter le dessin du L
            }
        }
    }

  corrected: |
    import java.util.Scanner;

    class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt();

            for (int i = 0; i < n-1; i++) {
                // compléter le dessin du L
                System.out.println("*"); 
            }
            for (int i = 0; i < n; ++i) {
                System.out.print("*");
            }
        }
    }

    // pour aller plus loin, vous pouvez dessiner les lettres EPF !
    import java.util.Scanner;

    class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
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
            }
        }
    }

tests:
  - input: '7'
    expectedOutput: |-
      *
      *
      *
      *
      *
      *
      *******
  - input: '10'
    expectedOutput: |-
      *
      *
      *
      *
      *
      *
      *
      *
      *
      **********
---

![EPFL](/banner/epfl.png)

### Enoncé

Il existe deux très grande université en Suisse connu à l’échelle internationale qui sont :

l’EPFZ (**École polytechnique fédérale de Zurich)** et l’EPFL (**École polytechnique fédérale de Lausanne).** On vous félicite d’avoir fait le bon choix.

Voilà le logo de l’EPFL :

![EPFL](/banner/epfl_logo.png)

Il sera encore plus stylé sur la console, dessinons-le ensemble :)

### Objectif

On vous donne les 3 premières lettres soit EPF, occupez-vous uniquement de dessiner le L manquant.

### Entrées

- **n** (Entier) : la hauteur maximale des lettres

**Exemples de tests :**

Si n = `7`, votre programme doit renvoyer (ne prenez que le L en compte) :

```java
*******  *****   ******  *
*        *    *  *       *
*        *    *  *       *
*******  *****   ******  *
*        *       *       *
*        *       *       *
*******  *       *       *******
```

<details>
  <summary>Indice</summary>
  Qu’est-ce qu’un `L`? c’est `n-1` lignes d’une étoile, puis une ligne de `n` étoiles :)
</details>

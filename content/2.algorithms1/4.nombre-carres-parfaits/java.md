---
title: 'Carrés parfaits'
description: 'Résoudre un problème composé de plusieurs partie'

code:
  default: |
    import java.util.Scanner;

    class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt();
            int count = 0;

            for (int i = 0; i <= n; i++) {
                // à compléter...
            }

            System.out.println(count);   
        }
    }
  corrected: |
    import java.util.Scanner;

    class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt();
            int count = 0;

            for (int i = 0; i <= n; i++) {
                for (int j = 0; j <= i; j++) {
                    if (j * j == i) {
                        count++;
                    }
                }
            }

            System.out.println(count);   
        }
    }

tests:
  - input: '10'
    expectedOutput: '4'
  - input: '100'
    expectedOutput: '11'
---

![Carrés](/banner/carres.png)

### Enoncé

Un nombre est un carré parfait si sa racine carrée est un **entier**.

### Objectif

Ecrivez un programme qui retourne le nombre de carrés parfaits entre 0 et n (inclus).

### Exemple

Si n = 10, alors votre programme doit afficher `4`.

::hint
Utilisez deux boucles for : une pour parcourir les nombres de 0 à n et une autre pour chercher s’il existe une racine entière de ces nombres.
::

---
title: 'Easy Peasy'
description: 'déboggage.'

code:
  default: |
    class Main {
        public static void main(String[] args) {
            for (int i = 1; i < 100; i++) {
                // le modulo "%" renvoit le reste de la division de i par 3
                if (i % 3 == 0) {
                    System.out.println("easy");
                } else if (i % 5 == 0) {
                    System.out.println("peasy");
                } else if (i % 15 == 0) {
                    System.out.println("easy-peasy");
                }
            }
        }
    }

  corrected: |
    // Vérifiez bien l'ordre des conditions !
    // Ici, on verifiait que i était divisible par 3
    // avant d'etre divisible par 15 ! Or si on est
    // divisible par 15 on est necessairement divisible
    // par 3. Le programme affichait donc "easy".

    class Main {
        public static void main(String[] args) {
            for (int i = 1; i < 100; i++) {
                if (i % 15 == 0) {
                    System.out.println("easy-peasy");
                } else if (i % 3 == 0) {
                    System.out.println("easy");
                } else if (i % 5 == 0) {
                    System.out.println("peasy");
                }
            }
        }
    }

tests:
  - input: ''
    expectedOutput: |-
      easy
      peasy
      easy
      easy
      peasy
      easy
      easy-peasy
      easy
      peasy
      easy
      easy
      peasy
      easy
      easy-peasy
      easy
      peasy
      easy
      easy
      peasy
      easy
      easy-peasy
      easy
      peasy
      easy
      easy
      peasy
      easy
      easy-peasy
      easy
      peasy
      easy
      easy
      peasy
      easy
      easy-peasy
      easy
      peasy
      easy
      easy
      peasy
      easy
      easy-peasy
      easy
      peasy
      easy
      easy
---

![Easy Peasy](/banner/easypeasy.png)

### Enoncé

Un exercice souvent donné lors du BA1 est de vous demander de trouver une erreur dans un algorithme. C’est l’objectif de cet exercice.

On cherche a retrouver tous les nombres multiples de 3, 5 et 15 entre 1 et 100 (exclus)

- Si le nombre est multiple de 3 on affiche "easy"
- Si le nombre est multiple de 5 on affiche "peasy"
- Si le nombre est multiple de 15 on affiche "easy-peasy"
- Sinon on affiche rien

### **Exemple**

Si n = 15, le code doit afficher `easy-peasy`.

Si n = 6, le code doit afficher `easy`.

### **Objectif**

Ce code qu’on vous donne doit être corrigé, trouvez cette petite faille.

**Bien sûr, la correction n’est pas unique, deux codes différents peuvent aboutir au même résultat !**

::hint
Attention à l’ordre des conditions ! Si une condition `if` est vérifiée, les `else if` ou `else` qui suivent ne sont pas exécutés, même si leur condition est aussi vérifiée.
::

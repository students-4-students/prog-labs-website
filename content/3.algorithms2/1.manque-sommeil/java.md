---
title: 'Fatigue'
description: 'Adam a-t-il bien dormi ?'

code:
  default: |
    import java.util.Scanner;

    class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt(); // lire la chaine de caractère
            
            // à compléter
        }
    }

  corrected: |
    import java.util.Scanner;

    class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt(); // lire le nombre d'heure de sommeil d'Adam
            if (n == 8) {
                System.out.println("Suffisant");
            } else if (n < 8) {
                System.out.println("Il faut dormir plus");
            } else {
                System.out.println("Bravo !");
            }     
        }
    }

tests:
  - input: '8'
    expectedOutput: 'Suffisant'
  - input: '10'
    expectedOutput: 'Bravo !'
  - input: '6'
    expectedOutput: 'Il faut dormir plus'
---

![Sommeil](/banner/sommeil.png)

### Énoncé

Avant de venir à l’EPFL, Adam a reçu pas mal de conseils de gens expérimentés:

- le travail acharné
- la persévérance
- bien suivre les cours
- faire les séries d’exos
- Faire du sport 🏋️
- **BIEN DORMIIIR**

Adam n’est pas organisé donc il n’a pas réussi le dernier point, ce qui lui couté cher mentalement et physiquement.

### Objectif

Etant donné le nombre **n** d’heures de sommeil d’Adam, vous devez renvoyer si c’est suffisant ou pas.

Si **n** est :

- supérieur à 8 afficher “Bravo !”
- égal à 8 afficher “Suffisant”
- inférieur à 8 afficher “Il faut dormir plus”

::hint
Utilisez un `if`, un `else if`, et un `else`.
::

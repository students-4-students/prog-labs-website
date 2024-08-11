---
title: 'Java : Manque de Sommeil'
description: 'todo'

code:
  default: |
    import java.util.Scanner;

    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt(); // lire la chaine de caractère
            // à compléte 
            }
    }
  corrected: |
    import java.util.Scanner;

    public class Main {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            int n = scanner.nextInt(); // lire le nombre d'heure de sommeil d'Adam
            if(n == 7) {
                System.out.println("Suffisant");
            } else if(n < 7) {
                System.out.println("Il faut dormir plus");
            } else {
                System.out.println("Bien joué !");
            }     
        }
    }

runtime:
  stdin:
  stdout:
---

### Enoncé

Avant de venir à l’EPFL, Adam a reçu pas mal de conseils de gens expérimentés qui ont insisté sur :

- le travail acharné
- la persévérance
- bien suivre les cours
- faire les séries d’exos
- Faire du sport 🏋️
- **BIEN DORMIIIR**

Il n’est pas organisé du coup il n’a pas réussi le dernier point, ceci lui couté cher mentalement et physiquement.

### Objectif

Etant donné le nombre **n** d’heure de sommeil d’Adam, vous devez renvoyez si c’est suffisant ou pas.

Si **n** est :

- \> 7 afficher “Bien joué !”
- = 7 afficher “Suffisant”
- < 7 afficher “Il faut dormir plus”

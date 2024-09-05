---
title: 'Voyageur perdu'
description: 'Aidez un voyageur perdu à trouver le nom de sa destination'

code:
  default: |
    import java.util.Scanner;
    
    class Main { 
        public static void main (String[] args) {
            Scanner sc = new Scanner(System.in);
            int nbArrets = sc.nextInt();
    
            int[] parents = new int[nbArrets];
            for (int i = 0; i < nbArrets; i ++) {
                parents[i] = sc.nextInt();
            }
            
            int nbRestaurants = sc.nextInt();
        
            int[] distancesALArret = new int[nbRestaurants];
            int[] arretDepart = new int[nbRestaurants];
            for (int i = 0; i < nbRestaurants; i ++) {
                distancesALArret[i] = sc.nextInt();
                arretDepart[i] = sc.nextInt();
            }
            
            // Affichez pour chaque requête l'arrêt à une distance distancesALArret[i] de l'arrêt arretDepart[i]
        }
    }
  corrected: |
    import java.util.Scanner;
    
    class Main { 
        public static void main (String[] args) {
            Scanner sc = new Scanner(System.in);
            int nbArrets = sc.nextInt();
    
            int[] parents = new int[nbArrets];
            for (int i = 0; i < nbArrets; i ++) {
                parents[i] = sc.nextInt();
            }
            
            int nbRestaurants = sc.nextInt();
        
            int[] distancesALArret = new int[nbRestaurants];
            int[] arretDepart = new int[nbRestaurants];
            for (int i = 0; i < nbRestaurants; i ++) {
                distancesALArret[i] = sc.nextInt();
                arretDepart[i] = sc.nextInt();
            }
            
            // Pour chaque requête
            for (int i = 0; i < nbRestaurants; i ++) {
                int arretActuel = arretDepart[i];
        
                // On itère distancesALArret[i] fois pour prendre le parent de l'arret actuel, en réduisant à chaque fois la distance de 1
                for (int distance = distancesALArret[i]; distance > 0; distance --) {
                    arretActuel = parents[arretActuel];
                }
        
                System.out.println(arretActuel);
            }
        
            // BONUS
        
            final int MAX_P2K = 20; // la puissance maximale est 2 puissance 20
            int[][] parents_2k = new int[MAX_P2K][nbArrets];
            // On initialise parents_2k[0] qui représente les premiers parents (2 puissance 0 = 1)
            for (int iArret = 0; iArret < nbArrets; iArret ++) {
                parents_2k[0][iArret] = parents[iArret];
            }
        
            // On itère sur chaque puissance de 2 à partir de 2 puissance 1 pour calculer sa table
            for (int iPuissance = 1; iPuissance < MAX_P2K; iPuissance ++) {
                for (int iArret = 0; iArret < nbArrets; iArret ++) {
                    // Le 2 puissance iPuissance arrêt suivant est égal au 2 puissance iPuissance - 1 arrêt de l'arrêt
                    // du 2 puissance iPuissance - 1 arrêt suivant de l'arrêt
                    parents_2k[iPuissance][iArret] = parents_2k[iPuissance - 1][parents_2k[iPuissance - 1][iArret]];
                }
            }
        
            // Pour chaque requête
            for (int i = 0; i < nbRestaurants; i ++) {
                int arretActuel = arretDepart[i];
                int kADecomposer = distancesALArret[i];
            
                for (int iPuissance = 0; iPuissance < MAX_P2K; iPuissance ++) {
                    // Si kADecomposer est impair alors la iPuissance-ème puissance est inclue dans k.
                    if (kADecomposer % 2 == 1) {
                        arretActuel = parents_2k[iPuissance][arretActuel];
                    }
        
                    // On divise kADecomposer pour passer à la puissance suivante
                    kADecomposer /= 2;
                }
        
                System.out.println(arretActuel);
            }
        }
    }

tests:
  - input: |
      4
      0 0 0 1
      2
      2 3
      1 2
    expectedOutput: |-
      0
      0
  - input: |
      10
      0 0 1 2 2 1 5 0 7 7
      10
      2 6
      2 3
      1 7
      1 6
      1 1
      1 8
      1 7
      2 8
      1 7
      1 7
    expectedOutput: |-
      1
      1
      0
      5
      0
      7
      0
      0
      0
      0
---

### Voyageur perdu

Cette fois-ci, nous allons nous intéresser au scénario suivant. Un voyageur vous aborde dans le métro, et, ne comprenant pas le fonctionnement du métro, souhaite savoir quel est le numéro de l'arrêt auquel se trouve un restaurant qui l'intéresse. Cependant, il ne connaît pas grand chose sur cet arrêt, la seule chose qu'il sait est qu'il s'agit d'un arrêt sur le chemin entre un arrêt de départ dont il connaît le numéro, ainsi que la distance à cet arrêt de départ. Cependant, ce voyageur est venu pour tester tous les restaurants de la ville, et il va vous demander de lui répondre à `nbRestaurants` restaurants.

### Consigne

on va vous donner `nbRestaurants` restaurants. Le i-ème d'entre eux se trouve à l'arrêt à une distance `distanceALArret[i]` de l'arrêt `arretDepart[i]`. Vous devez afficher les `nbRestaurants` indices des arrêts où se trouvent les restaurants. Pour ce problème, on supposera que la distance entre un arrêt et son arrêt suivant est 1.

### Exemple

Supposons qu'on ait l'exemple suivant et que `distanceALArret = [2, 1]` et `arretDepart = [3, 2]`

::dark-background
![Tree](/polympiads/tree-metro-polympiads.png)
::

Dans cet exemple, les deux restaurants se situent à la racine, l'arrêt 0.

### Bonus

Le premier code présenté dans la correction est assez lent, seriez-vous capable de trouver une solution qui fonctionne lorsque `nbArrets = 100'000` et `nbRestaurants = 100'000` en utilisant moins de 10'000'000 opérations ?

::hint
Que pouvez-vous dire d'un restaurant à une distance de 2 ? à une distance de 4 ?

#title
Indice n°1
::

::hint
Supposons que vous connaissez pour chaque arrêt l'arrêt à une distance de 2, pouvez-vous calculer rapidement pour chaque arrêt son arrêt à une distance de 4 ? De même avec une distance de 4 et distance de 8 ?

#title
Indice n°2
::

::solution
L'arrêt à une distance de 4 est l'arrêt à une distance de 2 de l'arrêt à une distance de 2. Plus généralement, l'arrêt à une distance qui est une puissance de 2 est l'arrêt à la distance de la puissance de 2 en dessous de l'arrêt à la distance de la puissance de 2 en dessous de l'arrêt.

#title
Solution des indices 1 et 2
::

::hint
On cherche à calculer l'arrêt à une distance de k. Pouvez-vous décomposer k en puissances de 2 et utiliser les outils des indices 1 et 2 pour résoudre ? 

#title
Indice n°3
::

::solution
On peut décomposer un nombre en puissances de 2 (par exemple, 5 = 4 + 1 et 49 = 32 + 16 + 1), et on peut ensuite utiliser les tables des arrêts à des distances de puissance de 2 qu'on sait calculer. On peut juste calculer la table pour les 20 premières puissances. Pour ce qui est de la décomposition, il faut trouver la décomposition en base 2 de k et appliquer les tables de cette décomposition. Par exemple si k vaut 5, on doit utiliser la table à distance 4 et la table à distance 1.

#title
Solution
::
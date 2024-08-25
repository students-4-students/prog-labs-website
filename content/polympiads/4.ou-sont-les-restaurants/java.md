---
title: 'Où sont les restaurants'
description: 'Déterminez les arrêts auquels se trouvent divers restaurants'

code:
  default: |
    import java.util.Scanner;

    class Main {
        public static void main (String[] args) {
            Scanner sc = new Scanner(System.in);
            
            int nbArrets = sc.nextInt();
            int[] durees = new int[nbArrets - 1];
            for (int i = 0; i < durees.length; i ++) {
                durees[i] = sc.nextInt();
            }
            int nbRestaurants = sc.nextInt();
            int[] dureesRestaurants = new int[nbRestaurants];
            for (int i = 0; i < nbRestaurants; i ++) {
                dureesRestaurants[i] = sc.nextInt();
            }
            
            // Complétez le code pour calculer et afficher les arrêts où se trouvent les restaurants
        }
    }
  corrected: |
    import java.util.Scanner;

    class Main {
        public static void main (String[] args) {
            Scanner sc = new Scanner(System.in);
            
            int nbArrets = sc.nextInt();
            int[] durees = new int[nbArrets - 1];
            for (int i = 0; i < durees.length; i ++) {
                durees[i] = sc.nextInt();
            }
            int nbRestaurants = sc.nextInt();
            int[] dureesRestaurants = new int[nbRestaurants];
            for (int i = 0; i < nbRestaurants; i ++) {
                dureesRestaurants[i] = sc.nextInt();
            }
            
            // On calcule la liste des distances aux arrêts comme dans l'exercice précédent.
            // Cette fois-ci, on la stocke au lieu de l'afficher
            int[] dureesAuxArrets = new int[nbArrets - 1];
            for (int i = 0; i < nbArrets - 1; i ++) {
                for (int j = 0; j <= i; j ++) {
                    dureesAuxArrets[i] += durees[j];
                }
            }
            
            // Pour chaque restaurant
            for (int iRestaurant = 0; iRestaurant < nbRestaurants; iRestaurant ++) {
                // Pour chaque arrêt de fin
                for (int iFin = 0; iFin < nbArrets - 1; iFin ++) {
                    // Si c'est le bon arrêt, on l'affiche
                    if (dureesAuxArrets[iFin] == dureesRestaurants[iRestaurant]) {
                        System.out.println(iFin + 1);
                    }
                }
            }

            // Solution et implémentation du bonus

            // On réutilise le code du corrigé du bonus précédent
            int tempsActuel = 0;
            int[] dureesAuxArrets2 = new int[nbArrets - 1];
            for (int iFin = 1; iFin < nbArrets; iFin ++) {
                tempsActuel += durees[iFin - 1];
                
                dureesAuxArrets2[iFin - 1] = tempsActuel;
            }
            
            // Pour chaque restaurant
            for (int iRestaurant = 0; iRestaurant < nbRestaurants; iRestaurant ++) {
                // On va maintenir un intervalle de recherche avec un indice à gauche,
                // Représentant un élément pour lequel on est sûr qu'il est strictement
                // Inférieur à celui qu'on recherche, et avec un indice à droite, représentant
                // Un élément pour lequel on est sûr qu'il est plus grand ou égal.
                // Ensuite, tant qu'il y a un écart supérieur à 1 entre les deux pointeurs
                int iPlusPetit = - 1;
                int iPlusGrandOuEgal = nbArrets - 1;
                while (iPlusGrandOuEgal - iPlusPetit > 1) {
                    // On prend le milieu entre les deux
                    int iMilieu = (iPlusPetit + iPlusGrandOuEgal) / 2;
                    
                    // On évalue s'il est plus grand ou égal ou inférieur et on le stocke dans la bonne variable
                    // En fonction. De cette manière, on divise par deux la taille de notre intervalle comme
                    // On a choisi le milieu.
                    if (dureesAuxArrets2[iMilieu] >= dureesRestaurants[iRestaurant])
                        iPlusGrandOuEgal = iMilieu;
                    else iPlusPetit = iMilieu;
                }
                
                // Or on ne peut diviser qu'au plus log2(nbArrets) fois par deux notre intervalle,
                // Qui vaut environ 20 quand nbArrets <= 100.000, donc notre algorithme est assez rapide.
                
                // Il ne nous reste plus qu'à afficher la bonne valeur, à savoir l'indice plus grand ou égal (+ 1 car on commence avec l'indice 1 et non le 0),
                // Qui sera forcément égal car tous les indices avant sont inférieurs et le tableau.
                // Est strictement croissant, donc tous les indices après sont strictement supérieurs.
                System.out.println(iPlusGrandOuEgal + 1);
            }
        }
    }

tests:
  - input: |
      4
      3 4 2
      3
      7 3 9
    expectedOutput: |-
      2
      1
      3
  - input: |
      10
      1 5 3 8 6 2 8 10 8
      9
      6 17 6 43 33 51 33 51 51 6 6 25 25 51 23 9 1 1 23
    expectedOutput: |-
      2
      4
      2
      8
      7
      9
      7
      9
      9
      2
      2
      6
      6
      9
      5
      3
      1
      1
      5
---

### Enoncé

Notre voyageur est toujours aussi indécis, cependant, son ami lui a conseillé plusieurs très bon restaurants, et lui a indiqué le temps pour rejoindre chacun des restaurants depuis l’arrêt 0. Pouvez-vous aider notre voyageur à calculer le numéro des arrêts en question pour qu’il puisse savoir où se rendre ?

### Consigne

Nous allons utiliser la même modélisation que dans l’exercice précédent. De plus, on vous donnera accès à deux variables `nbRestaurants`, le nombre de restaurants, et `dureesRestaurants`, un tableau d’entier, où chacun d’entre eux représente la durée pour rejoindre le restaurant.

Vous devez afficher `nbRestaurants` entiers, les indices des arrêts associés à chaque restaurant. Ainsi, le premier entier devra être l’identifiant de l’arrêt qu’on peut rejoindre en `dureesRestaurants[0]` minutes depuis le premier arrêt, le second entier sera celui qu’on peut rejoindre en `dureesRestaurants[1]` minutes, etc…

De plus, on vous garanti que l’arrêt spécifique de chaque restaurant existe et que ce ne sera pas l’arrêt 0.

### Exemple

Par exemple, on peut considérer la ligne suivante avec 4 arrêts de métro.

![Graph](/polympiads/graph-metro-polympiads.png)

Son ami lui a transmit 3 restaurants et la liste `dureesRestaurants` est [7, 3, 9]. On peut alors se rendre compte que le premier restaurant est nécessairement à l’arrêt 2, le second à l’arrêt 1 et le dernier au terminus, vous devez donc afficher sur 3 lignes les chiffres 2, 1 et 3. En effet, si on prend l’exemple du premier restaurant, situé à 7 minutes de l’arrêt 0, il ne peut s’agir que de l’arrêt 2, les deux autres arrêts étant respectivement à 3 et 9 minutes de l’arrêt 0.

### Bonus

Le premier code présenté dans la correction est assez lent, seriez-vous capable de trouver une solution qui fonctionne lorsque `nbArrets = 100000` en utilisant moins de 10'000'000 opérations ?

Vous pouvez supposer que vous savez résoudre l'exercice précédent en moins de 1'000'000 d'opérations.

::hint
Que pouvez vous dire de la liste dureesAuxArrets, représentant les mêmes valeurs que celles affichées dans l’exercice précédent ?

#title
Indice n°1
::

::hint
Les valeurs dans la liste `dureesRestaurants` sont strictement croissantes.

#title
Indice n°2
::

::hint
Est-ce que la méthode de rechercher parmi les éléments un par un est la meilleure ?

#title
Indice n°3
::

::hint
Que faites vous lorsque vous cherchez un mot dans un dictionnaire ? Pouvez-vous l’adapter en algorithme ?

#title
Indice n°4
::

::hint
Vous pouvez utiliser une dichotomie sur le tableau de l'exercice précédent.

#title
Solution des indices
::

Afin de réaliser ce bonus, vous pourriez avoir besoin d'utiliser un autre type de boucle, les boucles `while`. Celles-ci peuvent être construites de la manière suivante :

```java
class Main {
    public static void main(String[] args) {
        int i = 2;
        while (i <= 5) { // La boucle while continue tant que cela est vrai
            i += 1;
        }
    }
}
```

Le bloc à l'intérieur de la boucle while continuera d'être lancé tant que sa condition sera vraie. Ici, la boucle while réplique une boucle `for` itérant sur les entiers de 2 à 5.

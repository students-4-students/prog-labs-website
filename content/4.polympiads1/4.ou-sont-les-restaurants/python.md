---
title: 'Où sont les restaurants'
description: 'Déterminez les arrêts auquels se trouvent divers restaurants'

code:
  default: |
    nb_arrets = int(input())
    durees = list(map(int, input().split()))
    nb_restaurants = int(input())
    durees_restaurants = list(map(int, input().split()))

    # Complétez le code pour calculer et afficher les arrêts où se trouvent les restaurants
  corrected: |
    nb_arrets = int(input())
    durees = list(map(int, input().split()))
    nb_restaurants = int(input())
    durees_restaurants = list(map(int, input().split()))

    # On calcule la liste des distances aux arrêts comme dans l'exercice précédent.
    # Cette fois-ci, on la stocke au lieu de l'afficher
    durees_aux_arrets = [0] * (nb_arrets - 1) # On créé une liste de 0 de taille nbArrets - 1
    for i in range(len(durees)):
        for j in range(i + 1):
            durees_aux_arrets[i] += durees[j]
            
    # Pour chaque restaurant
    for i_restaurant in range(nb_restaurants):
        # Pour chaque arrêt de 1 à fin (de 0 à fin - 1, car le tableau de dureesAuxArrets commence par l'arrêt 1)
        for i_fin in range(nb_arrets - 1):
            # Si c'est le bon arrêt, on l'affiche
            if (durees_aux_arrets[i_fin] == durees_restaurants[i_restaurant]):
                print(i_fin + 1) # On ajoute + 1 à cause de la 0-indexation

    # Solution et implémentation du bonus

    # On réutilise le code du corrigé du bonus précédent
    temps_actuel = 0
    durees_aux_arrets = [0] * (nb_arrets - 1)
    for i_fin in range(1, nb_arrets):
        temps_actuel += durees[i_fin - 1]

        durees_aux_arrets[i_fin - 1] = temps_actuel
            
    # Pour chaque restaurant
    for i_restaurant in range(nb_restaurants):
        # On va maintenir un intervalle de recherche avec un indice à gauche,
        # Représentant un élément pour lequel on est sûr qu'il est strictement
        # Inférieur à celui qu'on recherche, et avec un indice à droite, représentant
        # Un élément pour lequel on est sûr qu'il est plus grand ou égal.
        # Ensuite, tant qu'il y a un écart supérieur à 1 entre les deux pointeurs
        i_plus_petit = - 1
        i_plus_grand_ou_egal = nb_arrets - 1
        while (i_plus_grand_ou_egal - i_plus_petit > 1):
            # On prend le milieu entre les deux
            i_milieu = (i_plus_petit + i_plus_grand_ou_egal) // 2
                    
            # On évalue s'il est plus grand ou égal ou inférieur et on le stocke dans la bonne variable
            # En fonction. De cette manière, on divise par deux la taille de notre intervalle comme
            # On a choisi le milieu.
            if (durees_aux_arrets[i_milieu] >= durees_restaurants[i_restaurant]):
                i_plus_grand_ou_egal = i_milieu
            else:
                i_plus_petit = i_milieu
                
        # Or on ne peut diviser qu'au plus log2(nbArrets) fois par deux notre intervalle,
        # Qui vaut environ 20 quand nbArrets <= 100.000, donc notre algorithme est assez rapide.
        
        # Il ne nous reste plus qu'à afficher la bonne valeur, à savoir l'indice plus grand ou égal (+ 1 car on commence avec l'indice 1 et non le 0),
        # Qui sera forcément égal car tous les indices avant sont inférieurs et le tableau.
        # Est strictement croissant, donc tous les indices après sont strictement supérieurs.
        print(i_plus_grand_ou_egal + 1)

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
      19
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

Nous allons utiliser la même modélisation que dans l’exercice précédent. De plus, on vous donnera accès à deux variables nb_restaurants, le nombre de restaurants, et durees_restaurants, un tableau d’entier, où chacun d’entre eux représente la durée pour rejoindre le restaurant.

Vous devez afficher nb_restaurants entiers, les indices des arrêts associés à chaque restaurant. Ainsi, le premier entier devra être l’identifiant de l’arrêt qu’on peut rejoindre en durees_restaurants[0] minutes depuis le premier arrêt, le second entier sera celui qu’on peut rejoindre en durees_restaurants[1] minutes, etc…

De plus, on vous garanti que l’arrêt spécifique de chaque restaurant existe et que ce ne sera pas l’arrêt 0.

### Exemple

Par exemple, on peut considérer la ligne suivante avec 4 arrêts de métro.

::dark-background
![Graph](/polympiads/graph-metro-polympiads.png)
::

Son ami lui a transmit 3 restaurants et la liste durees_restaurants est [7, 3, 9]. On peut alors se rendre compte que le premier restaurant est nécessairement à l’arrêt 2, le second à l’arrêt 1 et le dernier au terminus, vous devez donc afficher sur 3 lignes les chiffres 2, 1 et 3. En effet, si on prend l’exemple du premier restaurant, situé à 7 minutes de l’arrêt 0, il ne peut s’agir que de l’arrêt 2, les deux autres arrêts étant respectivement à 3 et 9 minutes de l’arrêt 0.

### Bonus

Le premier code présenté dans la correction est assez lent, seriez-vous capable de trouver une solution qui fonctionne lorsque `nb_arrets = 100'000` en utilisant moins de 10'000'000 opérations ? _Il est fortement conseillé d'avoir réussi à coder le programme et d'avoir lu la correction de la partie sans bonus avant de l'essayer. Certains indices dépendront de la correction de l'énoncé sans le bonus._

Vous pouvez supposer que vous savez résoudre l'exercice précédent en moins de 1'000'000 d'opérations.

::hint
Que pouvez vous dire de la liste dureesAuxArrets, représentant les mêmes valeurs que celles affichées dans l’exercice précédent ?

#title
Indice n°1
::

::hint
Les valeurs dans la liste `durees_aux_arrets` sont strictement croissantes.

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

::solution
Vous pouvez utiliser une dichotomie sur le tableau de l'exercice précédent.

#title
Solution des indices
::

Afin de réaliser ce bonus, vous pourriez avoir besoin d'utiliser un autre type de boucle, les boucles `while`. Celles-ci peuvent être construites de la manière suivante :

```python
i = 2
while i <= 5: # La boucle while continue tant que cela est vrai
    i += 1
```

Le bloc à l'intérieur de la boucle while continuera d'être lancé tant que sa condition sera vraie. Ici, la boucle while réplique une boucle `for` itérant sur les entiers de 2 à 5.

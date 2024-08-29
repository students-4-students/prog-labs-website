---
title: 'Promenade sur les quais'
description: 'Retrouvez la promenade à partir du temps pour faire le trajet'

code:
  default: |
    nb_arrets = int(input())
    durees = list(map(int, input().split()))
    temps_trajet = int(input())
    
    # Complétez la consigne ici
  corrected: |
    nb_arrets = int(input())
    durees = list(map(int, input().split()))
    temps_trajet = int(input())
    
    # Pour tous les débuts possibles
    for i_gauche in range(nb_arrets - 1):
        # Pour toute les fins possibles
        for i_droite in range(i_gauche + 1, nb_arrets):
            # On calcule le temps de trajet comme dans l'exercice 3.
            temps_entre_gauche_et_droite = 0
            for iArret in range(i_gauche, i_droite):
                temps_entre_gauche_et_droite += durees[iArret]
            
            # Si le temps est correct, on affiche la paire
            if temps_entre_gauche_et_droite == temps_trajet:
                print(i_gauche, i_droite)
    
    # Bonus 1
    # Pour tous les débuts possibles
    for i_gauche in range(nb_arrets - 1):
        # On va calculer le temps de trajet comme dans le bonus de l'exercice 3
        temps_entre_gauche_et_droite = 0
    
        # Pour toute les fins possibles
        for i_droite in range(i_gauche + 1, nb_arrets):
            # On incrémente le temps à partir du temps précédent
            temps_entre_gauche_et_droite += durees[i_droite - 1]
            
            # Si le temps est correct, on affiche la paire
            if temps_entre_gauche_et_droite == temps_trajet:
                print(i_gauche, i_droite)
    
    # Bonus 2 - Voir les indices et les solutions pour une autre explication
    
    i_gauche = 0
    i_droite = 0
    temps_entre_gauche_et_droite = 0
    
    # Tant qu'on a pas atteint l'intervalle [nbArrets - 1; nbArrets - 1]
    while i_gauche < nb_arrets - 1:
        # Si la durée est correct on affiche la paire
        if temps_entre_gauche_et_droite == temps_trajet:
            print(i_gauche, i_droite)
    
        # Si on atteint la droite maximale ou que le temps de trajet de la balade candidate est trop long
        # On passe à l'intervalle [iGauche + 1; iDroite] et on modifie la somme
        if i_droite == nb_arrets - 1 or temps_entre_gauche_et_droite >= temps_trajet:
            i_gauche += 1
            temps_entre_gauche_et_droite -= durees[i_gauche]
        else: # Sinon on passe à l'intervalle [iGauche; iDroite + 1]
            temps_entre_gauche_et_droite += durees[i_droite]
            i_droite += 1

tests:
  - input: |
      4
      3 4 2
      6
    expectedOutput: |-
      1 3
  - input: |
      10
      2 1 5 4 4 3 2 9 2
      27
    expectedOutput: |-
      2 8
---

### Enoncé

Notre voyageur a trouvé dans l’un des nombreux livres faisant office de guide touristique une balade sur les quais qu’il souhaite effectuer. Malheureusement, il a tâché son livre lors d’une pause café récente, et ne parvient plus à retrouver l’endroit sur la carte. Cependant, il a réussi à lire que la balade commençait et se finissait à deux des arrêts d’une ligne de métro, et qu’il faudrait `temps_trajet` minutes pour faire le trajet entre ces deux arrêts. Pouvez-vous l’aider en retrouvant l’arrêt de début et l’arrêt de fin ?

### Consigne

Nous allons utiliser la même modélisation que dans les exercices précédents, et on vous donnera une variable supplémentaire, `temps_trajet` représentant le temps de trajet entre les deux arrêts qu’on cherche.

Vous devez afficher 2 nombres, les indices des deux arrêts. Vous devrez les afficher de sorte à ce que le plus petit soit affiché en premier. Les deux nombres devront être affichés sur une ligne, séparés par un espace. Il est garanti qu’il existe une unique paire satisfaisant cette propriété.

### Exemple

Par exemple, on peut considérer la ligne suivante avec 4 arrêts de métro.

::dark-background
![Graph](/polympiads/graph-metro-polympiads.png)
::

On va supposer que le temps du trajet est de 6 minutes, et on sait alors que le trajet va de l’arrêt 1 à l’arrêt 3, et vous devez afficher "1 3".

### Bonus 1

Le premier code présenté dans la correction est assez lent, seriez-vous capable de trouver une solution qui fonctionne lorsque `nb_arrets = 1'000` en utilisant moins de 10'000'000 opérations ?

### Bonus 2

Le second code qui résout le Bonus 1 est toujours plutôt lent, seriez vous capable de trouver une solution qui fonctionne lorsque `nb_arrets = 100'000` en utilisant moins de 10'000'000 opérations ?

::hint
Que pouvez-vous dire sur un trajet trop long ou trop court ?

#title
Indice n°1
::

::hint
Quels sont les candidats raisonnables pour un trajet solution lorsque le trajet que vous regardez n'est pas la solution ?

#title
Indice n°2
::

::solution
Supposons que le trajet est trop court, alors deux trajets raisonnables sont de lui ajouter l'arrêt juste à droite ou juste à gauche. Dans le cas où il est trop long, on lui retire celui le plus à gauche ou celui le plus à droite.

#title
Solution des deux premiers indices
::

::hint
Pouvez-vous trouver une manière d'utiliser les indices précédents sans jamais repasser par un même trajet ?

#title
Indice n°3
::
::hint
Existe-t-il une manière d'itérer sur une suite de trajets candidats, en s'assurant de ne jamais contredire la propriété précédente ? Si oui, pouvez-vous prouver qu'elle trouvera forcément la solution ?

#title
Indice n°4
::

::solution
Nous allons utiliser une technique classique appelée la technique de la fenêtre glissante. On va supposer qu'on connaît un trajet candidat représenté par l'intervalle [left; right] et son temps de trajet. Si celui-ci est trop court, on va s'intéresser au candidat [left + 1; right], sinon on va s'intéresser au candidat [left; right + 1]. La preuve que cette stratégie trouve toujours la solution est laissée en exercice et si vous pensez l'avoir, n'hésitez pas à venir en discuter avec un membre de Polympiads !

#title
Solution des deux derniers indices
::

---
title: 'Attente à NAS'
description: 'Résoudre un problème composé de plusieurs partie'

code:
  default: |
    # chaine de caractères représentant la queue
    queue = input()

    # à compléter

    for i in range(len(queue)):
        # cette ligne permet de récupérer le caractère actuel
        character_actuel = queue[i]
        
        # que faire si le caractère est * ?
        if character_actuel == "*":
            
        # si le charactère est _ ?
        elif character_actuel == "_":

  corrected: |
    # chaine de caractères représentant la queue
    queue = input()

    # Initialisation du compteur de personnes
    nombre_personnes = 0
    apres_moi = False

    for i in range(len(queue)):
        # cette ligne permet de récupérer le caractère actuel
        character_actuel = queue[i]
        
        # que faire si le caractère est * ?
        if character_actuel == "*":
            apres_moi = True
        # si le charactère est _ ?
        elif character_actuel == "_":
            if apres_moi: nombre_personnes += 1 # equivalent à nombre_personnes = nombre_personnes + 1

    # Estimer le temps d'attente en secondes
    temps_estime_sec = nombre_personnes * 90 # 90 secondes par personnes

    # Convertir le temps d'attente en minutes et secondes
    temps_estime_min = temps_estime_sec // 60 # attention bien faire une division entière ici
    temps_estime_sec = temps_estime_sec % 60

    # Affichage du temps d'attente estimé
    print("Temps d'attente : " + str(temps_estime_min) + " minute(s) et " + str(temps_estime_sec) + " seconde(s).")

tests:
  - input: |
      _ _ _ _ * _ _ _
    expectedOutput: |-
      Temps d'attente : 4 minute(s) et 30 seconde(s).
  - input: |
      _ _ _ _ _ _ *
    expectedOutput: |-
      Temps d'attente : 0 minute(s) et 0 seconde(s).
---

![NAS](/banner/nas.png)

### Enoncé

NAS est un des nombreux food-trucks proche du Rolex. Alors que vous faites la queue à midi, vous souhaitez écrire un algorithme pour estimer le temps d’attente dans la queue.

### Objectif

La queue est représentée par une chaine de caractères comme suit :

`_ _ _ _ * _ _ _`, où `_` représente une personne qui attend, tandis que `*` représente votre position dans la queue. On estime que le temps de la prise d’une commande est d’environ 1 minutes et 30 secondes. Ecrivez un programme qui estime votre temps d’attente.

### Exemple

Pour une queue telle que :

`_ _ _ _ * _ _ _`

Votre programme doit afficher :

`Temps d'attente estimé : 4 minute(s) et 30 seconde(s).`

Pensez donc à effectuer les calculs pour convertir votre résultat en minutes et secondes.

> Attention, notez que le food-truck se trouve à droite. Dans l'exemple ci-dessus, il y a donc 3 personnes devant vous et non 4 !

<details>
  <summary>Indice</summary>
    Cet exercice est difficile !

    Vous pourriez sauvegarder dans une variable de type `boolean` le fait que votre position dans la queue est passée ou non, pour savoir s’il faut ajouter le temps ou non dans la boucle.

    Pour convertir en minutes et secondes, utilisez une division puis l’opérateur modulo, `%`.

</details>

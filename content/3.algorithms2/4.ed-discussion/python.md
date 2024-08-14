---
title: 'ED Discussion'
description: 'Saurez-vous trouver qui a répondu aux plus de questions ?'

code:
  default: |
    # les questions posées par chaque étudiant sont des constantes
    QUESTIONS_POSEES_ARSENE = 5
    QUESTIONS_POSEES_RAOUL = 1
    QUESTIONS_POSEES_GANIMARD = 0
    # les points initiaux sont à 0 au debut
    pointsArsene = 0
    pointsRaoul = 0
    pointsGanimard = 0
    for i in range(7):
        # Jour numéro i
        # Le programme lit les questions disponibles ce jour-ci
        questionsDisponibles = int(input()) # lire le nombre de questions disponibles ce jour là
        allQuestions = questionsDisponibles + QUESTIONS_POSEES_RAOUL + QUESTIONS_POSEES_GANIMARD + QUESTIONS_POSEES_ARSENE
        # à compléter : la gestion de la logique du problème
        
    # à compléter : trouvez l'étudiant avec le plus de point (afficher Raoul par défaut en cas d'égalité)

  corrected: |
    # les questions posées par chaque étudiant sont des constantes
    QUESTIONS_POSEES_ARSENE = 5
    QUESTIONS_POSEES_RAOUL = 1
    QUESTIONS_POSEES_GANIMARD = 0

    # les points initiaux sont à 0 au début
    points_arsene = 0
    points_raoul = 0
    points_ganimard = 0

    for i in range(7):
        # Jour numéro i
        # Le programme lit les questions disponibles ce jour-ci
        questions_disponibles = int(input())  # lire le nombre de questions disponibles ce jour-là
        all_questions = questions_disponibles + QUESTIONS_POSEES_RAOUL + QUESTIONS_POSEES_GANIMARD + QUESTIONS_POSEES_ARSENE
        
        # gestion de la logique
        if i == 0 or i == 4:  # si c'est lundi ou vendredi c'est Ganimard qui répond à toutes les questions
            points_ganimard += all_questions - QUESTIONS_POSEES_GANIMARD
        else:
            # Il existe deux cas : les questions disponibles inférieur à 5 et les questions dispo supérieurs ou égale à 5
            if questions_disponibles < 5:
                # Le cas < 5
                # On sait que Raoul va répondre à 5 questions, la question qui se pose est :
                # Raoul va répondre aux questions de Arsène ou ceux des autres étudiants ?
                # l'énoncé nous dit que Raoul répond aux autres étudiants avant celles de ses amis
                # (Ganimard ne pose pas de questions du coup on ne le compte pas)
                # Si on a moins de 5 questions des autres étudiants, Raoul va répondre à toutes les
                # questions disponibles et quelques questions de Arsène
                # --> Arsène va avoir moins de points négatifs.
                points_arsene -= (5 - questions_disponibles)
                questions_disponibles = 0
            else:
                # Ici, Raoul répond qu'aux questions des autres étudiants
                # Arsène va répondre à toutes ses propres questions
                points_arsene -= 5
                questions_disponibles -= 5
            
            # on est sûr que chaque jour Raoul a +5
            # puisque Arsène pose 5 questions à lui tout seul
            points_raoul += 5
            # ajouter le reste des questions disponibles
            points_arsene += questionsDisponibles
            # Arsène est le seul à répondre aux questions de Raoul si Ganimard ne le fait pas
            points_arsene += QUESTIONS_POSEES_RAOUL

    # trouver l'étudiant avec le plus de points (afficher Raoul par défaut en cas d'égalité)
    if (points_arsene > points_ganimard) and (points_arsene > points_raoul):
        print("Arsene")
    elif (points_ganimard > points_raoul) and (points_ganimard > points_arsene):
        print("Ganimard")
    else:
        print("Raoul")

    # Le but de cet exo est de vous apprendre à bien lire un énoncé aussi long et extraire toutes les
    # informations pertinentes pour résoudre un problème.
    # De plus, le problème vous introduit un outil très utile pendant votre ba1 et votre parcours à l'EPFL en général
    # à savoir Ed Discussion. Soyez actif. Lisez les, répondez et posez des questions quand vous avez le
    # temps, c'est toujours bien et des connaissances de plus.

tests:
  - input: |
      2
      9
      3
      9
      9
      19
      17
    expectedOutput: 'Raoul'
  - input: |
      99
      100
      45
      10
      123
      8
      65
    expectedOutput: 'Ganimard'
  - input: |
      27
      45
      22
      46
      38
      26
      26
    expectedOutput: 'Arsene'
---

![ED](/banner/ed.png)

### Enoncé

Ed Discussion est un site de questions réponses pour les étudiants utilisé ici à l'EPFL pour tous les cours.

Les étudiants posent leurs questions librement, et, les assistants ou les professeurs répondent à ces questions.

Les étudiants peuvent aussi répondre aux questions des autres et c’est même conseillé, ça vous permet d’assimiler mieux le cours et les séries.

Arsène, Ganimard et Raoul sont trois étudiants en IC qui répondent souvent aux questions. Le but de cet exo est de trouver qui a répondu aux plus de questions, cependant il y a quelques règles qu'ils ont posées pour eux-mêmes :

- Si un étudiant répond à une question, il est le seul à pouvoir répondre à cette question et il a +1.
- Si un étudiant pose une question et qu'il répond à sa propre question, il perd -1.
- On ne répond que lorsqu'on est sûr de la réponse, le premier objectif est d'aider autrui et non pas de gagner des points.

De plus on connait la “routine” de nos 3 étudiants :

- Arsène pose 5 questions/jour et il a fait un bot qui répond automatiquement à toutes les questions des autres étudiants (il est malhonnête) même à ses propres questions (C’est le seul qui le fait)
- Raoul répond jusqu’à 5 questions/jour (si disponibles). Il a toujours l'avantage sur Arsène. Il pose 1 question/jour. **Raoul répond aux questions des autres étudiants avant celles de ses amis.**
- Ganimard ne répond que le lundi et le vendredi, mais, répond d'un coup à toutes les questions disponibles (il a toujours l'avantage sur Raoul et Arsène) et ne pose jamais de question.

### Objectif

on va vous donner le nombre de questions disponibles\* chaque jour et le nombre de questions posées par chaque étudiant.

Le but est de trouver qui a le plus de points/semaine, si égalité afficher Raoul par défaut

- \*les questions disponibles n'incluent pas les questions posées par ces 3 étudiants\*\*

### Indice

<details>
  <summary>Indices</summary>
    1. `i` représente le numéro du jour de la semaine… ! `0` est donc Lundi, `1` Mardi, etc.
    2. le 3ème indice est un spoiler, prenez une feuille et un stylo et réfléchissez plus amplement à ce problème (piste : lisez bien l’énoncé, divisez les situations par étudiant, par jour et étudiez les dépendances qui existent entre les différents facteurs de l’exercice…)
    3. Il y a plusieurs cas à gérer :
    - le cas du Lundi et du Vendredi, où Ganimard seulement répond
    - sinon
        - Raoul a chaque jour (=/= Lundi, Vendredi) 5 points. Pourquoi ? son ami Arsène pose chaque jour 5 questions et Raoul a l’avantage sur Arsène (c.-à-d. il répond avant lui), donc il est sur d’avoir les 5 points chaque jour (=/= Lundi, Vendredi) malgré toutes les conditions.
        - dans le cas où le nombre de questions disponibles est inférieur à 5 (dans ce cas Arsène va répondre à une partie de ses propres questions, points négatifs !)
        - dans le cas où le nombre de questions disponibles est plus que 5, alors Arsène va répondre à ses 5 questions (points négatifs !) + le reste (les questions restantes après que Raoul ait répondu sur les 5 questions)  des “questions disponibles” (points positifs !)

</details>

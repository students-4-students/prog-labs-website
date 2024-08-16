---
title: 'ED Discussion'
description: 'Saurez-vous trouver qui a répondu aux plus de questions ?'

code:
  default: |
    #include <iostream>
    using namespace std;

    int main() {
        // Les questions posées par chaque etudiant sont des constantes
        int QUESTIONS_POSEES_LUPIN (5);
        int QUESTIONS_POSEES_RAOUL (1);
        int QUESTIONS_POSEES_GANIMARD (0);
        
        // les points initiaux sont à 0 au debut 
        int pointsLupin (0); 
        int pointsRaoul (0);
        int pointsGanimard (0);
        for (int i (0); i < 7; i++) {
            // Jour numéro i
            // Le programme lit les questions disponibles ce jour-ci
            int questionsDisponibles (0); // lire le nombre de questions disponibles ce jour la
            cin >> questionsDisponibles;
        
            int allQuestions (questionsDisponibles + QUESTIONS_POSEES_RAOUL + QUESTIONS_POSEES_GANIMARD + QUESTIONS_POSEES_LUPIN);
            
            // à compléter la gestion de la logique du problème
            
        }
        
        // a compléter : trouvez l'étudiant avec le plus de point (afficher Raoul par défaut en cas d'égalité)

        return 0;
    }

  corrected: |
    #include <iostream>
    using namespace std;

    int main() {
        // Les questions posées par chaque etudiant sont des constantes
        int QUESTIONS_POSEES_LUPIN (5);
        int QUESTIONS_POSEES_RAOUL (1);
        int QUESTIONS_POSEES_GANIMARD (0);
        
        // les points initiaux sont à 0 au debut 
        int pointsLupin (0); 
        int pointsRaoul (0);
        int pointsGanimard (0);
        for (int i (0); i < 7; i++) {
            // Jour numéro i
            // Le programme lit les questions disponibles ce jour-ci
            int questionsDisponibles (0); // lire le nombre de questions disponibles ce jour la
            cin >> questionsDisponibles;
            int allQuestions (questionsDisponibles + QUESTIONS_POSEES_RAOUL + QUESTIONS_POSEES_GANIMARD + QUESTIONS_POSEES_LUPIN);
            
            // gestion de la logique
        
            if(i == 0 or i == 4) { // si c'est lundi ou vendredi c'est Ganimard qui répond à toutes les questions
                pointsGanimard += allQuestions - QUESTIONS_POSEES_GANIMARD;
            } else {
                // Il existe deux cas : les questions disponibles inférieur à 5 et les questions dispo supérieurs ou égale à 5
                if(questionsDisponibles < 5){
                    // Le cas < 5
                    // On sait que Raoul va répondre à 5 questions, la question qui se pose est  :
                    // Raoul va répondre aux questions de Lupin ou ceux des autres étudiants ?
                    // l'énoncé nous dit que Raoul répond aux autres étudiants avant celles de Raoul
                    // (Ganimard ne pose pas de questions du coup on ne le compte pas) 
                    // Si on a moins de 5 questions des autres étudiants, Raoul va répondre à toutes les
                    // questions disponibles et quelques questions de Lupin 
                    // --> Lupin va avoir moins de points négatifs.
                    pointsLupin -= (5 - questionsDisponibles);
                    questionsDisponibles = 0;
                } else {
                    // Ici, Raoul répond qu'aux questions des autres étudiants
                    // Lupin va répondre a toutes ses propres questions
                    pointsLupin -= 5;
                    questionsDisponibles -= 5;
                }
                // on est sur que chaque jour Raoul a +5, car il y a toujours 5 ou plus questions disponibles 
                // puisque Lupin pose 5 questions à lui tout seul
                pointsRaoul += 5;
                // ajouter le reste des questions disponibles
                pointsLupin += questionsDisponibles;
                // Lupin est le seul à répondre aux questions de Raoul si Ganimard ne le fait pas
                pointsLupin += QUESTIONS_POSEES_RAOUL;
            }
        }
        
        // trouver l'étudiant avec le plus de point (afficher Raoul par défaut en cas d'égalité)
        if (pointsLupin > pointsGanimard and pointsLupin > pointsRaoul) {
            cout << "Lupin" << endl;
        } else if (pointsGanimard > pointsRaoul and pointsGanimard > pointsLupin) {
            cout << "Ganimard" << endl;
        } else {
            cout << "Raoul" << endl;
        }
        
        return 0;
    }

    // Le but de cet exo est de vous apprendre à bien lire un énoncé aussi long et extraire toutes les 
    // informations pertinentes pour résoudre un problème.
    // De plus, le problème vous introduit un outil très utile pendant votre ba1 et votre parcours à l'EPFL en général
    // à savoir Ed Discussion. Soyez actif. Lisez les, répondez et posez des questions quand vous avez le  
    // temps, c'est toujours bien et des connaissances de plus.

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
    expectedOutput: 'Lupin'
---

![ED](/banner/ed.png)

### Enoncé

Ed Discussion est un site de questions réponses pour les étudiants utilisé ici à l'EPFL pour tous les cours.

Les étudiants posent leurs questions librement, et, les assistants ou les professeurs répondent à ces questions.

Les étudiants peuvent aussi répondre aux questions des autres et c’est même conseillé, ça vous permet d’assimiler mieux le cours et les séries.

Lupin, Ganimard et Raoul sont trois amis à l'EPFL qui répondent souvent aux questions. Le but de cet exo est de trouver qui a répondu aux plus de questions, cependant il y a quelques règles qu'ils ont posées pour eux-mêmes :

- Il ne peut y avoir qu'une réponse par question. Chaque réponse rapporte +1 à l'étudiant qui a répondu.
- Si un étudiant pose une question et qu'il répond à sa propre question, il perd -1.
- On ne répond que lorsqu'on est sûr de la réponse, le premier objectif est d'aider autrui et non pas de gagner des points.

De plus on connait la “routine” de nos 3 étudiants :

- Lupin pose 5 questions/jour et il a fait un bot qui répond automatiquement à toutes les questions des autres étudiants (il est malhonnête) même à ses propres questions.
- Raoul répond jusqu’à 5 questions/jour (si disponibles). Il a toujours l'avantage sur Lupin. Il pose 1 question/jour. **Raoul répond aux questions des autres étudiants avant celles de ses amis.** Raoul ne répond jamais à ses propres questions.
- Ganimard ne répond que le lundi et le vendredi, mais, répond d'un coup à toutes les questions disponibles (il a toujours l'avantage sur Raoul et Lupin) et ne pose jamais de question.

### Objectif

Nous allons vous donner le nombre de questions disponibles\* chaque jour et le nombre de questions posées par chaque étudiant.

Le but est de trouver qui a le plus de points/semaine (et si égalité, afficher Raoul par défaut)

- \*les questions disponibles n'incluent pas les questions posées par ces 3 étudiants données dans l'énoncé.

### Indice

<details>
  <summary>Indice 1</summary>
    1. `i` représente le numéro du jour de la semaine… ! `0` est donc Lundi, `1` Mardi, etc.
</details>

<details>
  <summary>Indice 2</summary>
    2. le 3ème indice est un spoiler, prenez une feuille et un stylo et réfléchissez plus amplement à ce problème (piste : lisez bien l’énoncé, divisez les situations par étudiant, par jour et étudiez les dépendances qui existent entre les différents facteurs de l’exercice…)
</details>

<details>
    <summary>Indice 3</summary>
    3. Il y a plusieurs cas à gérer :
    - le cas du Lundi et du Vendredi, où Ganimard seulement répond
    - sinon
        - Raoul a chaque jour (=/= Lundi, Vendredi) 5 points. Pourquoi ? son ami Lupin pose chaque jour 5 questions et Raoul a l’avantage sur Lupin (c.-à-d. il répond avant lui), donc il est sur d’avoir les 5 points chaque jour (=/= Lundi, Vendredi) malgré toutes les conditions.
        - dans le cas où le nombre de questions disponibles est inférieur à 5 (dans ce cas Lupin va répondre à une partie de ses propres questions, points négatifs !)
        - dans le cas où le nombre de questions disponibles est plus que 5, alors Lupin va répondre à ses 5 questions (points négatifs !) + le reste (les questions restantes après que Raoul ait répondu sur les 5 questions)  des “questions disponibles” (points positifs !)
</details>

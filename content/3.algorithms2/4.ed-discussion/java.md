---
title: 'Java : EPFL'
description: 'todo '

code:
  default: |
    import java.util.Scanner;

    public class Main {
        public static void main(String[] args) {
            // Les questions posées par chaque etudiant sont des constantes
            int QUESTIONS_POSEES_RAOUL = 1;
            int QUESTIONS_POSEES_GANIMARD = 0;
            int QUESTIONS_POSEES_ARSENE = 5;
            // les points initilas sont à 0 au debut 
            int pointsRaoul = 0;
            int pointsGanimard = 0;
            int pointsArsene = 0;
            for (int i = 0; i < 7; i++) {
                System.out.println("Jour numéro : " + i);
                System.out.println("Nombre de questions disponibles : ");
                int questionsDisponibles = scanner.nextInt(); // lire le nombre de questions disponibles ce jour la
                int allQuestions = questionsDisponibles + QUESTIONS_POSEES_RAOUL + QUESTIONS_POSEES_GANIMARD + QUESTIONS_POSEES_ARSENE;
                // à compléter la gestion de la logique du problème
                
            }
            // a compléter : trouvez l'étudiant avec le plus de point (afficher Raoul par défaut en cas d'égalité)

        }
    }

  corrected: |
    import java.util.Scanner;

    public class Main {
        public static void main(String[] args) {
            // Les questions posées par chaque etudiant sont des constantes
            int QUESTIONS_POSEES_RAOUL = 1;
            int QUESTIONS_POSEES_GANIMARD = 0;
            int QUESTIONS_POSEES_ARSENE = 5;
            // les points initilas sont à 0 au debut 
            int pointsRaoul = 0;
            int pointsGanimard = 0;
            int pointsArsene = 0;
            for (int i = 0; i < 7; i++) {
                System.out.println("Jour numéro : " + i);
                System.out.println("Nombre de questions disponibles : ");
                int questionsDisponibles = scanner.nextInt(); // lire le nombre de questions disponibles ce jour la
                int allQuestions = questionsDisponibles + QUESTIONS_POSEES_RAOUL + QUESTIONS_POSEES_GANIMARD + QUESTIONS_POSEES_ARSENE;
                 // gestion de la logique

                if(i == 0 || i == 4) { // si c'est lundi ou vendredi c'est Ganimard qui répond à toutes les questions
                    pointsGanimard += allQuestions - QUESTIONS_POSEES_GANIMARD;
                } else {
                // Il existe deux cas : les questions disponibles inférieur à 5 et les questions dispo supérieurs ou égale à 5
                    if(questionsDisponibles < 5){
                        // Le cas < 5
                        // On sait que Raoul va répondre à 5 questions, la question qui se pose est  :
                        // Raoul va répondre aux questions de Arsène ou ceux des autres étudiants ?
                        // l'énoncé nous dit que Raoul répond aux autres étudiants avant celles de Raoul
                        // (Ganimard ne pose pas de questions du coup on ne le compte pas) 
                        // Si on a moins de 5 questions des autres étudiants, Raoul va répondre à toutes les
                        // questions disponibles et quelques questions de Arséne 
                        // --> Arsène va avoir moins de points négatives.
                        pointsArsene -= (5 - questionsDisponibles);
                        questionsDisponibles = 0;
                    }else{
                        // Ici, Raoul répond qu'aux questions des qutres étudiants
                        // Arsène va répondre a toutes ses propres queestions
                        pointsArsene -= 5;
                        questionsDisponibles -= 5;
                    }
                    // on est sur que chaque jour Raoul a +5, car il y a toujours 5 ou plus questions disponibles 
                    // puisque Arsène à lui tout seul pose 5 questions
                    pointsRaoul += 5;
                    // ajouter le reste des questions disponibles
                    pointsArsene += questionsDisponibles;
                    // Arsène est le seul à répondre aux questions de Raoul si Ganimard ne le fait pas
                    pointsArsene += QUESTIONS_POSEES_RAOUL;
        
                }
            }
            // trouver l'étudiant avec le plus de point (afficher Raoul par défaut en cas d'égalité)
            if (pointsArsene > pointsGanimard && pointsArsene > pointsRaoul) {
            System.out.println("Arsene");
            } else if (pointsGanimard > pointsRaoul && pointsGanimard > pointsArsene) {
                System.out.println("Ganimard");
            } else {
                System.out.println("Raoul");
            }

        }
    }    

    // Le but de cet exo est de vous apprendre à bien lire un énoncé aussi long et extraire toutes les 
    // informations pertinentes pour résoudre un problème
    // De plus, le problème vous introduit un outil très utile pendant votre ba1 et votre parcours à l'EPFL en général
    // à savoir Ed Discussion. Soyez actif. Lisez les, répondez aux et posez des, questions quand vous avez le  
    // temps, c'est toujours du bien et des connaissances de plus

runtime:
  stdin:
  stdout:
---

### Enoncé

Ed Discussion est un site de questions réponses pour les étudiants utilisé ici à l'EPFL pour tous les cours.

Les étudiants posent leurs questions librement, et, les assistants ou les professeurs répondent à ces questions.

Les étudiants peuvent aussi répondre aux questions des autres et c’est même conseillé, ca vous permet d’assimiler mieux le cours et les séries.

Arsène, Ganimard et Raoul sont trois étudiants en IC qui répondent souvent aux questions. Le but de cet exo est de trouver qui a répondu le plus de questions, cependant il y a quelques règles qu'ils ont posées pour eux-mêmes :

- Si un étudiant répond à une question, il est le seul à pouvoir répondre à cette question et il a +1.
- Si un étudiant pose une question et qu'il répond à sa propre question, il perd -1.
- On répond que lorsqu'on est sûr de la réponse, le premier objectif est d'aider autrui et non pas de gagner des points.

De plus on connait la “routine” de nos 3 étudiants :

- Arsène pose 5 questions/jour et il a fait un bot qui répond automatiquement à toutes les questions des autres étudiants (il est malhonnête) même à ses propres questions (C’est le seul qui le fait)
- Raoul répond jusqu’à 5 questions/jour (si disponibles). Il a toujours l'avantage sur Arsène. Il pose 1 question/jour. **Raoul répond aux questions des autres étudiants avant celle de ces amis.**
- Ganimard répond que le lundi et le vendredi, mais, répond d'un coup à toutes les questions disponibles (il a toujours l'avantage sur Raoul et Arsène) et ne pose jamais de question.

### Objectif

on va vous donner le nombre de questions disponibles\* chaque jour et le nombre de questions posées par chaque étudiant.

Le but est de trouver qui a le plus de points/semaine, si égalité afficher Raoul par défaut

\*_les questions disponibles n'incluent pas les questions posées par ces 3 étudiants_

### Indice

jour 0 —> Lundi

jour 1 —> Mardi

…

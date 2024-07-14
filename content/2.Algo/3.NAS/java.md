---
title: 'Java : NAS'
description: 'résoudre un problème composé de plusieurs partie'

code:
  default: |
    import java.util.Scanner;

    public class EstimationTempsAttente {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // Chaîne de caractères représentant la queue
            String queue = scanner.nextLine();

        }
    }
  corrected: |
    import java.util.Scanner;

    public class EstimationTempsAttente {

        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // Chaîne de caractères représentant la queue
            String queue = scanner.nextLine();

            // Initialisation du compteur de personnes
            int nombrePersonnes = 0;
            boolean apresMoi = false;

            // Parcours de chaque caractère dans la chaîne queue
            for (int i = 0; i < queue.length(); i++) {
                if (queue.charAt(i) == '-') {
                    apresMoi = true;
                } else if (queue.charAt(i) == '_' && apresMoi) {
                    nombrePersonnes++;
                }
            }

            // Estimer le temps d'attente en secondes
            int tempsEstimeSec = nombrePersonnes * 90;  // 90 secondes par personne

            // Convertir le temps d'attente en minutes et secondes
            int tempsEstimeMin = tempsEstimeSec / 60;
            tempsEstimeSec = tempsEstimeSec % 60;

            // Affichage du temps d'attente estimé
            System.out.println("Temps d'attente estimé : " + tempsEstimeMin + " minutes et " + tempsEstimeSec + " secondes");
        }
    }


runtime:
  stdin:
  stdout:
---

### Enoncé

NAS est un est des nombreux food-trucks prochent du Rolex, alors que vous faites la queue à midi, vous souhaitez écrire un algorithme pour estimer le temps d’attente dans la queue. 

La queue est représentée par une chaine de charactères comme suit,

“_ _ _ _ - _ _ _ ”, oû “_” représente une personne qui attend, tandis que “-” représente votre position dans la queue, on estime le temps de la prise d’une commande comme étant d’environ 1 minutes et 30 secondes, écrivez un programme qui estime votre temps d’attente.


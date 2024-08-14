---
title: 'Attente à NAS'
description: 'Résoudre un problème composé de plusieurs partie'

code:
  default: |
    import java.util.Scanner;

    class EstimationTempsAttente {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // Chaîne de caractères représentant la queue
            String queue = scanner.nextLine();
            
            // à compléter

            for (int i = 0; i < queue.length(); i++) {
                // cette ligne permet de récupérer le caractère actuel
                char characterActuel = queue.charAt(i);
                
                // que faire si le caractère est * ?
                if (characterActuel == '*') {
                
                // si le caractère est _ ?
                } else if (characterActuel == '_') {
                
                }
            }

        }
    }
  corrected: |
    import java.util.Scanner;

    class EstimationTempsAttente {

        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            // Chaîne de caractères représentant la queue
            String queue = scanner.nextLine();

            // Initialisation du compteur de personnes
            int nombrePersonnes = 0;
            boolean apresMoi = false;

            // Parcours de chaque caractère dans la chaîne queue
            for (int i = 0; i < queue.length(); i++) {
                char characterActuel = queue.charAt(i);
                if (characterActuel == '*') {
                    apresMoi = true;
                } else if (characterActuel == '_') {
                    if (apresMoi) nombrePersonnes++;
                }
            }

            // Estimer le temps d'attente en secondes
            int tempsEstimeSec = nombrePersonnes * 90;  // 90 secondes par personne

            // Convertir le temps d'attente en minutes et secondes
            int tempsEstimeMin = tempsEstimeSec / 60;
            tempsEstimeSec = tempsEstimeSec % 60;

            // Affichage du temps d'attente estimé
            System.out.println("Temps d'attente : " + tempsEstimeMin + " minute(s) et " + tempsEstimeSec + " seconde(s).");
        }
    }

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

`Temps d'attente : 4 minute(s) et 30 seconde(s).`

Pensez donc à effectuer les calculs pour convertir votre résultat en minutes et secondes.

> Attention, notez que le food-truck se trouve à droite. Dans l'exemple ci-dessus, il y a donc 3 personnes devant vous et non 4 !

<details>
  <summary>Indice</summary>
    Cet exercice est difficile !

    Vous pourriez sauvegarder dans une variable de type `boolean` le fait que votre position dans la queue est passée ou non, pour savoir s’il faut ajouter le temps ou non dans la boucle.

    Pour convertir en minutes et secondes, utilisez une division puis l’opérateur modulo, `%`.

</details>

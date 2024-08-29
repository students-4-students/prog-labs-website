---
title: 'Erreurs fréquentes'
description: 'Trouvez les problèmes dans le code donné.'

code:
  default: |
    class Main {
        public static void main(String[] args) {
            for (int i = 0; i < 10;) {
                int nombreActuel = "On est au nombre : " + i;
                System.out.println(nombreActuel)
            }
        }
    }
  corrected: |
    /*
    Il y a deux erreurs de compilation, et une erreur dans la conception du programme.
    Le type de `nombreActuel` est mal défini, `String nombreActuel = "On est au nombre : " + i;`.
    Il manque un point-virgule à la fin de l’instruction `println` .
    Le code fourni affiche, sans arrêt, `On est au nombre : 0`. 
    L’erreur est due au fait que l’on ne met pas à jour notre compteur.
    */

    class Main {
        public static void main(String[] args) {
            for (int i = 0; i < 10; i += 1) {
                String nombreActuel = "On est au nombre : " + i;
                System.out.println(nombreActuel);
            }
        }
    }

tests:
  - input: ''
    expectedOutput: |-
      On est au nombre : 0
      On est au nombre : 1
      On est au nombre : 2
      On est au nombre : 3
      On est au nombre : 4
      On est au nombre : 5
      On est au nombre : 6
      On est au nombre : 7
      On est au nombre : 8
      On est au nombre : 9
---

### Objectif

L’objectif est maintenant de vous apprendre à identifier et à corriger des erreurs de syntaxe. Votre réussite en BA1 pour programmation repose principalement sur votre capacité à identifier les problèmes et à les résoudre par vous-mêmes.

### Consigne

Considérez le code suivant, dont le but est d’afficher `On est au nombre : 0` puis `On est au nombre : 1` , etc. pour tous les nombres de 0 à 9.

```java
class Main {
	public static void main(String[] args) {
		for (int i = 0; i < 10;) {
			int nombreActuel = "On est au nombre : " + i;
			System.out.println(nombreActuel)
		}
	}
}
```

Le code fourni compile-t-il ? Si oui, qu’affiche-t-il ? Est-ce le comportement attendu ? Où se trouve alors l’erreur ?

**Attention : il y a au moins 3 erreurs :)**

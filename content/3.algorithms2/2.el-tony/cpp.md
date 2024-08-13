---
title: 'El Tony'
description: 'Saurez-vous trouver une solution optimale... ?'

code:
  default: |
    #include <iostream>
    using namespace std;

    int main() {

        int jourDebut (0); // lire le jour de debut
        cin >> jourDebut;
        int jourFin (0); // lire le jour de fin
        cin >> jourFin;
            
        // à compléter

        return 0;
    }
  corrected: |
    #include <iostream>
    using namespace std;

    int main() {

        int jourDebut (0); // lire le jour de debut
        cin >> jourDebut;
        int jourFin (0); // lire le jour de fin
        cin >> jourFin;
            
        int nbJour (jourFin - jourDebut + 1);
        cout << ((nbJour + 1) * nbJour) / 2 << endl;

        return 0;
    }

    // L’informatique et la programmation
    // ce n'est pas que des boucles for et des conditions
    // il faut savoir utiliser les outils, il y a beaucoup de maths
    // et de logique relié à la programmation,
    // il faut être attentif et trouver a chaque fois
    // le moyen le plus efficace en temps et en mémoire pour résoudre un problème.
    // La programmation c'est avant tout raisonner.

tests:
  - input: |
      3
      5
    expectedOutput: '6'
  - input: |
      1
      1
    expectedOutput: '1'
---

![Maté](/banner/tony.png)

### Enoncé

Tony, étudiant à l'EPFL, est addict aux matés, cette addiction s'accentue de plus en plus pendant la période de révision (mois de Juillet uniquement).

Il boit chaque jour un maté de plus que le nombre de maté qu'il a bu la veille. Il commence par 1 maté le premier jour.

Il veut faire une pyramide de canettes de maté.

Il faut trouver le nombre de maté dans la pyramide de cannettes.

### Exemple

Si `jourDebut` vaut `3` et `jourFin` vaut `5`, alors votre programme doit renvoyer 6 . En effet :

Si on est le jour 1 (le 3 juillet), Tony a bu 1 maté

Si on est le jour 2 (le 4 juillet), Tony a bu 1+1 matés

Si on est le jour 3 (le 5 juillet), Tony a bu 1+1+1 matés.

La pyramide qu’il a pu faire durant la période d’examen

```
    O
  O   O
O   O   O
```

<details>
  <summary>Indice</summary>
  Êtes-vous sûr que la boucle `for` est le meilleur moyen de résoudre ce problème… ?
</details>

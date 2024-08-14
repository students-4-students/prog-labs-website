---
title: 'Temps avant tous les arrêts'
description: 'Calculez la durée pour rejoindre tous les arrêts de la ligne de métro'

code:
  default: |
    #include <vector>
    #include <iostream>
    
    using namespace std;
    
    int main () {
        int nbArrets;
        cin >> nbArrets;
        vector<int> durees(nbArrets - 1);
        for (int i = 0; i < durees.size(); i ++) {
            cin >> durees[i];
        }
    
        // Complétez le code pour calculer et afficher le temps pour atteindre tous les arrêts
    }
  corrected: |
    #include <vector>
    #include <iostream>
    
    using namespace std;
    
    int main () {
        int nbArrets;
        cin >> nbArrets;
        vector<int> durees(nbArrets - 1);
        for (int i = 0; i < durees.size(); i ++) {
            cin >> durees[i];
        }
    
        // Pour chaque fin de trajet
        for (int iFin = 1; iFin < nbArrets; iFin ++) {
            // On calcule le temps de trajet à la fin
            int tempsAFin = 0;
            for (int iArret = 0; iArret < iFin; iArret ++) {
                tempsAFin += durees[iArret];
            }
            
            // On affiche le temps
            cout << tempsAFin << endl;
        }
    
        // BONUS
        
        // Pour chaque fin de trajet
        int tempsAFin = 0;
        for (int iFin = 1; iFin < nbArrets; iFin ++) {
            // On augmente le temps par rapport au temps précédent (voir les indices)
            tempsAFin += durees[iFin - 1];
            
            // On affiche le temps
            cout << tempsAFin << endl;
        }
    }

tests:
  - input: |
      4
      3 4 2
    expectedOutput: |-
      3
      7
      9
  - input: |
      10
      2 1 5 4 4 3 2 9 2
    expectedOutput: |-
      2
      3
      8
      12
      16
      19
      21
      30
      32
---

### Enoncé

Notre voyageur est maintenant indécis, il ne sait pas à quel arrêt il souhaite se rendre. Il souhaite, afin de faire son choix, connaître le temps pour rejoindre chacun des arrêts depuis le premier arrêt. Pouvez-vous l’aider à calculer toutes ces valeurs ?

### Objectif

Nous allons utiliser la même modélisation que dans l’exercice précédent. Vous devrez afficher _nbArrets_ - 1 nombres sur _nbArrets_ - 1 lignes. Le premier d’entre eux doit représenter le temps pour rejoindre le deuxième arrêt. Le second doit représenter le temps pour rejoindre le troisième arrêt, etc...

### Exemple

Par exemple, on peut considérer la ligne suivante avec 4 arrêts de métro.

![Graph](/polympiads/graph-metro-polympiads.png)

Dans ce cas, le tableau donné en entrée est [3, 4, 2], et les temps pour rejoindre les arrêts 1, 2 et 3 sont respectivement 3, 7 et 9 et vous devez donc afficher 3 lignes avec respectivement les chiffres 3, 7 et 9.

### Bonus

Le premier code présenté dans la correction est assez lent, seriez-vous capable de trouver une solution qui fonctionne lorsque _nbArrets = 100'000_ en utilisant moins de 10'000'000 opérations ?

<details>
  <summary>Indice 1</summary>
    Que pouvez vous dire du calcul du temps de trajet entre l’arrêt 0 et l’arrêt iFin ?
</details>
<details>
  <summary>Indice 2</summary>
    Existe-t-il une redondance lors du calcul des temps de trajet ?
</details>
<details>
  <summary>Indice 3</summary>
    Essayez d’exprimer le temps de trajet entre l’arrêt 0 et l’arrêt iFin + 1 à partir de celui entre l’arrêt 0 et l’arrêt iFin ? Que pouvez-vous faire de cette information ?
</details>
<details>
  <summary>Solution des indices</summary>
    Le temps de trajet entre l'arrêt 0 et l'arrêt iFin + 1 est égal au temps de trajet entre l'arrêt 0 et l'arrêt iFin plus le temps de trajet entre l'arrêt iFin et l'arrêt iFin + 1. De cette manière, vous pouvez calculer en une opération le résultat à partir du précédent.
</details>

---
title: 'Distances au centre-ville'
description: 'Calculez des quantités sur des arbres'

code:
  default: |
    #include <iostream>
    #include <vector>
    
    using namespace std;
    
    int main () {
        int nbArrets;
        cin >> nbArrets;
    
        vector<int> parents(nbArrets);
        for (int i = 0; i < nbArrets; i ++) {
            cin >> parents[i];
        }
    
        vector<int> distancesAuxParents (nbArrets);
        for (int i = 0; i < nbArrets; i ++) {
            cin >> distancesAuxParents[i];
        }
        
        // Affichez nbNoeuds nombres, les distances au centre ville.
    }
    
  corrected: |
    #include <iostream>
    #include <vector>
    
    using namespace std;
    
    int main () {
        int nbArrets;
        cin >> nbArrets;
    
        vector<int> parents(nbArrets);
        for (int i = 0; i < nbArrets; i ++) {
            cin >> parents[i];
        }
    
        vector<int> distancesAuxParents (nbArrets);
        for (int i = 0; i < nbArrets; i ++) {
            cin >> distancesAuxParents[i];
        }
        
        // On calcule la distance de la manière suivante, pour tout noeud possédant un parent,
        // La distance au centre est la distance au centre du parent plus la distance au parent
        vector<int> distancesAuCentre (nbArrets);
        for (int iArret = 1; iArret < nbArrets; iArret ++) {
            distancesAuCentre[iArret] = distancesAuCentre[parents[iArret]] + distancesAuxParents[iArret];
        }
    
        for (int iArret = 0; iArret < nbArrets; iArret ++) {
            cout << distancesAuCentre[iArret];
        }
    }
    

tests:
  - input: |
      4
      0 0 0 1
      0 2 3 1
    expectedOutput: |-
      0
      2
      3
      3
  - input: |
      10
      0 0 1 2 2 1 5 0 7 7
      0 2 7 5 5 1 3 3 6 10
    expectedOutput: |-
      0
      2
      9
      14
      14
      3
      6
      3
      9
      13
---

### Distances au centre-ville

Dans cette seconde série, on va représenter notre ligne de métro par un arbre enraciné, où la racine représente le centre-ville et le parent d'un arrêt représente l'arrêt suivant sur le chemin de la ligne.

On vous demande de calculer pour chacun des arrêts sa distance au centre-ville. En plus de vous donner la liste des parents, on vous donnera une seconde liste `distancesAuxParents`, où le i-ème élément représente la distance entre le i-ème arrêt et son parent. Le premier élément n'ayant pas de signification, il vaudra 0. Vous devez afficher `nbArrets` chiffres, les distances au centre-ville, chacun sur une ligne.

### Exemple

Supposons qu'on ait l'exemple suivant et que la liste de distances soit `[0, 2, 3, 1]` :

::dark-background
![Tree](/polympiads/tree-metro-polympiads.png)
::

Vous devez alors afficher quatre lignes, contenant respectivement 0, 2, 3 et 3. 

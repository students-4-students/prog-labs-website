---
title: 'Introduction aux arbres'
description: 'Créez et manipulez des arbres.'

code:
  default: |
    #include <iostream>
    #include <vector>

    using namespace std;

    int main () {
        int nbNoeuds;
        cin >> nbNoeuds;

        vector<int> parents(nbNoeuds);
        for (int i = 0; i < nbNoeuds; i ++) {
            cin >> parents[i];
        }
        
        // Affichez le nombre de feuilles
    }

  corrected: |
    #include <iostream>
    #include <vector>

    using namespace std;

    int main () {
        int nbNoeuds;
        cin >> nbNoeuds;

        vector<int> parents(nbNoeuds);
        for (int i = 0; i < nbNoeuds; i ++) {
            cin >> parents[i];
        }
        
        // On compte pour chaque noeud son nombre de feuille
        vector<int> nombreEnfants(nbNoeuds); // on créé une liste de compteur
        for (int iNoeud = 1; iNoeud < nbNoeuds; iNoeud ++) {
            // On incrémente le compteur du parent
            nombreEnfants[parents[iNoeud]] ++;
        }

        // On compte le nombre de feuilles
        int nombreFeuilles = 0;
        for (int iNoeud = 0; iNoeud < nbNoeuds; iNoeud ++) {
            if (nombreEnfants[iNoeud] == 0) {
                nombreFeuilles ++;
            }
        }

        cout << nombreFeuilles << "\n";
    }

tests:
  - input: |
      4
      0 0 0 1
    expectedOutput: |-
      2
  - input: |
      10
      0 0 1 2 2 1 5 0 7 7
    expectedOutput: |-
      5
---

### Introduction aux arbres

Dans cette série, nous allons nous intéresser à une structure de données qu'on appelle un arbre enraciné. Dans une telle structure, il y a `nbNoeuds` nœuds, numérotés de 0 à `nbNoeuds - 1`. Le premier d'entre eux est appelé la racine, et tous les autres possèdent un parent, auquels ils sont reliés. De plus, on vous assure que le numéro du parent est inférieur au numéro du nœud.

Dans cette série, on vous donnera directement la variable `nbNoeuds`, ainsi qu'un tableau `parents`, où le premier élément du tableau vaut 0, tandis que la i-ème valeur est le numéro du parent du i-ème nœud. Par exemple, voici l'exemple d'un arbre avec son tableau de parents :

::dark-background
![Tree](/polympiads/tree-metro-polympiads.png)
::

| Indice | 0   | 1   | 2   | 3   |
| ------ | --- | --- | --- | --- |
| Valeur | 0   | 0   | 0   | 1   |

### Consigne

Afin de vous familiariser avec les arbres, on va vous demander d'afficher le nombre de feuilles de l'arbre.

Une feuille d'un arbre est un nœud qui ne possède pas d'enfants. Les enfants d'un nœud `i` sont les nœuds possédant dont le parent est `i`.

### Exemple

Par exemple, si on vous donnait l'arbre de l'exemple, il y a 2 feuilles.

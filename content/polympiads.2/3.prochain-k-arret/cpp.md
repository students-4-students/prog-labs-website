---
title: 'Prochain arrêt lointain'
description: 'Calculez des arrêts suivants rapidement'

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
    
        int nbRequetes;
        cin >> nbRequetes;
    
        vector<int> kArretSuivant (nbRequetes);
        vector<int> arretDepart (nbRequetes);
        for (int i = 0; i < nbRequetes; i ++) {
            cin >> kArretSuivant[i] >> arretDepart[i];
        }
        
        // Affichez pour chaque requête le kArretSuivant[i]-ème arrêt suivant de arretDepart[i]
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
    
        int nbRequetes;
        cin >> nbRequetes;
    
        vector<int> kArretSuivant (nbRequetes);
        vector<int> arretDepart (nbRequetes);
        for (int i = 0; i < nbRequetes; i ++) {
            cin >> kArretSuivant[i] >> arretDepart[i];
        }
        
        // Pour chaque requête
        for (int i = 0; i < nbRequetes; i ++) {
            int arretActuel = arretDepart[i];
    
            // On itère kArretSuivant[i] fois pour prendre le parent de l'arret actuel et avancer pour avancer k fois
            for (int iterationActuelle = 0; iterationActuelle < kArretSuivant[i]; iterationActuelle ++) {
                arretActuel = parents[arretActuel];
            }
    
            cout << arretActuel << "\n";
        }
    
        // BONUS
    
        const int MAX_P2K = 20; // la puissance maximale est 2 puissance 20
        vector<vector<int>> parents_2k (MAX_P2K, vector<int>(nbArrets));
        // On initialise parents_2k[0] qui représente les premiers parents (2 puissance 0 = 1)
        for (int iArret = 0; iArret < nbArrets; iArret ++) {
            parents_2k[0][iArret] = parents[iArret];
        }
    
        // On itère sur chaque puissance de 2 à partir de 2 puissance 1 pour calculer sa table
        for (int iPuissance = 1; iPuissance < MAX_P2K; iPuissance ++) {
            for (int iArret = 0; iArret < nbArrets; iArret ++) {
                // Le 2 puissance iPuissance arrêt suivant est égal au 2 puissance iPuissance - 1 arrêt de l'arrêt
                // du 2 puissance iPuissance - 1 arrêt suivant de l'arrêt
                parents_2k[iPuissance][iArret] = parents_2k[iPuissance - 1][parents_2k[iPuissance - 1][iArret]];
            }
        }
    
        // Pour chaque requête
        for (int i = 0; i < nbRequetes; i ++) {
            int arretActuel = arretDepart[i];
            int kADecomposer = kArretSuivant[i];
        
            for (int iPuissance = 0; iPuissance < MAX_P2K; iPuissance ++) {
                // Si kADecomposer est impair alors la iPuissance-ème puissance est inclue dans k.
                if (kADecomposer % 2 == 1) {
                    arretActuel = parents_2k[iPuissance][arretActuel];
                }
    
                // On divise kADecomposer pour passer à la puissance suivante
                kADecomposer /= 2;
            }
    
            cout << arretActuel << "\n";
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
      0 8 8 2 9 5 6 10 4 7
    expectedOutput: |-
      0
      8
      16
      18
      25
      13
      19
      10
      14
      17
---

### Distances au centre-ville

Cette fois-ci, on va vous donner `nbRequetes` requêtes. La i-ème d'entre-elle vous demandera de calculer le `kArretSuivant[i]`-ème arrêt suivant, en partant de l'arrêt `arretDepart[i]`, et de l'afficher sur une ligne.

On défini le k-ème arrêt suivant comme l'arrêt sur le chemin à la racine qui est à une distance k.

### Exemple

Supposons qu'on ait l'exemple suivant et que `kArretSuivant = [2, 1]` et `arretDepart = [3, 2]`

::dark-background
![Tree](/polympiads/tree-metro-polympiads.png)
::

Dans cet exemple, la première requête vous demande de dire le 2-ème prochain arrêt de l'arrêt 3. Il s'agit de l'arrêt 0. La seconde requête vous demande d'afficher l'arrêt 0 par le même raisonnement.

### Bonus

Le premier code présenté dans la correction est assez lent, seriez-vous capable de trouver une solution qui fonctionne lorsque `nbArrets = 100'000` et `nbRequetes = 100'000` en utilisant moins de 10'000'000 opérations ?

::hint
Que pouvez-vous dire du deuxième arrêt suivant ? du quatrième par rapport au deuxième ?

#title
Indice n°1
::

::hint
Supposons que vous connaissez tous les deuxième arrêts suivants, pouvez-vous calculer rapidement tous les quatrièmes arrêts suivant ? De même pour les quatrièmes et les huitièmes ?

#title
Indice n°2
::

::solution
Le quatrième arrêt suivant d'un arrêt est le deuxième arrêt suivant du deuxième arrêt suivant de cet arrêt.

#title
Solution des indices 1 et 2
::

::hint
On cherche à calculer le k arrêt suivant. Pouvez-vous le décomposer en puissances de 2 et utiliser les outils des indices 1 et 2 ? 

#title
Indice n°3
::

::solution
On peut décomposer un nombre en puissances de 2 (par exemple, 5 = 4 + 1 et 49 = 32 + 16 + 1), et après utiliser les tables d'arrêt suivants avec des puissances de 2 qu'on précalcule pour retrouver le k-ème arrêt suivant. Par exemple si on veut trouver le 5-ème arrêt suivant, on récupère le premier arrêt suivant du quatrième arrêt suivant.

#title
Solution
::
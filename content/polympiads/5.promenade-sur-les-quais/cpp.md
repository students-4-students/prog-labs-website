---
title: 'Promenade sur les quais'
description: 'Retrouvez la promenade à partir du temps pour faire le trajet'

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
    
        int tempsTrajet;
        cin >> tempsTrajet;
    
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
    
        int tempsTrajet;
        cin >> tempsTrajet;
    
        // Pour tous les débuts possibles
        for (int iGauche = 0; iGauche < nbArrets - 1; iGauche ++) {
            // Pour toute les fins possibles
            for (int iDroite = iGauche + 1; iDroite < nbArrets; iDroite ++) {
                // On calcule le temps de trajet comme dans l'exercice 3.
                int tempsEntreGaucheEtDroite = 0;
                for (int iArret = iGauche; iArret < iDroite; iArret ++) {
                    tempsEntreGaucheEtDroite += durees[iArret];
                }
                    
                // Si le temps est correct, on affiche la paire
                if (tempsEntreGaucheEtDroite == tempsTrajet) {
                    cout << iGauche << " " << iDroite << endl;
                }
            }
        }
    
        // Bonus 1
        // Pour tous les débuts possibles
        for (int iGauche = 0; iGauche < nbArrets - 1; iGauche ++) {
            // On va calculer le temps de trajet comme dans le bonus de l'exercice 3
            int tempsEntreGaucheEtDroite = 0;
    
            // Pour toute les fins possibles
            for (int iDroite = iGauche + 1; iDroite < nbArrets; iDroite ++) {
                // On incrémente le temps à partir du temps précédent
                tempsEntreGaucheEtDroite += durees[iDroite - 1];
                    
                // Si le temps est correct, on affiche la paire
                if (tempsEntreGaucheEtDroite == tempsTrajet) {
                    cout << iGauche << " " << iDroite;
                }
            }
        }
                
        // Bonus 2 - Voir les indices et les solutions pour une autre explication
    
        int iGauche = 0;
        int iDroite = 0;
        int tempsEntreGaucheEtDroite = 0;
    
        // Tant qu'on a pas atteint l'intervalle [nbArrets - 1; nbArrets - 1]
        while (iGauche < nbArrets - 1) {
            // Si la durée est correct on affiche la paire
            if (tempsEntreGaucheEtDroite == tempsTrajet) {
                cout << iGauche << " " << iDroite;
            }
    
            // Si on atteint la droite maximale ou que le temps de trajet de la balade candidate est trop long
            // On passe à l'intervalle [iGauche + 1; iDroite] et on modifie la somme
            if (iDroite == nbArrets - 1 || tempsEntreGaucheEtDroite >= tempsTrajet) {
                iGauche += 1;
                tempsEntreGaucheEtDroite -= durees[iGauche];
            } else { // Sinon on passe à l'intervalle [iGauche; iDroite + 1]
                tempsEntreGaucheEtDroite += durees[iDroite];
                iDroite += 1;
            }
        }
    }

tests:
  - input: |
      4
      3 4 2
      6
    expectedOutput: |-
      1 3
  - input: |
      10
      2 1 5 4 4 3 2 9 2
      27
    expectedOutput: |-
      2 8
---

### Enoncé

Notre voyageur a trouvé dans l’un des nombreux livres faisant office de guide touristique une balade sur les quais qu’il souhaite effectuer. Malheureusement, il a tâché son livre lors d’une pause café récente, et ne parvient plus à retrouver l’endroit sur la carte. Cependant, il a réussi à lire que la balade commençait  et se finissait à deux des arrêts d’une ligne de métro, et qu’il faudrait _tempsTrajet_ minutes pour faire le trajet entre ces deux arrêts. Pouvez-vous l’aider en retrouvant l’arrêt de début et l’arrêt de fin ?

### Consigne

Nous allons utiliser la même modélisation que dans les exercices précédents, et on vous donnera une variable supplémentaire, _tempsTrajet_ représentant le temps de trajet entre les deux arrêts qu’on cherche.

Vous devez afficher 2 nombres, les indices des deux arrêts. Vous devrez les afficher de sorte à ce que le plus petit soit affiché en premier. Les deux nombres devront être affichés sur une ligne, séparés par un espace. Il est garanti qu’il existe une unique paire satisfaisant cette propriété.

### Exemple

Par exemple, on peut considérer la ligne suivante avec 4 arrêts de métro.

![Graph](/polympiads/graph-metro-polympiads.png)

On va supposer que le temps du trajet est de 6 minutes, et on sait alors que le trajet va de l’arrêt 1 à l’arrêt 3, et vous devez afficher "1 3".

### Bonus 1

Le premier code présenté dans la correction est assez lent, seriez-vous capable de trouver une solution qui fonctionne lorsque _nbArrets = 1'000_ en utilisant moins de 10'000'000 opérations ?

### Bonus 2

Le second code qui résout le Bonus 1 est toujours plutôt lent, seriez vous capable de trouver une solution qui fonctionne lorsque _nbArrets = 100'000_ en utilisant moins de 10'000'000 opérations ?

<details>
  <summary>Indice 1</summary>
    Que pouvez-vous dire sur un trajet trop long ou trop court ?
</details>
<details>
  <summary>Indice 2</summary>
  Quels sont les candidats raisonnables pour un trajet solution lorsque le trajet que vous regardez n'est pas la solution ?
</details>
<details>
  <summary>Solution des deux premiers indices</summary>
    Supposons que le trajet est trop court, alors deux trajets raisonnables sont de lui ajouter l'arrêt juste à droite ou juste à gauche. Dans le cas où il est trop long, on lui retire celui le plus à gauche ou celui le plus à droite.
</details>
<br>
<details>
  <summary>Indice 3</summary>
    Pouvez-vous trouver une manière d'utiliser les indices précédents sans jamais repasser par un même trajet ?
</details>
<details>
  <summary>Indice 4</summary>
    Existe-t-il une manière d'itérer sur une suite de trajets candidats, en s'assurant de ne jamais contredire la propriété précédente ? Si oui, pouvez-vous prouver qu'elle trouvera forcément la solution ?
</details>
<details>
  <summary>Solution des deux derniers indices</summary>
    Nous allons utiliser une technique classique appelée la technique de la fenêtre glissante. On va supposer qu'on connaît un trajet candidat représenté par l'intervalle [left; right] et son temps de trajet. Si celui-ci est trop court, on va s'intéresser au candidat [left + 1; right], sinon on va s'intéresser au candidat [left; right + 1]. La preuve que cette stratégie trouve toujours la solution est laissée en exercice et si vous pensez l'avoir, n'hésitez pas à venir en discuter avec un membre de Polympiads !
</details>
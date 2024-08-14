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
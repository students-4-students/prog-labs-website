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

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
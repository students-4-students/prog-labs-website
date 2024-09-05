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

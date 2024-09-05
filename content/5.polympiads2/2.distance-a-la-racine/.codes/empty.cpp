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

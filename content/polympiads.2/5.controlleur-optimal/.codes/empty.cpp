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

    int nbVoyageurs;
    cin >> nbVoyageurs;

    vector<int> arretDepart (nbVoyageurs);
    vector<int> arretFin (nbVoyageurs);
    for (int i = 0; i < nbVoyageurs; i ++) {
        cin >> arretDepart[i] >> arretFin[i];
    }
    
    // Affichez pour tous les arrêts le nombre de voyageurs qui y passent
}

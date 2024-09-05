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

    int nbRestaurants;
    cin >> nbRestaurants;

    vector<int> distancesALArret (nbRestaurants);
    vector<int> arretDepart (nbRestaurants);
    for (int i = 0; i < nbRestaurants; i ++) {
        cin >> distancesALArret[i] >> arretDepart[i];
    }
    
    // Pour chaque requête
    for (int i = 0; i < nbRestaurants; i ++) {
        int arretActuel = arretDepart[i];

        // On itère distancesALArret[i] fois pour prendre le parent de l'arret actuel, en réduisant à chaque fois la distance de 1
        for (int distance = distancesALArret[i]; distance > 0; distance --) {
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
    for (int i = 0; i < nbRestaurants; i ++) {
        int arretActuel = arretDepart[i];
        int kADecomposer = distancesALArret[i];
    
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

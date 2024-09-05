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
    
    // Affichez pour chaque requête l'arrêt à une distance distancesALArret[i] de l'arrêt arretDepart[i]
}

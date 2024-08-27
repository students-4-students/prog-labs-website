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
    int nbRestaurants;
    cin >> nbRestaurants;
    vector<int> dureesRestaurants(nbRestaurants);
    for (int i = 0; i < nbRestaurants; i ++) {
        cin >> dureesRestaurants[i];
    }

    // Complétez le code pour calculer et afficher les arrêts où se trouvent les restaurants
}
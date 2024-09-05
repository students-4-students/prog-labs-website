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
    
    // Affichez le nombre de feuilles
}

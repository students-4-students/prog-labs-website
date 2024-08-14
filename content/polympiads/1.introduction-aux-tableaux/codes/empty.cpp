#include <iostream>
#include <vector>

using namespace std;

int main () {
    int nbElements;
    cin >> nbElements;

    vector<int> tableau(nbElements);
    for (int iElement = 0; iElement < nbElements; iElement ++) {
        cin >> tableau[iElement];
    }
    
    int indiceDepart, indiceFin;
    cin >> indiceDepart >> indiceFin;

    // Implémentez ce que demande la consigne

    for (int iElement = 0; iElement < nbElements; iElement ++) {
        cout << tableau[iElement] << " ";
    }
}

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

    // Ici, on récupère la valeur
	int valeurDepart = tableau[indiceDepart];
	// On calcule la valeur qu'on souhaite stocker dans le tableau
	int valeurFin = valeurDepart + 1;
	// On la stocke dans le tableau à l'indice de fin
	tableau[indiceFin] = valeurFin;
	// On aurait aussi pu écrire
	// tableau[indiceFin] = tableau[indiceDepart] + 1;

    for (int iElement = 0; iElement < nbElements; iElement ++) {
        cout << tableau[iElement] << " ";
    }
}

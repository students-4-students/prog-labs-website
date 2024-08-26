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

    // On calcule la liste des distances aux arrêts comme dans l'exercice précédent.
	// Cette fois-ci, on la stocke au lieu de l'afficher
	vector<int> dureesAuxArrets (nbArrets - 1);
	for (int i = 0; i < nbArrets - 1; i ++) {
		for (int j = 0; j <= i; j ++) {
			dureesAuxArrets[i] += durees[j];
		}
	}

	// Pour chaque restaurant
	for (int iRestaurant = 0; iRestaurant < nbRestaurants; iRestaurant ++) {
		// Pour chaque arrêt de fin
		for (int iFin = 0; iFin < nbArrets - 1; iFin ++) {
			// Si c'est le bon arrêt, on l'affiche
			if (dureesAuxArrets[iFin] == dureesRestaurants[iRestaurant]) {
				cout << iFin + 1;
			}
		}
	}

	// Solution et implémentation du bonus

	// On réutilise le code du corrigé du bonus précédent
	int tempsActuel = 0;
	vector<int> dureesAuxArrets2 (nbArrets - 1);
	for (int iFin = 1; iFin < nbArrets; iFin ++) {
		tempsActuel += durees[iFin - 1];
			
		dureesAuxArrets2[iFin - 1] = tempsActuel;
	}
		
	// Pour chaque restaurant
	for (int iRestaurant = 0; iRestaurant < nbRestaurants; iRestaurant ++) {
		// On va maintenir un intervalle de recherche avec un indice à gauche,
		// Représentant un élément pour lequel on est sûr qu'il est strictement
		// Inférieur à celui qu'on recherche, et avec un indice à droite, représentant
		// Un élément pour lequel on est sûr qu'il est plus grand ou égal.
		// Ensuite, tant qu'il y a un écart supérieur à 1 entre les deux pointeurs
		int iPlusPetit = - 1;
		int iPlusGrandOuEgal = nbArrets - 1;
		while (iPlusGrandOuEgal - iPlusPetit > 1) {
		  // On prend le milieu entre les deux
			int iMilieu = (iPlusPetit + iPlusGrandOuEgal) / 2;
				
			// On évalue s'il est plus grand ou égal ou inférieur et on le stocke dans la bonne variable
			// En fonction. De cette manière, on divise par deux la taille de notre intervalle comme
			// On a choisi le milieu.
			if (dureesAuxArrets2[iMilieu] >= dureesRestaurants[iRestaurant]) {
				iPlusGrandOuEgal = iMilieu;
			} else {
				iPlusPetit = iMilieu;
			}
		}
			
		// Or on ne peut diviser qu'au plus log2(nbArrets) fois par deux notre intervalle,
		// Qui vaut environ 20 quand nbArrets <= 100.000, donc notre algorithme est assez rapide.
			
		// Il ne nous reste plus qu'à afficher la bonne valeur, à savoir l'indice plus grand ou égal (+ 1 car on commence avec l'indice 1 et non le 0),
		// Qui sera forcément égal car tous les indices avant sont inférieurs et le tableau.
		// Est strictement croissant, donc tous les indices après sont strictement supérieurs.
		cout << iPlusGrandOuEgal + 1;
	}
}
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

    int nbQuestions;
    cin >> nbQuestions;

    vector<int> arretAlice (nbQuestions);
    vector<int> arretBob (nbQuestions);
    for (int i = 0; i < nbQuestions; i ++) {
        cin >> arretAlice[i] >> arretBob[i];
    }

    // On calcule la distance à la racine
    vector<int> distanceRacine (nbArrets);
    for (int iArret = 1; iArret < nbArrets; iArret ++) {
        distanceRacine[iArret] = distanceRacine[parents[iArret]] + 1;
    }
    
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
    for (int i = 0; i < nbQuestions; i ++) {
        int alice = arretAlice[i];
        int bob = arretBob[i];

        // Si la distance à la racine d'alice est inférieure à celle de bob, on les inverse
        // C'est utile pour faciliter la suite du code
        if (distanceRacine[alice] < distanceRacine[bob]) {
            int temp = alice;
            alice = bob;
            bob = temp;
        }

        int kADecomposer = distanceRacine[alice] - distanceRacine[bob];
        for (int iPuissance = 0; iPuissance < MAX_P2K; iPuissance ++) {
            // Si kADecomposer est impair alors la iPuissance-ème puissance est inclue dans k.
            if (kADecomposer % 2 == 1) {
                alice = parents_2k[iPuissance][alice];
            }

            // On divise kADecomposer pour passer à la puissance suivante
            kADecomposer /= 2;
        }

        // Maintenant, Alice et Bob sont à la distance de la racine donc on peut appliquer l'algorithme
        // De recherche en parcourant les puissances de 2
        for (int iPuissance = MAX_P2K - 1; iPuissance >= 0; iPuissance --) {
            if (parents_2k[iPuissance][alice] != parents_2k[iPuissance][bob]) {
                alice = parents_2k[iPuissance][alice];
                bob = parents_2k[iPuissance][bob];
            }
        }

        // Maintenant, alice = bob et il s'agit du résultat ou alice != bob et parents[alice] = parents[bob] et c'est le résultat
        if (alice != bob) {
            alice = parents[alice];
            bob   = parents[bob];
        }

        // Maintenant, alice = bob et il s'agit du résultat
        cout << alice << "\n";
    }
}

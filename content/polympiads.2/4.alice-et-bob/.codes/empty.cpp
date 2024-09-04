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
    
    // Affichez pour chaque question le premier arrêt où Alice et Bob peuvent se rejoindre
}

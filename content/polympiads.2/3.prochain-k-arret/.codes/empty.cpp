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

    int nbRequetes;
    cin >> nbRequetes;

    vector<int> kArretSuivant (nbRequetes);
    vector<int> arretDepart (nbRequetes);
    for (int i = 0; i < nbRequetes; i ++) {
        cin >> kArretSuivant[i] >> arretDepart[i];
    }
    
    // Affichez pour chaque requête le kArretSuivant[i]-ème arrêt suivant de arretDepart[i]
}

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

    int tempsAuTerminus = 0;
	for (int iTrajet = 0; iTrajet < nbArrets - 1; iTrajet ++) {
        tempsAuTerminus += durees[iTrajet];
    }
		
	cout << tempsAuTerminus << "\n";
}
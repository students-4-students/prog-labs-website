import java.util.Scanner;

class Main { 
	public static void main (String[] args) {
		Scanner sc = new Scanner(System.in);
		int nbArrets = sc.nextInt();

		int[] parents = new int[nbArrets];
		for (int i = 0; i < nbArrets; i ++) {
			parents[i] = sc.nextInt();
		}
		
		int nbVoyageurs = sc.nextInt();
	
		int[] arretDebut = new int[nbVoyageurs];
		int[] arretFin = new int[nbVoyageurs];
		for (int i = 0; i < nbVoyageurs; i ++) {
			arretDebut[i] = sc.nextInt();
			arretFin[i] = sc.nextInt();
		}
		
		// On calcule la distance à la racine
		int[] distanceRacine = new int[nbArrets];
		for (int iArret = 1; iArret < nbArrets; iArret ++) {
			distanceRacine[iArret] = distanceRacine[parents[iArret]] + 1;
		}
		
		final int MAX_P2K = 20; // la puissance maximale est 2 puissance 20
		int[][] parents_2k = new int[MAX_P2K][nbArrets];
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
	
		// On créé la liste de poids
		int[] poids = new int[nbArrets];

		// Pour chaque voyageur
		for (int i = 0; i < nbVoyageurs; i ++) {
			int debut = arretDebut[i];
			int fin = arretFin[i];

			// On ajoute 1 en bas des deux chemins
			poids[debut] ++;
			poids[fin] ++;

			// Si la distance à la racine du début est inférieure à celle de la fin, on les inverse
			// C'est utile pour faciliter la suite du code, ça ne change rien
			if (distanceRacine[debut] < distanceRacine[fin]) {
				int temp = debut;
				debut = fin;
				fin = temp;
			}

			int kADecomposer = distanceRacine[debut] - distanceRacine[fin];
			for (int iPuissance = 0; iPuissance < MAX_P2K; iPuissance ++) {
				// Si kADecomposer est impair alors la iPuissance-ème puissance est inclue dans k.
				if (kADecomposer % 2 == 1) {
					debut = parents_2k[iPuissance][debut];
				}

				// On divise kADecomposer pour passer à la puissance suivante
				kADecomposer /= 2;
			}

			// Maintenant, le début et la fin sont à la distance de la racine donc on peut appliquer l'algorithme
			// De recherche en parcourant les puissances de 2
			for (int iPuissance = MAX_P2K - 1; iPuissance >= 0; iPuissance --) {
				if (parents_2k[iPuissance][debut] != parents_2k[iPuissance][fin]) {
					debut = parents_2k[iPuissance][debut];
					fin = parents_2k[iPuissance][fin];
				}
			}

			// Maintenant, début = fin et il s'agit de L ou debut != fin et parents[debut] = parents[fin] et c'est L
			if (debut != fin) {
				debut = parents[debut];
				fin   = parents[fin];
			}

			// On retire 1 sur L
			poids[debut] --;
			// Si le parent de L existe (L != 0), alors on retire 1 au parent de L
			if (debut != 0) {
				poids[parents[debut]] --;
			}
		}

		// On calcule la somme sur le sous arbre
		for (int iArret = nbArrets - 1; iArret >= 1; iArret --) {
			poids[parents[iArret]] += poids[iArret]; // On ajoute la somme du sous arbre à la somme du parent
		}

		for (int iArret = 0; iArret < nbArrets; iArret ++) {
			System.out.println(poids[iArret]);
		}
	}
}
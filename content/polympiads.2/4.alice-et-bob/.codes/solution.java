import java.util.Scanner;

class Main { 
	public static void main (String[] args) {
		Scanner sc = new Scanner(System.in);
		int nbArrets = sc.nextInt();

		int[] parents = new int[nbArrets];
		for (int i = 0; i < nbArrets; i ++) {
			parents[i] = sc.nextInt();
		}
		
		int nbQuestions = sc.nextInt();
	
		int[] arretAlice = new int[nbQuestions];
		int[] arretBob = new int[nbQuestions];
		for (int i = 0; i < nbQuestions; i ++) {
			arretAlice[i] = sc.nextInt();
			arretBob[i] = sc.nextInt();
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
			System.out.println(alice);
		}
	}
}
import java.util.Scanner;

class Main {
	public static void main (String[] args) {
		Scanner sc = new Scanner(System.in);
		
		int nbArrets = sc.nextInt();
		int[] durees = new int[nbArrets - 1];
		for (int i = 0; i < durees.length; i ++) durees[i] = sc.nextInt();
		
		// Pour chaque fin de trajet
		for (int iFin = 1; iFin < nbArrets; iFin ++) {
			// On calcule le temps de trajet à la fin
			int tempsAFin = 0;
			for (int iArret = 0; iArret < iFin; iArret ++) {
				tempsAFin += durees[iArret];
			}
			
			// On affiche le temps
			System.out.println(tempsAFin);
		}

		// BONUS

		// Pour chaque fin de trajet
		int tempsAFin = 0;
		for (int iFin = 1; iFin < nbArrets; iFin ++) {
			// On augmente le temps par rapport au temps précédent (voir les indices)
			tempsAFin += durees[iFin - 1];
			
			// On affiche le temps
			System.out.println(tempsAFin);
		}
	}
}
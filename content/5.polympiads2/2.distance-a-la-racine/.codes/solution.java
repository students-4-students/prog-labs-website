import java.util.Scanner;

class Main { 
	public static void main (String[] args) {
		Scanner sc = new Scanner(System.in);
		int nbArrets = sc.nextInt();

		int[] parents = new int[nbArrets];
		for (int i = 0; i < nbArrets; i ++) {
			parents[i] = sc.nextInt();
		}
		
		int[] distancesAuxParents = new int[nbArrets];
		for (int i = 0; i < nbArrets; i ++) {
			distancesAuxParents[i] = sc.nextInt();
		}
		
		// On calcule la distance de la manière suivante, pour tout noeud possédant un parent,
		// La distance au centre est la distance au centre du parent plus la distance au parent
		int[] distancesAuCentre = new int[nbArrets];
		for (int iArret = 1; iArret < nbArrets; iArret ++) {
			distancesAuCentre[iArret] = distancesAuCentre[parents[iArret]] + distancesAuxParents[iArret];
		}

		for (int iArret = 0; iArret < nbArrets; iArret ++) {
			System.out.println(distancesAuCentre[iArret]);
		}
	}
}
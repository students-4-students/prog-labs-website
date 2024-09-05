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
		
		// Affichez nbArrets nombres, les distances au centre ville.
	}
}
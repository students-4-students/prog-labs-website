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
		
		// Affichez pour chaque question le premier arrêt où Alice et Bob peuvent se rejoindre
	}
}
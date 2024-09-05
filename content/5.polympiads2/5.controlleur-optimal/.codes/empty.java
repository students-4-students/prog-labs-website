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
	
		int[] arretDepart = new int[nbVoyageurs];
		int[] arretFin = new int[nbVoyageurs];
		for (int i = 0; i < nbVoyageurs; i ++) {
			arretDepart[i] = sc.nextInt();
			arretFin[i] = sc.nextInt();
		}
		
		// Affichez pour tous les arrêts le nombre de voyageurs qui y passent
	}
}
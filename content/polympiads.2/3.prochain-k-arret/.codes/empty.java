import java.util.Scanner;

class Main { 
	public static void main (String[] args) {
		Scanner sc = new Scanner(System.in);
		int nbArrets = sc.nextInt();

		int[] parents = new int[nbArrets];
		for (int i = 0; i < nbArrets; i ++) {
			parents[i] = sc.nextInt();
		}
		
		int nbRequetes = sc.nextInt();
	
		int[] kArretSuivant = new int[nbRequetes];
		int[] arretDepart = new int[nbRequetes];
		for (int i = 0; i < nbRequetes; i ++) {
			kArretSuivant[i] = sc.nextInt();
			arretDepart[i] = sc.nextInt();
		}
		
		// Affichez pour chaque requête le kArretSuivant-ème arrêt suivant de arretDepart
	}
}
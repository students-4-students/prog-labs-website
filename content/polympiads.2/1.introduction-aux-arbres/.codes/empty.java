import java.util.Scanner;

class Main { 
	public static void main (String[] args) {
		Scanner sc = new Scanner(System.in);
		int nbNoeuds = sc.nextInt();

		int[] parents = new int[nbNoeuds];
		for (int i = 0; i < nbNoeuds; i ++) {
			parents[i] = sc.nextInt();
		}
		
		// Affichez le nombre de feuilles
	}
}
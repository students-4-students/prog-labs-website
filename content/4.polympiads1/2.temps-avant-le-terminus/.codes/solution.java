import java.util.Scanner;

class Main {
	public static void main (String[] args) {
		Scanner sc = new Scanner(System.in);
		
		int nbArrets = sc.nextInt();
		int[] durees = new int[nbArrets - 1];
		for (int i = 0; i < durees.length; i ++) {
			durees[i] = sc.nextInt();
		}
		
		// On calcule la somme des éléments dans le tableau durees, qui nous donne
		// Le résultat attendu.
		int tempsAuTerminus = 0;
		for (int iTrajet = 0; iTrajet < nbArrets - 1; iTrajet ++) {
			tempsAuTerminus += durees[iTrajet];
		}
		
		System.out.println(tempsAuTerminus);
	}
}
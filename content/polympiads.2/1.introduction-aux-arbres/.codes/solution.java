import java.util.Scanner;

class Main { 
	public static void main (String[] args) {
		Scanner sc = new Scanner(System.in);
		int nbNoeuds = sc.nextInt();

		int[] parents = new int[nbNoeuds];
		for (int i = 0; i < nbNoeuds; i ++) {
			parents[i] = sc.nextInt();
		}
		
		// On compte pour chaque noeud son nombre de feuille
		int[] nombreEnfants = new int[nbNoeuds]; // on créé une liste de compteur
		for (int iNoeud = 1; iNoeud < nbNoeuds; iNoeud ++) {
			// On incrémente le compteur du parent
			nombreEnfants[parents[iNoeud]] ++;
		}
	
		// On compte le nombre de feuilles
		int nombreFeuilles = 0;
		for (int iNoeud = 0; iNoeud < nbNoeuds; iNoeud ++) {
			if (nombreEnfants[iNoeud] == 0) {
				nombreFeuilles ++;
			}
		}
	
		System.out.println(nombreFeuilles);
	}
}
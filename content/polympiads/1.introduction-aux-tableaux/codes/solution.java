import java.util.Scanner;

class Main { 
	public static void main (String[] args) {
		Scanner sc = new Scanner(System.in);
		int nbElements = sc.nextInt();
		int[] tableau  = new int[nbElements];
		for (int i = 0; i < nbElements; i ++) tableau[i] = sc.nextInt();
		
		int indiceDepart = sc.nextInt();
		int indiceFin    = sc.nextInt();
		
		// Ici, on récupère la valeur
		int valeurDepart = tableau[indiceDepart];
		// On calcule la valeur qu'on souhaite stocker dans le tableau
		int valeurFin = valeurDepart + 1;
		// On la stocke dans le tableau à l'indice de fin
		tableau[indiceFin] = valeurFin;
		// On aurait aussi pu écrire
		// tableau[indiceFin] = tableau[indiceDepart] + 1;
		
		for (int i = 0; i < nbElements; i ++) {
			System.out.print(tableau[i]);
			System.out.print(" ");
		}
		System.out.println();
	}
}
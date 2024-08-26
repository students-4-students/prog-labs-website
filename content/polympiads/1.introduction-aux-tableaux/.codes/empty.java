import java.util.Scanner;

class Main { 
	public static void main (String[] args) {
		Scanner sc = new Scanner(System.in);
		int nbElements = sc.nextInt();
		int[] tableau  = new int[nbElements];
		for (int i = 0; i < nbElements; i ++) {
			tableau[i] = sc.nextInt();
		}
		
		int indiceDepart = sc.nextInt();
		int indiceFin    = sc.nextInt();
		
		// Implémentez ce que demande la consigne
		
		for (int i = 0; i < nbElements; i ++) {
			System.out.print(tableau[i]);
			System.out.print(" ");
		}
		System.out.println();
	}
}
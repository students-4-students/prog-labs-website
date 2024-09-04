import java.util.Scanner;

class Main { 
	public static void main (String[] args) {
		Scanner sc = new Scanner(System.in);
		int nbArrets = sc.nextInt();

		int[] parents = new int[nbArrets];
		for (int i = 0; i < nbArrets; i ++) {
			parents[i] = sc.nextInt();
		}
		
		int nbRestaurants = sc.nextInt();
	
		int[] distancesALArret = new int[nbRestaurants];
		int[] arretDepart = new int[nbRestaurants];
		for (int i = 0; i < nbRestaurants; i ++) {
			distancesALArret[i] = sc.nextInt();
			arretDepart[i] = sc.nextInt();
		}
		
		// Affichez pour chaque requête l'arrêt à une distance distancesALArret[i] de l'arrêt arretDepart[i]
	}
}
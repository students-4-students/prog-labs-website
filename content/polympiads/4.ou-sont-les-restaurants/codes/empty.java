import java.util.Scanner;

class Main {
	public static void main (String[] args) {
		Scanner sc = new Scanner(System.in);
		
		int nbArrets = sc.nextInt();
		int[] durees = new int[nbArrets - 1];
		for (int i = 0; i < durees.length; i ++) durees[i] = sc.nextInt();
		int nbRestaurants = sc.nextInt();
		int[] dureesRestaurants = new int[nbRestaurants];
		for (int i = 0; i < nbRestaurants; i ++) dureesRestaurants[i] = sc.nextInt();
		
		// Complétez le code pour calculer et afficher les arrêts où se trouvent les restaurants
	}
}
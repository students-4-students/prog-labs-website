class Main {
    public static void main (String[] args) {
        // créé une variable tableau de type tableau d'entier et de taille 4,
        int[] tableau = new int[4];
        // ici 4 aurait aussi pu être une variable ou une expression
        // On stocke la séquence [1, 2, 3, 2] dans le tableau
        tableau[0] = 1;
        tableau[1] = 2;
        tableau[2] = 3;
        tableau[3] = 2;

        // Pour créer facilement un tableau dont on connaît les éléments, on aurait aussi pu faire
        // int[] tableau = new int[] { 1, 2, 3, 2 };
        // cela est équivalent à stocker la séquence finie [1, 2, 3, 2] dans notre tableau.

        // on peut alors calculer si on le souhaite la somme des deux premières valeurs
        int somme = tableau[0] + tableau[1];
        // on peut alors le stocker dans la quatrième case du tableau
        tableau[3] = somme;
        // notre nouvelle séquence est alors [1, 2, 3, 3]
        // on aurait aussi pu écrire tout sur une seule ligne
        // tableau[3] = tableau[0] + tableau[1];
        // bien sûr, les valeurs 0, 1 et 3 sont arbitraires, on aurait pu utiliser
        // des variables ou des expressions à la place
    }
}
# créé une variable tableau de taille 4 contenant la séquence finie [1, 2, 3, 2]
tableau = [ 1, 2, 3, 2 ]

# on peut alors calculer si on le souhaite la somme des deux premières valeurs
somme = tableau[0] + tableau[1]
# on peut alors le stocker dans la quatrième case du tableau
tableau[3] = somme
# notre nouvelle séquence est alors [1, 2, 3, 3]
# on aurait aussi pu écrire tout sur une seule ligne
# tableau[3] = tableau[0] + tableau[1];
# bien sûr, les valeurs 0, 1 et 3 sont arbitraires, on aurait pu utiliser
# des variables ou des expressions à la place
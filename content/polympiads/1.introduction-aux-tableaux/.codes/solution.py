nb_elements = int(input())
tableau     = list(map(int, input().split()))

indice_depart, indice_fin = list(map(int, input().split()))

# On récupère la valeur de départ
valeur_depart = tableau[indice_depart]

# On calcule la valeur qu'on souhaite stocker dans le tableau
valeur_fin = valeur_depart + 1

# On la stocke dans le tableau à l'indice de fin
tableau[indice_fin] = valeur_fin

# On aurait aussi pu écrire
# tableau[indice_fin] = tableau[indice_depart] + 1

print(*tableau, "")
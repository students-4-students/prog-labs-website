nb_arrets = int(input())
durees = list(map(int, input().split()))

# Pour chaque fin
for i_fin in range(1, nb_arrets - 1):
    # On calcule le temps de trajet à la fin
    temps_a_fin = 0
    for i_arret in range(i_fin): temps_a_fin += durees[i_arret]
    
    # On affiche le temps
    print(temps_a_fin)


# BONUS

nb_arrets = int(input())
durees = list(map(int, input().split()))

temps_a_fin = 0

# Pour chaque fin
for i_fin in range(1, nb_arrets - 1):
    # On augmente le temps par rapport au temps précédent (voir les indices)
    temps_a_fin += durees[i_fin - 1]

    # On affiche le temps
    print(temps_a_fin)
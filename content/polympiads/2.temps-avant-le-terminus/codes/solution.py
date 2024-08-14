nb_arrets = int(input())
durees = list(map(int, input().split()))

# On calcule la somme des éléments dans le tableau durees, qui nous donne
# Le résultat attendu.
temps_au_terminus = 0
for i_arret in range(nb_arrets - 1):
    temps_au_terminus += durees[i_arret]

# On affiche la durée
print(temps_au_terminus)
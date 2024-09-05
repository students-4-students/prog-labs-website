nb_arrets = int(input())
parents = list(map(int, input().split()))
distances_aux_parents = list(map(int, input().split()))

# On calcule la distance de la manière suivante, pour tout noeud possédant un parent,
# La distance au centre est la distance au centre du parent plus la distance au parent
distances_au_centre = [0 for i in range(nb_arrets)]
for i_arret in range(1, nb_arrets):
	distances_au_centre[i_arret] = distances_au_centre[parents[i_arret]] + distances_aux_parents[i_arret]

for i_arret in range(nb_arrets):
	print(distances_au_centre[i_arret])
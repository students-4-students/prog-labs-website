nb_noeuds = int(input())
parents = list(map(int, input().split()))

# On compte pour chaque noeud son nombre de feuille
nombre_enfants = [0 for i in range(nb_noeuds)] # on créé une liste de compteur

for i_noeud in range(1, nb_noeuds):
	# On incrémente le compteur du parent
	nombre_enfants[parents[i_noeud]] += 1

# On compte le nombre de feuilles
nombre_feuilles = 0
for i_noeud in range(nb_noeuds):
	if (nombre_enfants[i_noeud] == 0):
		nombre_feuilles += 1
	
print(nombre_feuilles)
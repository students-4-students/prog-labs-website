nb_arrets = int(input())
durees = list(map(int, input().split()))
nb_restaurants = int(input())
durees_restaurants = list(map(int, input().split()))

# On calcule la liste des distances aux arrêts comme dans l'exercice précédent.
# Cette fois-ci, on la stocke au lieu de l'afficher
durees_aux_arrets = [0] * (nb_arrets - 1) # On créé une liste de 0 de taille nbArrets - 1
for i in range(len(durees)):
	for j in range(i + 1):
		durees_aux_arrets[i] += durees[j]
		
# Pour chaque restaurant
for i_restaurant in range(nb_restaurants):
	# Pour chaque arrêt de 1 à fin (de 0 à fin - 1, car le tableau de dureesAuxArrets commence par l'arrêt 1)
	for i_fin in range(nb_arrets - 1):
		# Si c'est le bon arrêt, on l'affiche
		if (durees_aux_arrets[i_fin] == durees_restaurants[i_restaurant]):
			print(i_fin + 1) # On ajoute + 1 à cause de la 0-indexation

# Solution et implémentation du bonus

# On réutilise le code du corrigé du bonus précédent
temps_actuel = 0
durees_aux_arrets = [0] * (nb_arrets - 1)
for i_fin in range(1, nb_arrets):
	temps_actuel += durees[i_fin - 1]

	durees_aux_arrets[i_fin - 1] = temps_actuel
		
# Pour chaque restaurant
for i_restaurant in range(nb_restaurants):
	# On va maintenir un intervalle de recherche avec un indice à gauche,
	# Représentant un élément pour lequel on est sûr qu'il est strictement
	# Inférieur à celui qu'on recherche, et avec un indice à droite, représentant
	# Un élément pour lequel on est sûr qu'il est plus grand ou égal.
	# Ensuite, tant qu'il y a un écart supérieur à 1 entre les deux pointeurs
	i_plus_petit = - 1
	i_plus_grand_ou_egal = nb_arrets - 1
	while (i_plus_grand_ou_egal - i_plus_petit > 1):
	    # On prend le milieu entre les deux
		i_milieu = (i_plus_petit + i_plus_grand_ou_egal) // 2
				
		# On évalue s'il est plus grand ou égal ou inférieur et on le stocke dans la bonne variable
		# En fonction. De cette manière, on divise par deux la taille de notre intervalle comme
		# On a choisi le milieu.
		if (durees_aux_arrets[i_milieu] >= durees_restaurants[i_restaurant]):
			i_plus_grand_ou_egal = i_milieu
		else:
			i_plus_petit = i_milieu
			
	# Or on ne peut diviser qu'au plus log2(nbArrets) fois par deux notre intervalle,
	# Qui vaut environ 20 quand nbArrets <= 100.000, donc notre algorithme est assez rapide.
	
	# Il ne nous reste plus qu'à afficher la bonne valeur, à savoir l'indice plus grand ou égal (+ 1 car on commence avec l'indice 1 et non le 0),
	# Qui sera forcément égal car tous les indices avant sont inférieurs et le tableau.
	# Est strictement croissant, donc tous les indices après sont strictement supérieurs.
	print(i_plus_grand_ou_egal + 1)
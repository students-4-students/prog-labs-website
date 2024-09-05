nb_arrets = int(input())
parents = list(map(int, input().split()))
nb_voyageurs = int(input())
arret_debut = []
arret_fin = []
for i in range(nb_voyageurs):
    a, b = list(map(int, input().split()))
    arret_debut.append(a)
    arret_fin.append(b)

# On calcule la distance à la racine
distance_racine = [0 for i in range(nb_arrets)]
for i_arret in range(nb_arrets):
	distance_racine[i_arret] = distance_racine[parents[i_arret]] + 1
	
MAX_P2K = 20 # la puissance maximale est 2 puissance 20
parents_2k = [[0 for i_arret in range(nb_arrets)] for i_puissance in range(MAX_P2K)]
# On initialise parents_2k[0] qui représente les premiers parents (2 puissance 0 = 1)
for i_arret in range(nb_arrets):
	parents_2k[0][i_arret] = parents[i_arret]
	
# On itère sur chaque puissance de 2 à partir de 2 puissance 1 pour calculer sa table
for i_puissance in range(1, MAX_P2K):
	for i_arret in range(nb_arrets):
		# Le 2 puissance iPuissance arrêt suivant est égal au 2 puissance iPuissance - 1 arrêt de l'arrêt
		# du 2 puissance iPuissance - 1 arrêt suivant de l'arrêt
		parents_2k[i_puissance][i_arret] = parents_2k[i_puissance - 1][parents_2k[i_puissance - 1][i_arret]]
	
# On créé la liste de poids
poids = [ 0 for i in range(nb_arrets) ]

# Pour chaque voyageur
for i in range(nb_voyageurs):
	debut = arret_debut[i]
	fin = arret_fin[i]

	# On ajoute 1 en bas des deux chemins
	poids[debut] += 1
	poids[fin] += 1

	# Si la distance à la racine du début est inférieure à celle de la fin, on les inverse
	# C'est utile pour faciliter la suite du code, ça ne change rien
	if (distance_racine[debut] < distance_racine[fin]):
		temp = debut
		debut = fin
		fin = temp

	k_a_decomposer = distance_racine[debut] - distance_racine[fin]
	for i_puissance in range(MAX_P2K):
		# Si kADecomposer est impair alors la iPuissance-ème puissance est inclue dans k.
		if (k_a_decomposer % 2 == 1):
			debut = parents_2k[i_puissance][debut]

		# On divise kADecomposer pour passer à la puissance suivante
		k_a_decomposer /= 2

	# Maintenant, le début et la fin sont à la distance de la racine donc on peut appliquer l'algorithme
	# De recherche en parcourant les puissances de 2
	for i_puissance in range(MAX_P2K - 1, -1, -1):
		if (parents_2k[i_puissance][debut] != parents_2k[i_puissance][fin]):
			debut = parents_2k[i_puissance][debut]
			fin = parents_2k[i_puissance][fin]
	
	# Maintenant, début = fin et il s'agit de L ou debut != fin et parents[debut] = parents[fin] et c'est L
	if (debut != fin):
		debut = parents[debut]
		fin   = parents[fin]

	# On retire 1 sur L
	poids[debut] -= 1
	# Si le parent de L existe (L != 0), alors on retire 1 au parent de L
	if (debut != 0):
		poids[parents[debut]] -= 1

		# On calcule la somme sur le sous arbre
for i_arret in range(nb_arrets - 1, 0, -1):
	poids[parents[i_arret]] += poids[i_arret] # On ajoute la somme du sous arbre à la somme du parent

for i_arret in range(nb_arrets):
	print(poids[i_arret])
nb_arrets = int(input())
parents = list(map(int, input().split()))
nb_requetes = int(input())
k_arret_suivant = []
arret_depart = []
for i in range(nb_requetes):
    k, d = list(map(int, input().split()))
    k_arret_suivant.append(k)
    arret_depart.append(d)

# Pour chaque requête
for i in range(nb_requetes):
	arret_actuel = arret_depart[i]
	
	# On itère kArretSuivant[i] fois pour prendre le parent de l'arret actuel et avancer pour avancer k fois
	for iteration_actuelle in range(k_arret_suivant[i]):
		arret_actuel = parents[arret_actuel]
		
	print(arret_actuel)
	
# BONUS
	
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
	
# Pour chaque requête
for i in range(nb_requetes):
	arret_actuel = arret_depart[i]
	k_a_decomposer = k_arret_suivant[i]
		
	for i_puissance in range(MAX_P2K):
		# Si kADecomposer est impair alors la iPuissance-ème puissance est inclue dans k.
		if k_a_decomposer % 2 == 1:
			arret_actuel = parents_2k[i_puissance][arret_actuel]
		# On divise kADecomposer pour passer à la puissance suivante
		k_a_decomposer //= 2
	
	print(arret_actuel)
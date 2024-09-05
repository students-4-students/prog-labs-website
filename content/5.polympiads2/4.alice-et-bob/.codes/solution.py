nb_arrets = int(input())
parents = list(map(int, input().split()))
nb_questions = int(input())
arret_alice = []
arret_bob = []
for i in range(nb_questions):
    a, b = list(map(int, input().split()))
    arret_alice.append(a)
    arret_bob.append(b)

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
	
# Pour chaque requête
for i in range(nb_questions):
	alice = arret_alice[i]
	bob = arret_bob[i]
	
	# Si la distance à la racine d'alice est inférieure à celle de bob, on les inverse
	# C'est utile pour faciliter la suite du code
	if (distance_racine[alice] < distance_racine[bob]):
		temp = alice
		alice = bob
		bob = temp
	
	k_a_decomposer = distance_racine[alice] - distance_racine[bob];
	for i_puissance in range(MAX_P2K):
		# Si kADecomposer est impair alors la iPuissance-ème puissance est inclue dans k.
		if (k_a_decomposer % 2 == 1):
			alice = parents_2k[i_puissance][alice]

		# On divise kADecomposer pour passer à la puissance suivante
		k_a_decomposer /= 2
	
	# Maintenant, Alice et Bob sont à la distance de la racine donc on peut appliquer l'algorithme
	# De recherche en parcourant les puissances de 2
	for i_puissance in range(MAX_P2K - 1, -1, -1):
		if (parents_2k[i_puissance][alice] != parents_2k[i_puissance][bob]):
			alice = parents_2k[i_puissance][alice]
			bob = parents_2k[i_puissance][bob]
	
	# Maintenant, alice = bob et il s'agit du résultat ou alice != bob et parents[alice] = parents[bob] et c'est le résultat
	if (alice != bob):
		alice = parents[alice]
		bob   = parents[bob]
	
	
	# Maintenant, alice = bob et il s'agit du résultat
	print(alice)

nb_arrets = int(input())
parents = list(map(int, input().split()))
nb_restaurants = int(input())
distances_a_l_arret = []
arret_depart = []
for i in range(nb_restaurants):
    k, d = list(map(int, input().split()))
    distances_a_l_arret.append(k)
    arret_depart.append(d)

# Affichez pour chaque requête l'arrêt à une distance distances_a_l_arret[i] de l'arrêt arret_depart[i]
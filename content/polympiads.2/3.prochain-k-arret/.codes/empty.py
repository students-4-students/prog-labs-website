nb_arrets = int(input())
parents = list(map(int, input().split()))
nb_requetes = int(input())
k_arret_suivant = []
arret_depart = []
for i in range(nb_requetes):
    k, d = list(map(int, input().split()))
    k_arret_suivant.append(k)
    arret_depart.append(d)

# Affichez pour chaque requête le k_arret_suivant[i]-ème arrêt suivant de arret_depart[i]
nb_arrets = int(input())
parents = list(map(int, input().split()))
nb_voyageurs = int(input())
arret_depart = []
arret_fin = []
for i in range(nb_voyageurs):
    a, b = list(map(int, input().split()))
    arret_depart.append(a)
    arret_fin.append(b)

# Affichez pour tous les arrêts le nombre de voyageurs qui y passent
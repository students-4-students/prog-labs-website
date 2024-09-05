nb_arrets = int(input())
parents = list(map(int, input().split()))
nb_questions = int(input())
arret_alice = []
arret_bob = []
for i in range(nb_questions):
    a, b = list(map(int, input().split()))
    arret_alice.append(a)
    arret_bob.append(b)

# Affichez pour chaque question le premier arrêt où Alice et Bob peuvent se rejoindre
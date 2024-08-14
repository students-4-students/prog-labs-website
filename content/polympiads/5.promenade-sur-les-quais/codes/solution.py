nb_arrets = int(input())
durees = list(map(int, input().split()))
temps_trajet = int(input())

# Pour tous les débuts possibles
for i_gauche in range(nb_arrets - 1):
    # Pour toute les fins possibles
    for i_droite in range(i_gauche + 1, nb_arrets):
        # On calcule le temps de trajet comme dans l'exercice 3.
        temps_entre_gauche_et_droite = 0
        for iArret in range(i_gauche, i_droite):
            temps_entre_gauche_et_droite += durees[iArret]
        
        # Si le temps est correct, on affiche la paire
        if temps_entre_gauche_et_droite == temps_trajet:
            print(i_gauche, i_droite)

# Bonus 1
# Pour tous les débuts possibles
for i_gauche in range(nb_arrets - 1):
    # On va calculer le temps de trajet comme dans le bonus de l'exercice 3
    temps_entre_gauche_et_droite = 0

    # Pour toute les fins possibles
    for i_droite in range(i_gauche + 1, nb_arrets):
        # On incrémente le temps à partir du temps précédent
        temps_entre_gauche_et_droite += durees[i_droite - 1]
        
        # Si le temps est correct, on affiche la paire
        if temps_entre_gauche_et_droite == temps_trajet:
            print(i_gauche, i_droite)

# Bonus 2 - Voir les indices et les solutions pour une autre explication

i_gauche = 0
i_droite = 0
temps_entre_gauche_et_droite = 0

# Tant qu'on a pas atteint l'intervalle [nbArrets - 1; nbArrets - 1]
while i_gauche < nb_arrets - 1:
    # Si la durée est correct on affiche la paire
    if temps_entre_gauche_et_droite == temps_trajet:
        print(i_gauche, i_droite)

    # Si on atteint la droite maximale ou que le temps de trajet de la balade candidate est trop long
    # On passe à l'intervalle [iGauche + 1; iDroite] et on modifie la somme
    if i_droite == nb_arrets - 1 or temps_entre_gauche_et_droite >= temps_trajet:
        i_gauche += 1
        temps_entre_gauche_et_droite -= durees[i_gauche]
    else: # Sinon on passe à l'intervalle [iGauche; iDroite + 1]
        temps_entre_gauche_et_droite += durees[i_droite]
        i_droite += 1
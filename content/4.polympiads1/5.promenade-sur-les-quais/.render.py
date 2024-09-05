
from renderer import *

import random

def get_renderers():
    return [
        ("cpp", "cpp"),
        ("java", "java"),
        ("python", "py")
    ]

def get_inputs ():
    random.seed(42)

    U = [ random.randint(1, 10) for _ in range(1, 10) ]

    A, B = set(), set()

    for left in range(len(U)):
        for right in range(len(U) + 1):
            if right <= left: continue
            if right - left >= 7: continue

            s = sum(U[left:right])

            if s in A: B.add(s)
            else : A.add(s)
    C = list(A.difference(B))
    assert len(C) != 0
    
    return [
        [
            4,
            [ 3, 4, 2 ],
            6
        ],
        [
            10,
            U,
            random.choice(C)
        ]
    ]
def get_output (input):
    nbArrets, durees, tempsTrajet = input

    # Pour tous les débuts possibles
    for iGauche in range(nbArrets - 1):
        # Pour toute les fins possibles
        for iDroite in range(iGauche + 1, nbArrets):
            # On calcule le temps de trajet comme dans l'exercice 3.
            tempsEntreGaucheEtDroite = 0
            for iArret in range(iGauche, iDroite):
                tempsEntreGaucheEtDroite += durees[iArret]
            
            # Si le temps est correct, on affiche la paire
            if tempsEntreGaucheEtDroite == tempsTrajet:
                return [ (iGauche, iDroite) ]
    return [ (-1, -1) ]

def render_pipeline ( path, renderer, inout ):
    init_render(path)

    lang, ft = renderer

    template = read_file( ".template.md" )
    template = render_variables( template, lang )

    empty_code = yaml_embedding( f".codes/empty.{ft}", 2 )
    sol_code   = yaml_embedding( f".codes/solution.{ft}", 2 )

    template = replace(template, "$$empty_code", empty_code)
    template = replace(template, "$$corrected_code", sol_code)
    
    template = replace(template, "$$inout", inout )

    return template

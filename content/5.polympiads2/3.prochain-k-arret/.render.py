
import random
from renderer import *

def get_renderers():
    return [
        ("cpp", "cpp"),
        ("java", "java"),
        ("python", "py")
    ]

def get_inputs ():
    P = [ 0, 0, 1, 2, 2, 1, 5, 0, 7, 7 ]
    D = [ 0 ] * len(P)
    for i in range(1, len(P)):
        D[i] = D[P[i]] + 1

    Q = 10
    U = [ random.randint(1, len(P) - 1) for _ in range(Q) ]
    V = [ random.randint( 1, D[u] ) for u in U ]

    return [
        [
            4,
            [ 0, 0, 0, 1 ],
            2,
            [ 2, 3 ],
            [ 1, 2 ]
        ],
        [
            10,
            [ 0, 0, 1, 2, 2, 1, 5, 0, 7, 7 ],
            Q,
        ] + [(u, v) for (u, v) in zip(V, U)]
    ]
def get_output (input):
    nbNoeuds, parents, Q, *args = input

    F = lambda f, x, n: x if n == 0 else f(f, parents[x], n - 1)
    
    return [ F(F, n, d) for d, n in args ]

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

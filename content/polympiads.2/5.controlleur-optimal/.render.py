
import random
from renderer import *

def get_renderers():
    return [
        ("cpp", "cpp"),
        ("java", "java"),
        ("python", "py")
    ]

def get_inputs ():
    Q = 10
    A = [ random.randint(0, 9) for _ in range(Q) ]
    B = [ random.randint(0, 9) for _ in range(Q) ]
    return [
        [
            4,
            [ 0, 0, 0, 1 ],
            2,
            [ 1, 2 ],
            [ 1, 3 ]
        ],
        [
            10,
            [ 0, 0, 1, 2, 2, 1, 5, 0, 7, 7 ],
            Q
        ]
        + list(zip(A, B))
    ]
def get_output (input):
    nbNoeuds, parents, Q, *args = input

    def is_parent(node, child):
        if node == child: return True
        if child == 0: return False
        return is_parent(node, parents[child])
    def lca (a, b):
        if is_parent(a, b):
            return a
        return lca(parents[a], b)
    
    L = [ lca(a, b) for a, b in args ]

    P = [0] * nbNoeuds
    for (a, b), l in zip(args, L):
        P[a] += 1
        P[b] += 1
        P[l] -= 1
        if l != 0:
            P[parents[l]] -= 1
    
    for i in range(nbNoeuds - 1, 0, -1):
        P[parents[i]] += P[i]
    return P

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

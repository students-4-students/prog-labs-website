
from renderer import *

import random

def get_renderers():
    return [
        ("cpp", "cpp"),
        ("java", "java"),
        ("python", "py")
    ]

def get_inputs ():
    random.seed(43)
    
    T = [ random.randint(1, 10) for _ in range(1, 10) ]
    U = [ sum(T[:i + 1]) for i in range(len(T)) ]
    random.shuffle(U)
    V = U + [ random.choice(U) for _ in range(10) ]
    random.shuffle(V)

    return [
        [
            4,
            [ 3, 4, 2 ],
            3,
            [ 7, 3, 9 ]
        ],
        [
            10,
            T,
            len(V),
            V
        ]
    ]
def get_output (input):
    _nbElements, tableau, _nbRest, eps = input

    H = [ sum(tableau[:i + 1]) for i in range(len(tableau)) ]

    return [ H.index(x) + 1 for x in eps ]

def render_pipeline ( path, renderer, inout ):
    init_render(path)

    lang, ft = renderer

    template = read_file( ".template.md" )
    template = render_variables( template, lang )

    empty_code = yaml_embedding( f".codes/empty.{ft}", 2 )
    sol_code   = yaml_embedding( f".codes/solution.{ft}", 2 )

    intro_while = yaml_embedding( f".codes/intro_while.{ft}" )

    template = replace(template, "$$empty_code", empty_code)
    template = replace(template, "$$corrected_code", sol_code)
    
    template = replace(template, "$$intro_while_lang", lang)
    template = replace(template, "$$intro_while", intro_while )

    template = replace(template, "$$inout", inout )

    return template

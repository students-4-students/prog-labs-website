
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
    
    return [
        [
            4,
            [ 3, 4, 2 ]
        ],
        [
            10,
            [ random.randint(1, 10) for _ in range(1, 10) ]
        ]
    ]
def get_output (input):
    _nbElements, tableau = input

    return [ sum(tableau) ]

def render_pipeline ( path, renderer, inout ):
    init_render(path)

    lang, ft = renderer

    template = read_file( "template" )
    template = render_variables( template, lang )

    empty_code = yaml_embedding( f"codes/empty.{ft}", 2 )
    sol_code   = yaml_embedding( f"codes/solution.{ft}", 2 )

    template = replace(template, "$$empty_code", empty_code)
    template = replace(template, "$$corrected_code", sol_code)
    
    template = replace(template, "$$inout", inout )

    return template

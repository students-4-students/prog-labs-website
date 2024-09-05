
from renderer import *

def get_renderers():
    return [
        ("cpp", "cpp"),
        ("java", "java"),
        ("python", "py")
    ]

def get_inputs ():
    return [
        [
            4,
            [ 0, 0, 0, 1 ]
        ],
        [
            10,
            [ 0, 0, 1, 2, 2, 1, 5, 0, 7, 7 ]
        ]
    ]
def get_output (input):
    nbNoeuds, parents = input

    count = [ 0 ] * nbNoeuds
    for i in parents: count[i] += 1
    
    return [ count.count(0) ]

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

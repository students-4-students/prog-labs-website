
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
            [ 1, 2, 4, 8 ],
            (1, 3)
        ]
    ]
def get_output (input):
    _nbElements, tableau, [ indiceDepart, indiceFin ] = input

    tableau[indiceFin] = tableau[indiceDepart] + 1

    return [ tableau + [ "" ] ]

def render_pipeline ( path, renderer, inout ):
    init_render(path)

    lang, ft = renderer

    template = read_file( "template" )
    template = render_variables( template, lang )

    empty_code = yaml_embedding( f"codes/empty.{ft}", 2 )
    sol_code   = yaml_embedding( f"codes/solution.{ft}", 2 )

    intro_tableaux = yaml_embedding( f"codes/intro_tableaux.{ft}" )

    template = replace(template, "$$empty_code", empty_code)
    template = replace(template, "$$corrected_code", sol_code)

    template = replace(template, "$$intro_tableaux_lang", lang)
    template = replace(template, "$$intro_tableaux", intro_tableaux )
    
    template = replace(template, "$$inout", inout )

    return template


import os
import copy
import importlib.util

current_renderer = "."

def init_render (path):
    global current_renderer
    current_renderer = path

def read_file (path):
    path = os.path.join(current_renderer, path)

    with open(path, "r") as file: return file.read()
def add_padding (string, padleft):
    lines = string.split("\n")
    lines = [lines[0]] + list(map(lambda x : padleft + x, lines[1:]))
    return "\n".join(lines)
def replace (template: str, target: str, result: str):
    return template.replace(target, result, 1)
def yaml_embedding (file, space = 0):
    output = read_file(file)
    output = "    ".join( output.split("\t") )

    return add_padding(output, "  " * space)
def default_serializer (data):
    L = []
    for x in data:
        if isinstance(x, list) or isinstance(x, tuple):
            L.append(" ".join(list(map(str, x))))
        else: L.append(str(x))
    return "\n".join(L)
def generate_inout (inputs, outputs, inser, ouser):
    assert len(inputs) == len(outputs)
    L = []
    for i, o in zip(inputs, outputs):
        i = inser(i)
        o = ouser(o)

        L.append("  - input: |")
        L.append("      " + add_padding( i, "      " ))
        L.append("    expectedOutput: |-")
        L.append("      " + add_padding( o, "      " ))
    return "\n".join(L)
def get_style (lang: str):
    if lang == "python":
        def f(x: str):
            R = []
            A = "_"
            for c in x:
                if c == "\\": 
                    A = "\\_"
                    continue
                if ord('A') <= ord(c) <= ord('Z'):
                    R.append(A)
                    c = chr(ord(c) - ord('A') + ord('a'))
                R.append(c)
            return "".join(R)
        return f
    return lambda x : x if len(x) == 0 or x[0] != "\\" else x[1:]
def render_variables (template : str, lang : str):
    style = get_style(lang)

    data = template.split("@")

    for i in range(1, len(data), 2):
        data[i] = style(data[i])
    
    return "".join(data)

def render (path):
    print("===", "rendering", path, "===")

    try:
        spec   = importlib.util.spec_from_file_location( "render", os.path.join(path, ".render.py") )
        module = importlib.util.module_from_spec( spec )

        spec.loader.exec_module(module)

        renderers = module.get_renderers()

        inputs  = module.get_inputs()
        outputs = list(map(lambda x: module.get_output(copy.deepcopy(x)), inputs))

        inser = getattr(module, "serialize_inputs",  default_serializer)
        ouser = getattr(module, "serialize_outputs", default_serializer)

        inout = generate_inout(inputs, outputs, inser, ouser)
        
        for renderer in renderers:
            result = module.render_pipeline(path, renderer, inout)
            lang, *args = renderer

            with open(os.path.join(path, f"{lang}.md"), "w") as file:
                file.write(result)
            
    except Exception as ex:
        print("ERROR COULD NOT RENDER", path, ex)
        raise ex

def render_all ():
    for dir in os.listdir():
        if not os.path.isdir(dir) or dir == "__pycache__": continue

        render(dir)

if __name__ == "__main__":
    render_all()

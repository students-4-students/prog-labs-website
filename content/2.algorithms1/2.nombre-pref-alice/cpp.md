---
title: "Nombre d'Alice"
description: 'Manipuler les boucle for'

code:
  default: |
    #include <iostream>

    using namespace std;

    int main() {            
        for (int i (..) ; ... ; ...) {    
            if (i != 78) {    
                // à compléter    
            }            
        } 
        
        return 0;     
    }
  corrected: |
    #include <iostream>

    using namespace std;

    int main() {            
        for (int i (0); i <= 99; i += 3) {                
            if (i != 78) {                    
                cout << i << endl;      
            }            
        }
        
        return 0;
    }

tests:
  - input: ''
    expectedOutput: |-
      0
      3
      6
      9
      12
      15
      18
      21
      24
      27
      30
      33
      36
      39
      42
      45
      48
      51
      54
      57
      60
      63
      66
      69
      72
      75
      81
      84
      87
      90
      93
      96
      99
---

![Alice](/banner/alice.png)

### Enoncé

Alice et Bob sont des noms d'usage fréquents dans les problèmes reliés à l'informatique depuis 1978 (voir [la page wikipédia](https://fr.wikipedia.org/wiki/Alice_et_Bob) si vous êtes curieux :)).

Ils ont chacun un nombre “préféré” entre 0 et 99. Celui de Bob est 78. L’objectif de Bob est de deviner le nombre d’Alice.

Bob ne sait qu’une seule chose : **le nombre préféré d’Alice est un multiple de 3 différent de 78**.

Il décide alors d’énumérer tous les multiples de 3.

### Objectif

Aidez Bob à afficher toutes les possibilités.

Ainsi, votre code doit afficher:

- `0`
- `3`
- `6`

etc.

### Contrainte

Vous devez avoir une seule contrainte dans la boucle for qui est celle de vérifier que le nombre n’est pas 78. En d’autres termes pas d’utilisation de % 3.

::hint
Rappelez-vous qu’une boucle `for` est de cette forme. Il pourrait être intéressant de modifier un peu l’incrémentation (la valeur à ajouter à chaque itération) que vous avez vu en cours…

```cpp
for (initialisation ; condition ; incrémentation) {
    // instructions à répéter
}
```

::

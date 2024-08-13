---
title: 'Boucles'
description: 'Utilisez une boucle pour répéter du code.'

code:
  default: |
    #include <iostream>
    using namespace std;

    int main() {        
        // ne faites pas attention à ces deux lignes
        // elles servent à initialiser les variables
        // (voir le cours)
            
        int n (0);
        cin >> n;
        
        // complétez le code

        return 0;
    }
  corrected: |
    // Exercice principal
    #include <iostream>
    using namespace std;

    int main() {  

        // ne faites pas attention à ces deux lignes
        // elles servent à initialiser les variables
        // (voir le cours)
            
        int n (0);
        cin >> n;
            
        for (int i(1); i <= n; i += 1) {
        cout << i << endl;
        }

        return 0;
    }

    // Aller plus loin n°1
    #include <iostream>
    using namespace std;

    int main() {        
        for (int i(2); i <= n; i += 2) {            
            cout << i << endl;     
        }    

        return 0;
    }

    // ou alors...
    #include <iostream>
    using namespace std;

    int main() {        
        for (int i(2); i <= n; i += 1) {  
                
            // si le reste de la division par 2 est 0          
            // c'est que i = 2k + 0 donc i est pair !            
            if (i % 2 == 0) {                
                cout << i << endl;            
            }

        }    

        return 0;
    }

    // Aller plus loin n°2
    #include <iostream>
    using namespace std;

    int main() {        
        for (int i(n); i >= 1; i -= 1) {            
            cout << i << endl;        
        }    

        return 0;
    }

tests:
  - input: |
      3
    expectedOutput: |-
      1
      2
      3
  - input: |
      10
    expectedOutput: |-
      1
      2
      3
      4
      5
      6
      7
      8
      9
      10
---

### Objectif

En programmation on voudra souvent répéter du code un certain nombre de fois ou à une variable près. La boucle `for` nous permet de faire cela.

### Consigne

Utilisez une boucle `for` pour afficher tous les nombres entiers compris entre 1 et n (inclus).

**pour aller plus loin…**

⭐ modifiez votre boucle pour afficher tous les nombres entiers pairs compris entre 2 et n (inclus si n est pair).

⭐ modifiez votre boucle pour afficher tous les nombres entiers compris entre 1 et n (inclus) par ordre décroissant.

### Cours

Une boucle `for` peut être écrite comme suit :

```java
for (int i = 0; i < 98; i = i + 1) {
	// code à exécuter...
}
```

- `i` agit comme compteur d’”itérations” et peut être utilisée n’importe où **au sein de la boucle**. Dans cet exemple, celle-ci est initialisée à 0 mais on peut bien entendu choisir n’importe quelle valeur.
- `i < 98` impose une condition à votre compteur : la boucle continuera d’itérer tant que `i` sera inférieur à `98` (un choix arbitraire ici).
- `i = i + 1` met à jour le compteur à la fin de chaque itération : dans notre exemple, `i` sera incrémentée de 1 à chaque itération. Notez qu’une syntaxe plus courte existe pour faire la même chose `i += 1`, `i++` ou encore `++i` (vous verrez qu’il y a de légères différences plus tard, mais dans tous les exercices proposés ici le fonctionnement sera identique).

Ainsi, notre code sera exécuté 98 fois.

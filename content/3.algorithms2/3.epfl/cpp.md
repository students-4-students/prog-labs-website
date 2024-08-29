---
title: 'Dessiner EPFL'
description: "Dessinez le logo de l'EPFL dans la console."

code:
  default: |
    #include <iostream>

    using namespace std;

    int main() {
        // n est la hauteur du L
        int n (0);
        cin >> n;

        // compléter le dessin du L
        for (int i (0); i < n; i++) {
            
        }

        return 0;
    }

  corrected: |
    #include <iostream>

    using namespace std;

    int main() {
        // n est la hauteur du L
        int n (0);
        cin >> n;

        for (int i (0); i < n-1; i++) {
            cout << "*"; 
        }
        for (int i (0); i < n; ++i) {
            cout << "*";
        }

        return 0;
    }

    // pour aller plus loin, vous pouvez dessiner les lettres EPF !

    #include <iostream>

    using namespace std;

    int main() {
        cout << "Entrez la hauteur maximale des lettres : ";
        int n (0);
        cin >> n;

        for (int i (0); i < n; i++) {
            // print E
            if (i == 0 or i == n - 1 or i == n / 2) {
                for (int j (0); j < n; j++) {
                    cout << "*";
                }
            } else {
                cout << "*";
                for (int j (1); j < n; j++) {
                    cout << " ";
                }
            }
            cout << "  "; // espace entre les lettres
            
            // print P
            if (i == 0 or i == n / 2) {
                for (int j (0); j < n - 2; j++) {
                    cout << "*";
                }
                cout << " ";
            } else if (i < n / 2) {
                cout << "*";
                for (int j (1); j < n - 2; j++) {
                    cout << " ";
                }
                cout << "*";
            } else {
                cout << "*";
                for (int j (1); j < n - 1; j++) {
                    cout << " ";
                }
            }
            cout << "  ";
            // print F
            if (i == 0 or i == n / 2) {
                for (int j (0); j < n - 1; j++) {
                    cout << "*";
                }
            } else {
                cout << "*";
                for (int j (1); j < n - 1; j++) {
                    cout << " ";
                }
            }
            cout << "  ";
            // print L
            if (i == n - 1) {
                for (int j (0); j < n; j++) {
                    cout << "*";
                }
            } else {
                cout << "*";
            }
        }

        return 0;
    }

tests:
  - input: '7'
    expectedOutput: |-
      *
      *
      *
      *
      *
      *
      *******
  - input: '10'
    expectedOutput: |-
      *
      *
      *
      *
      *
      *
      *
      *
      *
      **********
---

![EPFL](/banner/epfl.png)

### Enoncé

Il existe deux très grandes universités en Suisse connues à l’échelle internationale qui sont :

l’EPFZ (**École polytechnique fédérale de Zurich)** et l’EPFL (**École polytechnique fédérale de Lausanne).** On vous félicite d’avoir fait le bon choix.

Voilà le logo de l’EPFL :

![EPFL](/banner/epfl_logo.png)

Il sera encore plus stylé sur la console, dessinons-le ensemble :)

### Objectif

On vous donne les 3 premières lettres soit EPF, occupez-vous uniquement de dessiner le L manquant.

### Entrées

- **n** (Entier) : la hauteur maximale des lettres

**Exemples de tests :**

Si n = `7`, votre programme doit renvoyer (ne prenez que le L en compte) :

```java
*******  *****   ******  *
*        *    *  *       *
*        *    *  *       *
*******  *****   ******  *
*        *       *       *
*        *       *       *
*******  *       *       *******
```

::hint
Qu’est-ce qu’un `L`? c’est `n-1` lignes d’une étoile, puis une ligne de `n` étoiles :)
::

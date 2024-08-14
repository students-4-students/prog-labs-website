---
title: 'Variables'
description: 'Déclarez des variables.'

code:
  default: |
    #include <iostream>
    #include <string>
    using namespace std;

    int main() {

        // complétez le code ici   
        
        return 0;
    }
  corrected: |
    #include <iostream>
    #include <string>
    using namespace std;

    int main() {

        string a ("Salut");
        int b (42);
        bool c (true);
        
        return 0;
    }

tests:
  - input: ''
    expectedOutput: ''
---

### Objectif

Un deuxième outil de programmation que vous utiliserez tout le temps à l’EPFL sont **les variables**.

Celles-ci permettent de stocker des valeurs temporairement (des sortes de boîtes). En C++, chaque variable possède un nom, une valeur et un type (nombre, texte, etc.).

### Consigne

Déclarez 3 variables, `a`, `b` et `c`. Dans la première, mettre le texte `Salut`, dans la deuxième, mettre le nombre `42`, et dans la troisième, mettre la valeur `vrai`.

Indice : attention au type de chaque variable, ils sont différents !

### Cours

En C++, une variable se déclare par la syntaxe suivante :

- **type nom (valeur)**

> Note : plusieurs pratiques sont possibles, par exemple **type nom = valeur** fonctionnera parfaitement aussi. Cependant les professeurs ont chacun leurs préférences, et pour la plupart en C++ ça a l’air d’être celle avec les parenthèses (il y a une vraie raison que vous apprendrez plus tard) donc on va leur faire plaisir.

Par exemple, dans le code suivant, on déclare une variable appelée “nombre”, dont le type est “int” (voir plus bas) et la valeur est 6.

On n’oublie pas le `;` à la fin!

```cpp
int nombre (6);
```

Comment déterminer le type de la variable ?

Il en existe de nombreux, intéressons-nous à 3 d’entre eux :

- le premier permet de stocker des nombres entiers. C’est le type `int` (voir l’exemple ci-dessus).
- un autre permet de stocker du texte (appelées chaînes de caractères), c’est le type `string`

Ce texte doit être encadré par des guillemets doubles, comme ceci :

```cpp
string texte = "Vous êtes à S4S";
```

> Note : les chaînes de caractères sont en fait des séquences d’un type plus petit, les `char`. En C++, vous pouvez accéder au caractère placé à une position spécifique d’une chaîne en utilisant `texte[8]` (exemple pour la lettre à la position 8, la première lettre étant à la position 0).

- le dernier type que nous allons voir est le type `bool`. Ce type permet de stocker uniquement deux valeurs : True et False (Vrai ou Faux).

On notera qu’en C++, si on laisse une variable vide elle n’est pas remplie avec une valeur par défaut, il est donc d’usage de les initialiser avec une valeur quelconque pour éviter de mauvaises surprises :

```cpp
int nb; // indéfinit
bool boo; // indéfinit

// préférable :
int nb (0);
bool boo (false);
```

On peut également réassigner une valeur.

```cpp
int nombre (1); // là, nombre vaut 1.

nombre = 2;

// maintenant, ce n'est plus 1
// qui est stocké dans nombre, mais 2 !
```

Une fois que le type d’une variable est choisi, il n’est plus modifiable. On ne peut donc jamais stocker de texte dans une variable après l’avoir déclaré comme `int`, et inversement, par exemple.

```cpp
int nombre (0);
nombre = "Salut"; // ne fonctionne pas !
string text (2); // ne fonctionne pas non plus !
```

Maintenant, c’est à vous de jouer !

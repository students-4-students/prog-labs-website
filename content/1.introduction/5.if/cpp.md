---
title: 'Opérations'
description: 'Faites des calculs avec des variables.'

code:
  default: |
    #include <iostream>
    using namespace std;

    int main() {
        
        // ne faites pas attention à ces deux lignes    
        // elles servent à initialiser les variables    
        // (voir le cours)
            
        int a (0);    
        int b (0);
        cin >> a;
        cin >> b;
        
        // complétez le code      
        
        return 0;
    }
  corrected: |
    #include <iostream>
    using namespace std;

    int main() {
        
        // ne faites pas attention à ces deux lignes    
        // elles servent à initialiser les variables    
        // (voir le cours)
            
        int a (0);    
        int b (0);
        cin >> a;
        cin >> b;      
        
        if (a == b) {
            cout << "j'ai tout compris" << endl; 
        }    
        
        return 0;
    }

tests:
  - input: |
      42
      42
    expectedOutput: |-
      j'ai tout compris
  - input: |
      42
      256
    expectedOutput: ''
---

### Objectif

La grande majorité des algorithmes exécute du code différent en fonction de calculs précédents (par exemple, si l’heure est 20h, alors on va dormir, sinon on travaille). Ce `si ... sinon ...` s’exprime avec ce qu’on appelle un branchement conditionnel.

### Consigne

Vous disposez de deux nombres stockés dans les variables `a` et `b`. S’ils sont égaux, affichez `j’ai tout compris` dans le terminal.

### Cours

Vous aurez besoin de l’opérateur d’égalité, noté `==`. Il sert à comparer deux variables, pour voir si leur valeur est égale.

```cpp
int a (6);
int b (5);

a == b; // renvoie false
a == (b + 1); // renvoie true
```

Une variante de cet opérateur est `!=` et permet de vérifier si deux variables sont différentes.

D’autres comparaisons peuvent être effectuées :

```cpp
a < b; // renvoie false
a >= b; // renvoie true
```

Il est aussi possible de comparer du texte, avec l’opérateur `==` :

```cpp
string texte1 ("Vous allez passer la 1ère année !!");
string texte2 ("Vous allez passer la 1ère année !!");

texte1 == texte2; // renvoie true
```

Alors, comment utiliser ces conditions ? C’est ici que nous utilisons le `if` :

```cpp
int a (6);
int b (6);

if (a == b) {
	// s'exécute uniquement si a et b sont égaux
	cout << "Wow, amazing" << endl;
}
```

---
title: 'Or, and et else'
description: 'Utilisez les opérateurs logiques pour combiner des conditions.'

code:
  default: |
    #include <iostream>
    using namespace std;

    int main() {        
      // ne faites pas attention à ces deux lignes    
      // elles servent à initialiser les variables    
      // (voir le cours)    
        
      int heures (0);    
      int minutes (0);  
      cin >> heures;
      cin >> minutes;      
      
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
      
      int heures (0);   
      int minutes (0);
      cin >> heures;
      cin >> minutes;   
      
      if (heures == 8 and minutes == 15) {            
        cout << "Good morning EPFL" << endl;        
      } else {
        cout << "EPFL" << endl;
      }

      return 0;	
    }

tests:
  - input: |
      8
      15
    expectedOutput: |-
      Good morning EPFL
  - input: |
      8
      16
    expectedOutput: |-
      EPFL
---

### Objectif

Dans certains cas, on peut vouloir exécuter un morceau de code si une condition est vérifiée et un morceau différent si elle ne l’est pas. Ceci est fait au moyen du branchement conditionnel `else` .

De même, on veut souvent vérifier si des combinaisons de conditions sont vraies (par exemple une condition A **ou** une condition B est vraie, ou alors les deux en même temps).

### Consigne

Vous disposez de deux variables contenant des nombres :

- une variable `heures`
- une variable `minutes`

Vérifiez si la variable `heures` contient `8` et la variable `minutes` contient `15` alors affichez `Good morning EPFL` sinon affichez simplement `EPFL`.

### Cours

Ici, vous aurez besoin de combiner `if` et `else` comme suit :

```cpp
if (condition1) {
	cout << "La première condition est vraie." << endl;
} else if (condition2) {
	cout << "La seconde condition est vraie." << endl;
} else {
	cout << "Aucune des deux conditions n'est vraie." << endl;
}
```

Dans la quasi-totalité des langages de programmation que vous rencontrerez, il existe ce que l’on appelle des _opérateurs logiques._ Ce sont des opérateurs destinés à combiner où modifier vos conditions et permettre plus de flexibilité.

**Opérateur OU : si au moins une des N propositions est vraie**

**Opérateur ET : si toutes les N propositions sont vraies**

Par exemple :

```cpp
// and ("et" logique)
if (condition1 and condition2) {
	cout << "La condition1 ET la condition2 sont vraies" << endl;
}

// or ("ou" logique)
if (condition1 or condition2) {
	cout << "La condition1 est vraie OU la condition2 est vraie OU les deux." << endl;
}

// not (négation logique)
if (not condition1) {
	cout << "La condition1 est fausse." << endl;
}
```

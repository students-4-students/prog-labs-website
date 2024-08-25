---
title: 'Print complet'
description: "Affichez le contenu d'une variable."

code:
  default: |
    #include <iostream>

    using namespace std;

    int main() {     
        // ne faites pas attention à ces deux lignes    
        // elles servent à initialiser les variables    
        // (voir le cours)  
        
        int a (0);
        cin >> a;   
        
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
        cin >> a; 
        
        cout << a << endl;    
        
        return 0;	
    }

tests:
  - input: '42'
    expectedOutput: '42'
  - input: '256'
    expectedOutput: '256'
---

### Objectif

Nous avons vu comment déclarez des variables, apprenons maintenant comment afficher leur contenu (c’est parfois utile pour comprendre pourquoi un programme ne fonctionne pas comme prévu !).

### Consigne

Affichez le contenu de la variable `a`.

Attention, le code à compléter contient 3 lignes qu’il ne faut pas modifier (`cin`). Elles servent à donner des valeurs à la variable `a` pour que nous puissions tester automatiquement si votre code fonctionne pour plusieurs valeurs différentes. Ignorez-les pour cette semaine de pré-rentrée, vous verrez ça plus tard :)

### Cours

Pour cela, utilisons l’instruction `cout << ... << endl` vu rapidement dans le premier exercice. Elle s’utilise comme ceci :

```cpp
cout << "Hello EPFL" << endl; // affiche Hello EPFL
```

Attention, comme nous voulons afficher du texte, il faut les encadrer de guillemets sinon cela ne fonctionne pas. Si on veut afficher 1, qui est simplement un nombre, on écrit simplement :

```cpp
cout << 1 << endl; // affiche 1
```

C’est la même chose pour des variables !

```cpp
string text ("Hello EPFL");
cout << text << endl; // affiche Hello EPFL

int number (1);
cout << number << endl; // affiche 1
```

> Note : `cout << ... << endl;` ajoute un retour à la ligne après avoir affiché le contenu. Pour ne pas ajouter le retour à la ligne, il suffit de mettre `cout << … ;` sans le `endl` (endl = end of line). On peut aussi écrire par exemple `cout << … << … << endl;` ou encore `cout << … << … << … ;` pour mettre plusieurs éléments à la suite.

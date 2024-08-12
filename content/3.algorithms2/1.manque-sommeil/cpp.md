---
title: 'Fatigue'
description: 'Adam a-t-il bien dormi ?'

code:
  default: |
    #include <iostream>
    using namespace std;

    int main() {       
      int n (0); // lire la chaine de caractère  
      cin >> n;      
      
      // à compléter    

      return 0;
    }

  corrected: |
    #include <iostream>
    using namespace std;

    int main() {       
      int n (0); // lire la chaine de caractère  
      cin >> n;      
      
      if(n == 8) {
        cout << "Suffisant" << endl;
      } else if(n < 8) {
        cout << "Il faut dormir plus" << endl;
      } else {
        cout << "Bravo !" << endl;
      }      

      return 0;
    }

tests:
  - input: '8'
    expectedOutput: 'Suffisant'
  - input: '10'
    expectedOutput: 'Bravo !'
  - input: '6'
    expectedOutput: 'Il faut dormir plus'
---

![Sommeil](/banner/sommeil.png)

### Énoncé

Avant de venir à l’EPFL, Adam a reçu pas mal de conseils de gens expérimentés:

- le travail acharné
- la persévérance
- bien suivre les cours
- faire les séries d’exos
- Faire du sport 🏋️
- **BIEN DORMIIIR**

Adam n’est pas organisé donc il n’a pas réussi le dernier point, ce qui lui couté cher mentalement et physiquement.

### Objectif

Etant donné le nombre **n** d’heures de sommeil d’Adam, vous devez renvoyer si c’est suffisant ou pas.

Si **n** est :

- supérieur à 8 afficher “Bravo !”
- égal à 8 afficher “Suffisant”
- inférieur à 8 afficher “Il faut dormir plus”

<details>
  <summary>Indice</summary>
    Utilisez un `if`, un `else if`, et un `else`.
</details>

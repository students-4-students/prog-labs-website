---
title: "Java : Nombre préféré d'Alice"
description: 'Manipuler les boucle for'

code:
  default: |
    public class Main {
      public static void main(String[] args) {
        for(int i=..;...;...) {
            if(i!=78) {
                // à compléter
            }
        }
        }
    }
  corrected: |
    public class Main(){
      public static void main(String[] args){
        for (int i = 0; i <= 99; i += 3) {
            if(i!=78) {
                System.out.println(i);
            }
        }

        // ou ca 
        /*for (int i = 99; i >= 0; i -= 3) {
            if(i!=78) {
                System.out.println(i);
            }
        }*/
    }
    }

runtime:
  stdin:
  stdout:
---
### Enoncé

Alice et Bob sont des noms d'usage fréquent dans les problèmes relié à l'info. Alice et Bob ont chacun un nombre “préféré” entre 0 et 99, celui de Bob est 78 (en 1978 Alice et Bob ont été introduit en informatique par [Ronald Rivest](https://fr.wikipedia.org/wiki/Ronald_Rivest), [Adi Shamir](https://fr.wikipedia.org/wiki/Adi_Shamir) et [Leonard Adleman](https://fr.wikipedia.org/wiki/Leonard_Adleman), voir https://fr.wikipedia.org/wiki/Alice_et_Bob pour plus de détails). Bob a été bouleversé qu’Alice ne partage pas la même date que lui et essaie ainsi de le deviner.

Bob sait une seule chose :

- le nombre préféré de Alice est un multiple de 3 différents de 78.

Il décide alors d’énumérer tous les multiples de 3.

### Objectif

Aidez Bob à afficher toutes les possibilités

### Contrainte

Vous devez avoir une seule contrainte dans la boucle for qui est celle de vérifier que le nombre n’est pas 78.  En d’autres termes pas d’utilisation de % 3.

### Indice

**Petit rappel** : une boucle for est de cette forme
```java
for (initialisation ; condition ; incrémentation) { 
	// instructions à répéter  
}
```


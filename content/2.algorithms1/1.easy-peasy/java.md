---
title: 'Java : Easy-peasy'
description: 'déboggage.'

code:
  default: |
    for (int i = 1; i < 100; i++) {
        if (i % 3 == 0) { // le modulo "%" renvoit le reste de la division de i par 3
            System.out.println("easy");
        } else if (i % 5 == 0) {
            System.out.println("peasy");
        } else if (i % 15 == 0) {
            System.out.println("easy-peasy");
        }
    }
  corrected: |
    // Verifiez bien l'ordre des conditions !
    // Ici, on verifiait que i était divisible par 3
    // avant d'etre divisible par 15 ! Or si on est
    // divisible par 15 on est necessairement divisible
    // par 3. Le programme affichait donc "easy".

    for (int i = 1; i < 100; i++) {
        if (i % 15 == 0) {
            System.out.println("easy-peasy");
        } else if (i % 3 == 0) {
            System.out.println("easy");
        } else if (i % 5 == 0) {
            System.out.println("peasy");
        }
    }

    // Intérêt :
    // - Débogage
    // - Se familiariser avec les instructions conditionnelles, notamment avec l’ordre des vérifications
    // - Apprendre le modulo “%”

runtime:
  stdin:
  stdout:
---

!

### Enoncé

on cherche a retrouver tous les nombres multiples de 3, 5 et 15 entre 1 et 100 (exclus)

- Si le nombre est multiple de 3 on affiche "easy"
- Si le nombre est multiple de 5 on affiche "peasy"
- Si le nombre est multiple de 15 on affiche "easy-peasy"
- Sinon on affiche rien

### Exemple

15 -> easy-peasy

6 -> easy

### Objectif

Ce code qu’on vous donne doit être corrigé, trouvez cette petite faille.

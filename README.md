# S4S Programming Labs

Ce site web permet aux étudiants de S4S de découvrir la programmation avec une série d'introduction à la syntaxe et des algorithmes pour mettre en pratique la syntaxe.

- Plusieurs langages sont supportés, dont Java, C++ et Python.
- Les exercices sont interactifs, les étudiants peuvent écrire du code et le tester directement sur le site.

## Rédaction des séries

Les séries et exercices sont rédigés en markdown et situés dans le dossier `content`.

Pour l'édition 2024, nous avons décidé de rédiger 3 séries, une série d'introduction à la syntaxe et deux séries d'algorithmes.

### Créer une série

Pour chaque série se trouve un fichier `index.md` qui contient le titre et la description de la série ainsi que le `fallbackLanguage`, le langage de programmation vers lequel les étudiants seront redirigés dans le cas où la série n'est pas disponible dans le langage demandé.

### Écrire les exercices

Pour écrire un nouvel exercice, créez un sous-dossier dans le dossier de la série. Chaque exercice est composé d'un fichier markdown par langage supporté. Par exemple, pour un exercice nommé `operations`, les fichiers `java.md`, `cpp.md` et `python.md` contiendront le code de l'exercice dans les langages respectifs.

Il y a toujours un titre, une description, un code (`default`, le code affiché dans l'éditeur quand le participant ouvre la page, et `corrected`, le code corrigé) et une paire de clés-valeurs `tests` qui contient les inputs et outputs attendus pour chaque test.

## Documentation technique

### Tests unitaires

Nous utilisons Godbolt pour exécuter le code C++, Java et Python et obtenir un résultat (`output`) à comparer avec celui attendu.

Ils proposent une API publique et gratuite (avec CORS toute origine), qui nous permet de compiler et d'exécuter du code dans leur environnement sécurisé.

### Éditeur de code

Nous utilisons Monaco Editor pour l'éditeur de code, et des Language Server Protocol pour Python et C++ (nous permettant de fournir des suggestions de code et des erreurs en tant réel).

⚠️ Il y a un bug avec le LSP de C++ qui fait que des service workers sont créés en trop à force de naviguer d'un exo à l'autre, ce pourquoi nous devons rafraîchir la page à chaque changement d'exo pour empêcher la surcharge.

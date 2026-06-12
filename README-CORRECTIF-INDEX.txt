CORRECTIF RENDER — INDEX.HTML MANQUANT

Erreur vue dans Render :
Error: ENOENT: no such file or directory, stat '/app/index.html'

Cause :
Render cherche un fichier appelé exactement index.html à la racine du projet.
Ton fichier a probablement été envoyé avec un autre nom, par exemple index(2).html, ou il n’est pas à la racine.

À faire :
1. Extraire ce ZIP.
2. Envoyer le fichier index.html dans la racine du dépôt GitHub.
3. Dans GitHub, vérifier que index.html est au même niveau que :
   - package.json
   - server.js
   - Dockerfile
4. Retourner dans Render.
5. Cliquer Manual Deploy > Deploy latest commit.

La racine GitHub doit ressembler à ceci :
index.html
package.json
server.js
Dockerfile
.dockerignore
.env.example
README.md
SECURITY.md

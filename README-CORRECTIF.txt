CORRECTIF RENDER — PACKAGE.JSON MANQUANT

Erreur corrigée :
Couldn't find a package.json file in /opt/render/project/src

À faire :
1. Extraire ce ZIP.
2. Envoyer les fichiers dans la racine du dépôt GitHub :
   - package.json
   - server.js
   - .env.example
3. Vérifier que index.html est aussi dans la racine du dépôt GitHub.
4. Dans Render, utiliser :
   Build Command : npm install
   Start Command : npm start
5. Cliquer Manual Deploy > Deploy latest commit.

Important :
Ne mets pas les clés API secrètes dans GitHub.
Ajoute-les seulement dans Render > Environment Variables.

# Bienvenue dans la partie backend de BitLister!

# Introduction

BitLister est une application de style Leboncoin qui permet aux utilisateurs de publier et de consulter des annonces. Cette application utilise le stack MEAN (MongoDB, Express, Angular, Node.js) avec TypeScript. Dans cette partie, vous allez travailler sur le développement de la logique métier de l'application, la gestion de la base de données MongoDB et la mise en place des API REST.

# Installation
Avant de pouvoir travailler sur BitLister, vous devez installer les dépendances nécessaires à l'aide de la commande suivante:

npm install

# Lancement

Pour lancer l'application, utilisez la commande suivante:

npm run server

Cela lancera l'application sur le port par défaut 3001. Vous pouvez tester les API REST en utilisant un client REST tel que Postman.

# Structure du code

La structure du code de l'application est organisée selon la convention de structure de projet Express. Vous trouverez les modèles, les contrôleurs et les routes dans le dossier src.

Le dossier <b>src/config</b> contient les fichiers de configuration pour différents environnements de développement.

Le dossier src/utils contient les fichiers utilitaires tels que les fonctions de validation et les fonctions de génération de jetons.

# Fonctionnalités

BitLister propose les fonctionnalités suivantes:

Inscription et connexion d'un utilisateur
Publication et consultation d'annonces
Gestion de profil utilisateur

# Base de données

BitLister utilise MongoDB comme base de données. Les modèles sont définis dans le dossier src/models et sont utilisés pour interagir avec la base de données.

# Conclusion

Vous êtes maintenant prêt à travailler sur la logique métier, la gestion de la base de données et les API REST de BitLister. Si vous avez des questions ou des problèmes, n'hésitez pas à contacter les membres de l'équipe frontend et les autres développeurs. Merci de contribuer à BitLister!

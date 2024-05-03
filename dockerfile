FROM node:20
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copier le package.json du projet front
COPY rh-backend/package.json rh-backend/package-lock.json ./
RUN npm install && npm cache clean --force

# Copier le reste du projet front
COPY rh-backend .

# Exécuter le build du projet front
RUN npm run build-dev

# Exposer le port 5000
EXPOSE 5000

# Commande pour démarrer le projet front
CMD ["npm", "run", "start:dev"]


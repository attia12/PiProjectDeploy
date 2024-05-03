FROM node:20
RUN  mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY rh-backend/package.json rh-backend/package-lock.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build-dev
EXPOSE 5000
CMD ["npm", "run", "start:dev"]




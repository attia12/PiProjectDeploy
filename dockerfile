FROM node:20
RUN  mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
RUN npm run build-dev
EXPOSE 5000
CMD ["npm", "run", "start:dev"]




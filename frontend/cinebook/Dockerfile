FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .

EXPOSE 4200

CMD ["npm", "start"]

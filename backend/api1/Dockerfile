FROM node:latest

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

EXPOSE 5000

# Start the server with nodemon
CMD ["npx", "nodemon", "app.js"]

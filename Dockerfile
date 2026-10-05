FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# CRITICAL: Copy files, create the data folder, and fix permissions for SQLite
COPY . .
RUN mkdir -p /app/data && chmod -R 777 /app/data

CMD ["npm", "start"]

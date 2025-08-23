# Development Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

# Install nodemon globally (optional)
RUN npm install -g nodemon


COPY . .
RUN npx prisma generate

# Expose API port
EXPOSE 3000

CMD ["npm", "run", "dev"]

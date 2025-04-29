# Use an official Node image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Generate prisma client
RUN npx prisma generate

RUN npm run build

# Expose the port your app runs on (change if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

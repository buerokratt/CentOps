# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy your server code
COPY server.js .

# Start the server
CMD ["npm", "start"]

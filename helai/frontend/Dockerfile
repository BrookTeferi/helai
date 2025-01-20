# Use the official Node.js image from the Docker Hub
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./

# List the contents of the /app directory for debugging
RUN ls -la /app

# Increase npm timeout and use npm cache
RUN npm config set fetch-retry-maxtimeout 120000
RUN npm config set cache /app/.npm-cache --global

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["npm", "run", "dev"]
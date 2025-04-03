# FROM public.ecr.aws/d5z8k9g9/node18-alpine3.15:latest
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Expose port 5000
EXPOSE 5000


# Run server 
CMD ["npm", "run", "dev"]
# CMD [ "node", "server.js" ]

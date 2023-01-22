FROM node:16

# Choose the container working directory
WORKDIR C:\\

# Install npm dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose ports
EXPOSE 3000

CMD ["npm", "start"]
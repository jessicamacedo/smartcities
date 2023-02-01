FROM node:16

# Choose the container working directory
WORKDIR C:\Users\Jessica\OneDrive\Documentos\MESTRADO

# Install npm dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose ports
EXPOSE 3000 3500 3200 27017

CMD ["npm", "start"]
# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código do projeto para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Defina o comando para iniciar a aplicação
CMD ["npm", "start"]

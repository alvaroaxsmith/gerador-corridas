# Usar uma imagem base do Node.js
FROM node:20

# Criar e definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todos os arquivos da aplicação
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
